import { ResourcesList } from "./ResourcesList";
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
        this.loader.onProgress.add((event) => {
            console.log("onProgress: ",event);
        });
        //載入檔案錯誤時
        this.loader.onError.add((target, event, error) => {
            this.failedFiles.push(error.name);
            console.log("onError: ",error);
        });
        //每個檔案載入時都會呼叫
        this.loader.onLoad.add((event, target) => {
            this.completedFiles.push(target.name);
            console.log("onLoad: ",target);
        });
        //全部下載完成後
        this.loader.onComplete.add(() => {
            if (this.failedFiles.length == 0){
                console.log("all file completed");
            } else{
                console.log("Loading...failed: could not load "+ this.failedFiles);
            }
        });
    }
}