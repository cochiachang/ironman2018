import EventEmitter = PIXI.utils.EventEmitter;
import {CoreEvent} from "./core/Event";
import Application = PIXI.Application;
import {Loader} from "./core/Loader";
import Resource = PIXI.loaders.Resource;
import { SoundMgr } from "./core/SoundMgr";
import { GameScene } from "./ui/GameScene";

export let eventEmitter:EventEmitter;
export let application:Application;
/**
 * 主要的 client application.
 *
 */
export class Main {

    public initGame() {
        //設定場景
        let gameCanvasContext = (< HTMLCanvasElement >jQuery("#gameCanvas")[0]);
        application = new PIXI.Application(860, 540, {backgroundColor : 0x6DF7F4, view: gameCanvasContext});
        //設定共用的事件傳遞元件
        eventEmitter = new EventEmitter();
        SoundMgr.load();
        eventEmitter.on(CoreEvent.AssetsLoadComplete,()=>{
            //隱藏loading page
            jQuery("#loadingPage").hide();
            //播放背景音樂
            SoundMgr.play('Sound_bg',true);
            //繪製場景
            GameScene.draw();
        });
        //載入素材
        Loader.load();

        //設定遊戲大小隨視窗大小改變
        this.onResize(); 
        window.onresize = this.onResize; 
    }

    public onResize() { 
        var w = window.innerWidth; 
        var h = window.innerHeight; 
        var scale = Math.min(w/860,h/540); 
        application.view.style.left = (w-scale*860)/2 + "px"; 
        application.view.style.top = (h-scale*540)/2 + "px"; 
        application.view.style.width = scale*860 + "px"; 
        application.view.style.height = scale*540 + "px"; 
         
    } 
}