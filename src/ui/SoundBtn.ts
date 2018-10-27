import {ButtonBase} from "./ButtonBase";
import {Loader} from "../core/Loader";
import {SoundMgr} from "../core/SoundMgr";


export class SoundBtn extends ButtonBase {
    private isMute: boolean = false;
    constructor() {
        super('Button','Sound_On',50,170);
        this.updateImage();
        
    }

    public trigger(){
        this.isMute = !this.isMute;
        SoundMgr.mute(this.isMute);
        this.updateImage();
    }
    
    updateImage = ()=>{
        if (this.isMute){
            this.texture = this.texture = Loader.resources['Button'].textures['Sound_Off'];
        } else{
            this.texture = this.texture = Loader.resources['Button'].textures['Sound_On'];
        }
    }
    
}