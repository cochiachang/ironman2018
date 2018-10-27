import {Loader} from "../core/Loader";
import {application} from "../Main";
import {SoundBtn} from "./SoundBtn";
import {GameBoard} from "./GameBoard";
import { LinkedLine } from "./LinkedLine";
import { Character } from "./Character";
import { RevertBtn } from "./RevertBtn";
export class GameScene {
    
    public static draw(){
        //加入背景
        application.stage.addChild(PIXI.Sprite.from(Loader.resources["background"].texture));
        //加入按鈕
        application.stage.addChild(new SoundBtn());
        application.stage.addChild(new RevertBtn());
        //加入連連看牌面
        application.stage.addChild(new GameBoard());
        application.stage.addChild(LinkedLine.instance);
        //角色動畫
        application.stage.addChild(new Character());
    }
}