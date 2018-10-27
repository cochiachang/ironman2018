import { ButtonBase } from "./ButtonBase";
import { eventEmitter } from "../Main";
import { GameFlowEvent } from "../core/Event";

export class RevertBtn extends ButtonBase {

    constructor() {
        super('Button','Revert',50,345);
    }
    public trigger(){
        eventEmitter.emit(GameFlowEvent.RevertBackRequest);
    }
}