import Application = PIXI.Application;
import {Loader} from "./core/Loader";
import Resource = PIXI.loaders.Resource;
export let application:Application;
/**
 * 主要的 client application.
 *
 */
export class Main {

    public initGame() {
       //設定場景
       let gameCanvasContext = (< HTMLCanvasElement >jQuery("#gameCanvas")[0]);
       application = new PIXI.Application(960, 540, {backgroundColor : 0x000000, view: gameCanvasContext});
       
       //貼一張圖片
       var bunny = PIXI.Sprite.fromImage('assets/bunny.png');
       bunny.x = application.screen.width / 2;
       bunny.y = application.screen.height / 2;
       application.stage.addChild(bunny);
            
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