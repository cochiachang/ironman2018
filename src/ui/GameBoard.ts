import Container = PIXI.Container;
import {Board} from "../core/Board";
import {Loader} from "../core/Loader";
import Point = PIXI.Point;
import {Path} from "../core/Path";
import {SoundMgr} from "../core/SoundMgr";
import { GameIcon } from "./GameIcon";
import { LinkedLine } from "./LinkedLine";
import { eventEmitter } from "../Main";
import { GameFlowEvent } from "../core/Event";


export let board:Board;

export class GameBoard extends Container{

    private select1 = new Point(-1, -1);
    private select2 = new Point(-1, -1);
    private selected = false;
    private pathHistory = [];
    private valueHistory = [];
    private reloadTimes = 3;
    private selectedBorder:PIXI.Graphics;
    
    constructor() {
        super();
        this.createNewGame();
        this.x = 175;
        this.y = 20;

        eventEmitter.on(GameFlowEvent.RevertBackRequest,this.revertBoard.bind(this));
    }
    
    createNewGame = ()=>{
        this.select1 = new Point(-1, -1);
        this.select2 = new Point(-1, -1);
        this.selected = false;
        this.pathHistory = [];
        this.valueHistory = [];
        this.reloadTimes = 3;
        board = new Board();
        this.drawBoardIcon();
    };

    revertBoard = ()=>{
        let value = this.valueHistory.pop();
        let path = this.pathHistory.pop();
        if(value != null && path != null){
            board.board[path.point1.x][path.point1.y] = value;
            board.board[path.point2.x][path.point2.y] = value;

            this.drawBoardIcon();
            SoundMgr.play('Back');
        }
    }

    drawBoardIcon = ()=>{
        this.removeChildren();
        for (var i =0;i<board.board.length;i++){
            for (var j = 0; j<board.board[i].length;j++){
                this.createIcon(board.board[i][j], i, j);
            }
        }
    };
    
    clearIcon = (point:Point)=>{
        this.removeChild(this.getChildByName('icon_'+point.x+"_"+point.y));
        board.clearPoint(point);
    };
    
    iconSelected = (point:Point)=>{
        let icon = this.getChildByName('icon_'+point.x+"_"+point.y) as GameIcon;
        icon.select();
    };

    iconUnSelected = (point:Point)=>{
        let icon = this.getChildByName('icon_'+point.x+"_"+point.y) as GameIcon;
        icon.unSelect();
    };
    
    createIcon = (id, x, y)=>{
        let icon = new GameIcon(id,x,y);
        this.addChild(icon);
        let iconClickHandler = ()=>{
            if (this.selected) {
                let selectCorrect = false;
                this.select2 = new Point(x, y);
                this.iconSelected(this.select2);
                setTimeout(()=>{
                    if (board.hasSameValue(this.select1, this.select2)) {
                        if (! (this.select1.x == x && this.select1.y == y) ) {
                            let path = new Path(this.select1, this.select2, board);
                            if(path.canLinkInLine()){
                                this.pathHistory.push(path);
                                this.valueHistory.push(board.getValue(this.select1));
                                LinkedLine.instance.drawPath(path);
                                this.clearIcon(this.select1);
                                this.clearIcon(this.select2);
                                eventEmitter.emit(GameFlowEvent.LinkedLineSuccess);
                                selectCorrect = true;
                                //判斷還有沒有路走
                                if(board.gameRoundEnd()){
                                    alert("恭喜完成遊戲!");
                                    this.createNewGame();
                                }else if(board.getFirstExistPath() == null){
                                    this.reloadTimes--;
                                    board.rearrangeBoard();
                                }
                            }
                        }
                    }
                    if(selectCorrect){
                        SoundMgr.play('Sound_select_crrect');
                    }else{
                        SoundMgr.play('Sound_select_error');
                        this.iconUnSelected(this.select1);
                        this.iconUnSelected(this.select2);
                    }
                    this.selected = false;
                },0);
                
            } else {
                this.select1 = new Point(x, y);
                this.iconSelected(this.select1);
                this.selected = true;
                SoundMgr.play('Sound_select_1');
                
            }
        };
        icon.on("click", iconClickHandler);
        icon.on("tap", iconClickHandler);
    }
}