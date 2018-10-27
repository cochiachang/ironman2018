import Sprite = PIXI.Sprite;
import { Loader } from "../core/Loader";

export class GameIcon extends Sprite{
    constructor(id,x,y) {
        super();
        this.texture = Loader.resources['Icon'].textures['icon_' + id];
        this.name = 'icon_' + x + "_" + y;
        this.width = this.height = 45;
        this.x = (this.width + 20) * x + 22.5;
        this.y = (this.width + 6) * y + 22.5;
        this.anchor.set(0.5);
        this.buttonMode = true;
        this.interactive = true;
    }

    select = ()=>{
        let gt = new PIXI.Graphics();
        gt.lineStyle(3,0xFF0000,1);
        gt.drawRect(-3-22.5,-3-22.5,51,51);
        gt.endFill();
        this.addChild(gt);
    }

    unSelect = ()=>{
        this.removeChildren();
    }
}