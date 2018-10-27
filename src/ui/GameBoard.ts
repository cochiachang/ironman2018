import Container = PIXI.Container;
import {Board} from "../core/Board";
import {Loader} from "../core/Loader";
import Point = PIXI.Point;
import {Path} from "../core/Path";
import {SoundMgr} from "../core/SoundMgr";


export let board:Board;

export class GameBoard extends Container{

    private select1 = new Point(-1, -1);
    private select2 = new Point(-1, -1);
    private selected = false;
    private msgArr = [];
    private reloadTimes = 3;
    private selectedBorder:PIXI.Graphics;
    
    constructor() {
        super();
        this.createNewGame();
        this.x = 175;
        this.y = 20;
    }
    
    createNewGame = ()=>{
        this.removeChildren();
        this.select1 = new Point(-1, -1);
        this.select2 = new Point(-1, -1);
        this.selected = false;
        this.msgArr = [];
        this.reloadTimes = 3;
        board = new Board();
        for (var i =0;i<board.board.length;i++){
            for (var j = 0; j<board.board[i].length;j++){
                this.createIcon(board.board[i][j], i, j);
            }
        }
    };
    
    clearIcon = (point:Point)=>{
        this.removeChild(this.getChildByName('icon_'+point.x+"_"+point.y));
        board.clearPoint(point);
        this.removeChild(this.selectedBorder);
    };
    
    IconSelected = (point:Point)=>{
    };

    IconUnSelected = (point:Point)=>{
    };
    
    createIcon = (id, x, y)=>{
        let icon = PIXI.Sprite.from(Loader.resources['Icon'].textures['icon_' + id]);
        icon.name = 'icon_'+x+"_"+y;
        icon.width = icon.height = 45;
        icon.x = (icon.width + 20) * x + 22.5;
        icon.y = (icon.width + 6) * y + 22.5;
        icon.anchor.set(0.5);
        icon.buttonMode = true;
        icon.interactive = true;
        this.addChild(icon);
        let iconClickHandler = ()=>{
            if (this.selected) {
                let selectCorrect = false;
                this.select2 = new Point(x, y);
                if (board.hasSameValue(this.select1, this.select2)) {
                    if (! (this.select1.x == x && this.select1.y == y) ) {
                        let path = new Path(this.select1, this.select2, board);
                        if(path.canLinkInLine()){
                            this.msgArr.push(path);
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
                    this.clearIcon(this.select1);
                    this.clearIcon(this.select2);
                    SoundMgr.play('Sound_select_crrect');
                }else{
                    SoundMgr.play('Sound_select_error');
                    this.IconUnSelected(this.select1);
                }
                this.selected = false;
            } else {
                this.select1 = new Point(x, y);
                this.IconSelected(this.select1);
                this.selected = true;
                SoundMgr.play('Sound_select_1');
                
            }
        };
        icon.on("click", iconClickHandler);
        icon.on("tap", iconClickHandler);
    }
}