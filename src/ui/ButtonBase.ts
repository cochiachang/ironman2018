import Sprite = PIXI.Sprite;
import {Loader} from "../core/Loader";

export class ButtonBase extends Sprite{

    constructor(_id:string, textureID:string, _x:number, _y:number) {
        super();
        this.texture = Loader.resources[_id].textures[textureID];
        this.interactive = true;
        this.buttonMode = true;
        this.x = _x;
        this.y = _y;
        this.anchor.set(0.5);

        //按下效果
        this.on("mousedown", this.mouseDownEffect.bind(this));
        this.on("mouseup", this.mouseUpEffect.bind(this));
        this.on("mouseout", this.mouseOutEffect.bind(this));
        this.on("touchstart", this.mouseDownEffect.bind(this));
        this.on("touchend", this.mouseUpEffect.bind(this));
        
        this.on("mouseup", this.trigger.bind(this));
        this.on("touchend", this.trigger.bind(this));
    }
    public trigger(){
    }
    public mouseDownEffect():void{
    }
    public mouseUpEffect():void{
    }
    public mouseOutEffect():void{
    }
}