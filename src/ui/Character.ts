import Container = PIXI.Container;
import { Loader } from "../core/Loader";
import { eventEmitter } from "../Main";
import { GameFlowEvent } from "../core/Event";

export class Character extends Container {
    private idle:any;
    private laugh:any;
    private jump:any;
    private shouldPlayTarget:string = 'idle';
    constructor(){
        super();
        this.idle = this.createAnim('Character_Idle', this.playAnim.bind(this));
        this.jump = this.createAnim('Character_Jump', this.playAnim.bind(this));
        this.jump.x = -14;
        this.laugh = this.createAnim('Character_Laugh', this.playAnim.bind(this));
        this.laugh.x = -17;
        this.playAnim();
        this.x = 30;
        this.y = 467;

        eventEmitter.on(GameFlowEvent.LinkedLineSuccess, ()=>{
            this.shouldPlayTarget = 'laugh';
        });
        eventEmitter.on(GameFlowEvent.TipsRequest, ()=>{
            this.shouldPlayTarget = 'jump';
        });
    }
    playAnim(){
        console.log("comcplete");
        this.idle.visible = false;
        this.laugh.visible = false;
        this.jump.visible = false;
        this[this.shouldPlayTarget].visible = true;
        this[this.shouldPlayTarget].gotoAndPlay(0);
        this.shouldPlayTarget = 'idle';
    }
    createAnim(id:string, onComplete:any){
        let anim = Loader.resources[id].textures;
        let textures = [];
        for(var index in anim) { 
            textures.push(anim[index]);
        }
        var character = new PIXI.extras.AnimatedSprite(textures);
        character.play();
        character.animationSpeed = 0.25;
        character.loop = false;
        character.onComplete = onComplete;
        this.addChild(character);
        return character;
    }
}