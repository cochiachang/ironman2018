import {Loader} from "../core/Loader";
import {application} from "../Main";
import {SoundBtn} from "./SoundBtn";
import {GameBoard} from "./GameBoard";
import { Character } from "./Character";
export class GameScene {
    
    public static draw(){
        //加入背景
        application.stage.addChild(PIXI.Sprite.from(Loader.resources["background"].texture));
        //加入按鈕
        application.stage.addChild(new SoundBtn());
        //加入連連看牌面
        application.stage.addChild(new GameBoard());
        //角色動畫
        application.stage.addChild(new Character());
    }
}