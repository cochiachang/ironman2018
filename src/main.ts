/// <reference path='../node_modules/@types/angular/index.d.ts' />
/// <reference path='../node_modules/@types/jquery/index.d.ts' />
/// <reference path='../node_modules/@types/pixi.js/index.d.ts' />

import Point = PIXI.Point;

//產生盤面
var app = angular.module('LianLianKan', []);
app.controller('myCtrl', function ($scope) {
    $scope.select1 = new Point(-1, -1);
    $scope.select2 = new Point(-1, -1);
    $scope.selected = false;
    let msgArra = [];
    $scope.message = msgArra;
    let board = new Board();
    $scope.boardContent = board.board;
    $scope.click = function (x: number, y: number) {
        if ($scope.selected) {
            $scope.select2 = new Point(x, y);
            if (board.hasSameValue($scope.select1, $scope.select2)) {

                
                if (! ($scope.select1.x == x && $scope.select1.y == y) ) {

                    let path = new Path($scope.select1, $scope.select2, board);
                    if(path.canLinkInLine()){
                        board.clearPoint($scope.select1);
                        board.clearPoint($scope.select2);
                        msgArra.push(path);
                    }
                }
            }
            $scope.selected = false;
        } else {
            $scope.select1 = new Point(x, y);
            $scope.selected = true;
        }
    };
});

class Path {
    public point1: Point;
    public point2: Point;
    readonly board: Board;
    public path_Detail:Array<Point>;

    constructor(point1: Point, point2: Point, board: Board) {
        this.point1 = point1;
        this.point2 = point2;
        this.board = board;
    }

    public canLinkInLine(): boolean {

        console.log("board",this.board);
        
        //從上面消
        let point1UP = this.board.getNearByPointByDirection(this.point1, Direction.UP);
        let point2UP = this.board.getNearByPointByDirection(this.point2, Direction.UP);
        console.log("point1UP",point1UP,"point2UP",point2UP);
        {
            let min = Math.max(point1UP.x,point2UP.x);
            let max = Math.min(this.point1.x, this.point2.x);
            for (var i = max;i>=min;i--){
                if (!this.board.hasMiddleValue(new Point(i, this.point1.y), new Point(i, this.point2.y))){
                    this.path_Detail = [this.point1,new Point(i, this.point1.y),new Point(i, this.point2.y),this.point2];
                    console.log("same up");
                    return true;
                }
            } 
        }
        //從下面消
        let point1DOWN = this.board.getNearByPointByDirection(this.point1, Direction.DOWN);
        let point2DOWN = this.board.getNearByPointByDirection(this.point2, Direction.DOWN);
        console.log("point1DOWN",point1DOWN,"point2DOWN",point2DOWN);
        {
            let max = Math.min(point1DOWN.x,point2DOWN.x);
            let min = Math.max(this.point1.x, this.point2.x);
            for (var i = min;i<=max;i++){
                if (!this.board.hasMiddleValue(new Point(i, this.point1.y), new Point(i, this.point2.y))){
                    this.path_Detail = [this.point1,new Point(i, this.point1.y),new Point(i, this.point2.y),this.point2];
                    console.log("same down");
                    return true;
                }
            }
        }
        
        //從左邊消
        let point1LEFT = this.board.getNearByPointByDirection(this.point1, Direction.LEFT);
        let point2LEFT = this.board.getNearByPointByDirection(this.point2, Direction.LEFT);
        console.log("point1LEFT",point1LEFT,"point2LEFT",point2LEFT);
        {
            let min = Math.max(point1LEFT.y,point2LEFT.y);
            let max = Math.min(this.point1.y, this.point2.y);
            for (var i = max;i>=min;i--) {
                if (!this.board.hasMiddleValue(new Point(this.point1.x, i), new Point(this.point2.x, i))) {
                    this.path_Detail = [this.point1, new Point(this.point1.x, i), new Point(this.point2.x, i), this.point2];
                    console.log("same left");
                    return true;
                }
            }
        }
        
        //從右邊消
        let point1RIGHT = this.board.getNearByPointByDirection(this.point1, Direction.RIGHT);
        let point2RIGHT = this.board.getNearByPointByDirection(this.point2, Direction.RIGHT);
        console.log("point1RIGHT",point1RIGHT,"point2RIGHT",point2RIGHT);
        {
            let max = Math.min(point1RIGHT.y,point2RIGHT.y);
            let min = Math.max(this.point1.y, this.point2.y);
            for (var i = min;i<=max;i++) {
                if (!this.board.hasMiddleValue(new Point(this.point1.x, i), new Point(this.point2.x, i))) {
                    this.path_Detail = [this.point1, new Point(this.point1.x, i), new Point(this.point2.x, i), this.point2];
                    console.log("same right");
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
                        console.log("same left to right");
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
                        console.log("same top to down");
                        return true;
                    }
                }
            }
        } 
        
        return false;
    }

    public hasPathAround(): boolean {

        return true;
    }
}

class Direction {
    public static UP: string = "up";
    public static DOWN: string = "down";
    public static RIGHT: string = "right";
    public static LEFT: string = "left";
}

class Board {
    public board: Array<Array<number>>;

    constructor() {
        let content = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];
        //產生初始局面
        let length = 10;
        let data = content.concat(content).concat(content).concat(content).sort((a, b) => (Math.random() > .5) ? 1 : 0);
        this.board = []
        for (var i = 0;i<length;i++){
            this.board.push(data.slice(i*length, (i+1)*length))
        }
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

    public clearPoint(point: Point) {
        this.board[point.x][point.y] = null;
        point = null;
    }
}



