import Container = PIXI.Container;
import Point = PIXI.Point;
import { Path } from "../core/Path";

export class LinkedLine extends Container {

    
    constructor() {
        super();
        this.x = 175;
        this.y = 20;
    }

    private static _instance:LinkedLine;
    public static get instance():LinkedLine{
        if(this._instance == null){
            this._instance = new LinkedLine();
        }
        return this._instance;
    }

    public drawPath(paths:Path){
        this.removeChildren();
        let point = paths.path_Detail.pop();
        let gt = new PIXI.Graphics();
        gt.lineStyle(5, 0xff0000);
        let start = this.getPositionFromPoint(point);
        gt.moveTo(start.x,start.y);
        do{
            point = paths.path_Detail.pop();
            let line = this.getPositionFromPoint(point);
            gt.lineTo(line.x,line.y);
        }while(paths.path_Detail.length > 0);

        this.addChild(gt);

        setTimeout(()=>{this.removeChildren();},500);
    }
    public getPositionFromPoint(point:Point){
        let x = (45 + 20) * point.x + 22.5;
        let y = (45 + 6) * point.y + 22.5;
        if(y < 0){
            y = -5;
        }
        if(y > 502){
            y = 510;
        }
        return new Point(x, y);
    }
}