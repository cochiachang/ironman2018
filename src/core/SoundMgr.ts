import {ResourcesList} from "./ResourcesList";

export class SoundMgr {
    static isMute: boolean = false;
    private static soundList:Array<SoundInfo> = new Array<SoundInfo>();
    public static load(){
        ResourcesList.sound.forEach(element => {
            let info = new SoundInfo(element.id, element.path);
            this.soundList.push(info);
        });
    }
    public static play(id, loop = false){
        this.soundList.forEach(element => {
            if (element.soundID == id){
                element.sound.loop(loop);
                element.sound.play();
            } 
        });
    }
    public static mute(value:boolean):void {
        this.isMute = value;
        if (this.isMute) {
            //禁聲
            Howler.mute(true);
        } else {
            //出聲
            Howler.mute(false);
        }
    }
}
class SoundInfo{
    public soundID:string;
    public path:string;
    public sound:Howl;
    constructor(_id:string, url:string) {
        this.soundID = _id;
        this.path = url;
        this.load();
    }
    public load(){
        this.sound = new Howl({src: this.path});
    }
}