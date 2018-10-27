import { ButtonBase } from "./ButtonBase";
import { eventEmitter } from "../Main";
import { GameFlowEvent } from "../core/Event";

export class TipBtn extends ButtonBase {
    constructor() {
        super('Button','Tip',50,287);
    }

    public trigger(){
        eventEmitter.emit(GameFlowEvent.TipsRequest);
    }
}