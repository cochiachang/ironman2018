import {Loader} from "../core/Loader";
import {application} from "../Main";
import {SoundBtn} from "./SoundBtn";

export class GameScene {
    
    public static draw(){
        //加入背景
        application.stage.addChild(PIXI.Sprite.from(Loader.resources["background"].texture));
        //加入按鈕
        application.stage.addChild(new SoundBtn());
    }
}