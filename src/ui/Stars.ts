import Container = PIXI.Container;
import { Loader } from "../core/Loader";
import { reloadTimes } from "./GameBoard";
import { eventEmitter } from "../Main";
import { GameFlowEvent } from "../core/Event";

export class Stars extends Container {
    private starList = [];
    constructor() {
        super();
        this.x = 20;
        this.y = 78;
        this.updateStarStatus();
        eventEmitter.on(GameFlowEvent.ReloadBoardRequest, this.updateStarStatus.bind(this));
        eventEmitter.on(GameFlowEvent.BoardNeedReload, this.updateStarStatus.bind(this));
        eventEmitter.on(GameFlowEvent.CreateNewGameRequest, this.updateStarStatus.bind(this));
    }

    updateStarStatus = ()=>{
        this.removeChildren();
        for(var i =0;i<3;i++){
            let star:any;
            if(i<reloadTimes){
                star = PIXI.Sprite.from(Loader.resources['Button'].textures['Star_Full']);
            }else{
                star = PIXI.Sprite.from(Loader.resources['Button'].textures['Star_Empty']);
            }
            star.x = i*33;
            this.starList.push(star);
            this.addChild(star);
        }
    }
}