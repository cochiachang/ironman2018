import { ButtonBase } from "./ButtonBase";
import { eventEmitter } from "../Main";
import { GameFlowEvent } from "../core/Event";
import { reloadTimes } from "./GameBoard";

export class ReloadBtn extends ButtonBase {
    constructor() {
        super('Button','Reflash',50,230);
        eventEmitter.on(GameFlowEvent.GameRoundStart,(()=>{
            this.enable = true;
        }).bind(this))
    }
    public trigger(){
        if(reloadTimes > 0){
            eventEmitter.emit(GameFlowEvent.ReloadBoardRequest);
        }
        if(reloadTimes == 0){
            this.enable = false;
        }
    }
}