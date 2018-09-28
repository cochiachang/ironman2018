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
    let board = Board.createBoard();
    $scope.boardContent = board;
    $scope.click = function (x: number, y: number) {
        if ($scope.selected) {
            if (board[$scope.select1.x][$scope.select1.y]
                == board[x][y]) {
                $scope.select2 = new Point(x, y);
                calculatePath($scope.select1, $scope.select2, board);
            } else {
                $scope.selected = false;
            }
        } else {
            $scope.select1 = new Point(x, y);
            $scope.selected = true;
        }
    };
});


function calculatePath(point1: Point, point2: Point, board: Array<Array<number>>) {
    var value = board[point1.x][point1.y];
    console.log(point1, point2, value)
    if (true) {

    }
}

function hasIconBelow() {

}
class Board {
    public static createBoard() {
        var content = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        //產生初始局面
        let data = content.concat(content).concat(content).concat(content).sort((a, b) => (Math.random() > .5) ? 1 : 0);
        let boardContent = [data.slice(0, 6),
        data.slice(6, 12),
        data.slice(12, 18),
        data.slice(18, 24),
        data.slice(24, 30),
        data.slice(30, 36)];
        return boardContent;
    }
}



