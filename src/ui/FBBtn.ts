import { ButtonBase } from "./ButtonBase";
import { SoundMgr } from "../core/SoundMgr";

export class FBBtn extends ButtonBase {
    constructor() {
        super('Button','FB',50,410);
    }
    public trigger(){
        window.open(' https://www.facebook.com/claire0318 ', 'Claire Chang');
        SoundMgr.play("About");
    }
}