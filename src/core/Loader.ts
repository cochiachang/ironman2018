import { ResourcesList } from "./ResourcesList";
import {eventEmitter} from "../Main";
import {CoreEvent} from "./Event";
import math = PIXI.core.math;

export class Loader{
    private static loader:PIXI.loaders.Loader;
    private static failedFiles:Array<string> = [];
    private static completedFiles:Array<string> = [];
    public static resources:PIXI.loaders.Resource;
    
    public static load(){
        this.loader = new PIXI.loaders.Loader();
        ResourcesList.img.forEach(element => {
            this.loader.add(element.id, element.path);
        });
        this.loader.load((loader, resources) => {
            this.resources = resources;
        });
        //可取得下載進度
        this.loader.onProgress.add((e) => {
            jQuery("#loadingPercent").html("Loading..." + Math.floor(e.progress) + "%");
        });
        //載入檔案錯誤時
        this.loader.onError.add((t, e, r) => {
            this.failedFiles.push(r.name);
        });
        //每個檔案載入時都會呼叫
        this.loader.onLoad.add((e, t) => {
            this.completedFiles.push(t.name);
        });
        //全部下載完成後
        this.loader.onComplete.add(() => {
            if (this.failedFiles.length == 0){
                //隱藏loading page
                jQuery("#loadingPage").hide();
                eventEmitter.emit(CoreEvent.AssetsLoadComplete);
            } else{
                jQuery("#loadingPercent").html("Loading...failed: could not load "+ this.failedFiles);
            }
        });
    }
}