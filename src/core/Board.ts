import {Path} from "./Path";
import Point = PIXI.Point;
import {Direction} from "./Direction";

export class Board {
    public board: Array<Array<number>>;

    constructor() {
        let content = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
        //產生初始局面
        let length = 10;
        let data = (content.concat(content).concat(content).concat(content)).sort((a, b) => (Math.random() > .5) ? 1 : -1);
        this.board = []
        for (var i = 0;i<length;i++){
            this.board.push(data.slice(i*length, (i+1)*length))
        }
    }

    public gameRoundEnd():boolean{
        for (var i =0;i<this.board.length;i++){
            for (var j = 0; j<this.board[i].length;j++){
                if(this.board[i][j] != null){
                    return false;
                }
            }
        }
        return true;
    }

    public getFirstExistPath():Path{
        var searchedValue = [];
        for (var i =0;i<this.board.length;i++){
            for (var j = 0; j<this.board[i].length;j++){
                let value = this.board[i][j];
                if(value!= null && searchedValue.indexOf(value) == -1){
                    searchedValue.push(value);
                    let positionsArr = this.getPositionByValue(value);
                    let permutationsArr = this.getPairNumPermutations(positionsArr.length);
                    for(var k = 0;k<permutationsArr.length;k++){
                        let v = permutationsArr[k];
                        let path = new Path(positionsArr[v[0]], positionsArr[v[1]],this);
                        if(path.canLinkInLine()){
                            return path;
                        }
                    }
                }
            }
        }
        return null;
    }

    private getAllValueInBoard(){
        let values = [];
        for (var i =0;i<this.board.length;i++){
            for (var j = 0; j<this.board[i].length;j++){
                if(this.board[i][j] != null){
                    values.push(this.board[i][j]);
                }
            }
        }
        return values;
    }

    public rearrangeBoard(){
        let values = this.getAllValueInBoard().sort((a, b) => (Math.random() > .5) ? 1 : 0);
        for (var i =0;i<this.board.length;i++){
            for (var j = 0; j<this.board[i].length;j++){
                if(this.board[i][j] != null){
                    this.board[i][j] = values.pop();
                }
            }
        }
    }

    private pairNumPermutations = {};
    /**
     * 取得輸入的index中，2個2個一組的所有可能排列組合
     */
    public getPairNumPermutations(num:number){
        if(this.pairNumPermutations[num] != null){
            return this.pairNumPermutations[num];
        }
        let data = [];
        for(var i = 0; i <num;i++){
            for(var j = 0; j <num;j++){
                if(i != j && i <= j){
                    data.push([i,j]);
                }
            }
        }
        this.pairNumPermutations[num] = data;
        return data;
    }

    public getPositionByValue(value:number):Array<Point>{
        let arr = new Array<Point>();
        for (var i =0;i<this.board.length;i++){
            for (var j = 0; j<this.board[i].length;j++){
                if (this.board[i][j] == value){
                    arr.push(new Point(i, j));
                }
            }
        }
        return arr;
    }

    public getNearByPointByDirection(point: Point, direction: string): Point {
        let nearByPoint: Point = new Point(point.x, point.y);
        switch (direction) {
            case Direction.UP:
                for (var i = point.x-1; i >= 0; i--) {
                    if (this.board[i][point.y] == null) {
                        nearByPoint.x = i;
                    } else {
                        break;
                    }
                }
                if (nearByPoint.x == 0) {
                    nearByPoint.x = -1;
                }
                break;
            case Direction.DOWN:
                let maxLengthDOWN = this.board.length;
                for (var i = point.x+1; i < maxLengthDOWN; i++) {
                    if (this.board[i][point.y] == null) {
                        nearByPoint.x = i;
                    } else {
                        break;
                    }
                }
                if (nearByPoint.x == maxLengthDOWN - 1) {
                    nearByPoint.x = maxLengthDOWN;
                }
                break;
            case Direction.RIGHT:
                let maxLengthRIGHT = this.board[0].length;
                for (var i = point.y+1; i < maxLengthRIGHT; i++) {
                    if (this.board[point.x][i] == null) {
                        nearByPoint.y = i;
                    } else {
                        break;
                    }
                }
                if (nearByPoint.y == maxLengthRIGHT - 1) {
                    nearByPoint.y = maxLengthRIGHT;
                }
                break;
            case Direction.LEFT:
                for (var i = point.y-1; i >= 0; i--) {
                    if (this.board[point.x][i] == null) {
                        nearByPoint.y = i;
                    } else {
                        break;
                    }
                }
                if (nearByPoint.y == 0) {
                    nearByPoint.y = -1;
                }
                break;
        }
        return nearByPoint;
    }

    public canFindPath(a: Point, b: Point, direction:string): boolean {
        return this.hasMiddleValue(a ,b);
    }
    public hasMiddleValue(a: Point, b: Point): boolean {
        let arr = [];
        if (a.x == b.x) {
            if (a.x == -1 || a.x == this.board.length) return false;
            let max = Math.max(a.y, b.y);
            let min = Math.min(a.y, b.y);
            for (var i = min + 1; i < max; i++) {
                if (this.board[a.x][i] != null) {
                    return true;
                }
            }
            return false;
        } else if (a.y == b.y) {
            if (a.y == -1 || a.y == this.board[0].length) return false;
            let max = Math.max(a.x, b.x);
            let min = Math.min(a.x, b.x);
            for (var i = min + 1; i < max; i++) {
                if (this.board[i][a.y] != null) {
                    return true;
                }
            }
            return false;
        } else {
            return true;
        }
    }

    public hasSameValue(point1: Point, point2: Point): boolean {
        return this.board[point1.x][point1.y] == this.board[point2.x][point2.y];
    }

    public getValue(point: Point): number {
        return this.board[point.x][point.y];
    }

    public clearPoint(point: Point) {
        this.board[point.x][point.y] = null;
        point = null;
    }
}