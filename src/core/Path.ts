import Point = PIXI.Point;
import {Board} from "./Board";
import {Direction} from "./Direction";

export class Path {
    public point1:Point;
    public point2: Point;
    readonly board: Board;
    public path_Detail:Array<Point>;
    public value:number;

    constructor(point1: Point, point2: Point, board: Board) {
        this.point1 = point1;
        this.point2 = point2;
        this.board = board;
    }

    public canLinkInLine(): boolean {


        //從上面消
        let point1UP = this.board.getNearByPointByDirection(this.point1, Direction.UP);
        let point2UP = this.board.getNearByPointByDirection(this.point2, Direction.UP);
        {
            let min = Math.max(point1UP.x,point2UP.x);
            let max = Math.min(this.point1.x, this.point2.x);
            for (var i = max;i>=min;i--){
                if (!this.board.hasMiddleValue(new Point(i, this.point1.y), new Point(i, this.point2.y))){
                    this.path_Detail = [this.point1,new Point(i, this.point1.y),new Point(i, this.point2.y),this.point2];
                    return true;
                }
            }
        }
        //從下面消
        let point1DOWN = this.board.getNearByPointByDirection(this.point1, Direction.DOWN);
        let point2DOWN = this.board.getNearByPointByDirection(this.point2, Direction.DOWN);
        {
            let max = Math.min(point1DOWN.x,point2DOWN.x);
            let min = Math.max(this.point1.x, this.point2.x);
            for (var i = min;i<=max;i++){
                if (!this.board.hasMiddleValue(new Point(i, this.point1.y), new Point(i, this.point2.y))){
                    this.path_Detail = [this.point1,new Point(i, this.point1.y),new Point(i, this.point2.y),this.point2];
                    return true;
                }
            }
        }

        //從左邊消
        let point1LEFT = this.board.getNearByPointByDirection(this.point1, Direction.LEFT);
        let point2LEFT = this.board.getNearByPointByDirection(this.point2, Direction.LEFT);
        {
            let min = Math.max(point1LEFT.y,point2LEFT.y);
            let max = Math.min(this.point1.y, this.point2.y);
            for (var i = max;i>=min;i--) {
                if (!this.board.hasMiddleValue(new Point(this.point1.x, i), new Point(this.point2.x, i))) {
                    this.path_Detail = [this.point1, new Point(this.point1.x, i), new Point(this.point2.x, i), this.point2];
                    return true;
                }
            }
        }

        //從右邊消
        let point1RIGHT = this.board.getNearByPointByDirection(this.point1, Direction.RIGHT);
        let point2RIGHT = this.board.getNearByPointByDirection(this.point2, Direction.RIGHT);
        {
            let max = Math.min(point1RIGHT.y,point2RIGHT.y);
            let min = Math.max(this.point1.y, this.point2.y);
            for (var i = min;i<=max;i++) {
                if (!this.board.hasMiddleValue(new Point(this.point1.x, i), new Point(this.point2.x, i))) {
                    this.path_Detail = [this.point1, new Point(this.point1.x, i), new Point(this.point2.x, i), this.point2];
                    return true;
                }
            }
        }
        //左右連消
        if (this.point1.y != this.point2.y){
            let leftPoint = (this.point1.y < this.point2.y) ? this.point1:this.point2;
            let rightPoint = (this.point1.y >= this.point2.y) ? this.point1:this.point2;
            let leftPointRIGHT = this.board.getNearByPointByDirection(leftPoint, Direction.RIGHT);
            let rightPointLEFT = this.board.getNearByPointByDirection(rightPoint, Direction.LEFT);
            leftPointRIGHT.y = (leftPointRIGHT.y < rightPoint.y) ? leftPointRIGHT.y : rightPoint.y;
            rightPointLEFT.y = (rightPointLEFT.y > leftPoint.y) ? rightPointLEFT.y : leftPoint.y;
            if (leftPointRIGHT.y != leftPoint.y && rightPointLEFT.y != rightPoint.y){
                for (var i = rightPointLEFT.y; i <= leftPointRIGHT.y; i++) {
                    if (!this.board.hasMiddleValue(new Point(leftPoint.x, i), new Point(rightPoint.x, i))) {
                        this.path_Detail = [leftPoint, new Point(leftPoint.x, i), new Point(rightPoint.x, i), rightPoint];
                        return true;
                    }
                }
            }
        }

        //上下連消
        if (this.point1.x != this.point2.x){
            let upPoint = (this.point1.x < this.point2.x) ? this.point1:this.point2;
            let downPoint = (this.point1.x >= this.point2.x) ? this.point1:this.point2;
            let upPointDOWN = this.board.getNearByPointByDirection(upPoint, Direction.DOWN);
            let downPointUP = this.board.getNearByPointByDirection(downPoint, Direction.UP);
            upPointDOWN.x = (upPointDOWN.x < downPoint.x) ? upPointDOWN.x : downPoint.x;
            downPointUP.x = (downPointUP.x > upPoint.x) ? downPointUP.x : upPoint.x;

            if (upPointDOWN.x != upPoint.x && downPointUP.x != downPoint.x){
                for (var i = downPointUP.x; i <= upPointDOWN.x; i++) {
                    if (!this.board.hasMiddleValue(new Point(i, upPoint.y), new Point(i, downPoint.y))) {
                        this.path_Detail = [upPoint, new Point(i, upPoint.y), new Point(i, downPoint.y), downPoint];
                        return true;
                    }
                }
            }
        }

        return false;
    }
}