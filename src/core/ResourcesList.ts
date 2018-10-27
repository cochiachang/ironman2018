class Resources{
    public id:string;
    public path:string;

    constructor(id, path) {
        this.id = id;
        this.path = path;
    }
}
export class ResourcesList{
    public static img = [
        new Resources('bunny','assets/bunny.png'),
        new Resources('background','assets/background.png'),
        new Resources('Button','assets/Button.json'),
        new Resources('Character_Idle','assets/Character_Idle.json'),
        new Resources('Character_Jump','assets/Character_Jump.json'),
        new Resources('Character_Laugh','assets/Character_Laugh.json'),
        new Resources('Icon','assets/Icon.json')
    ];
    public static sound:Array<Resources> = [
        new Resources('Sound_bg','assets/bg.mp3'),
        new Resources('Sound_level_pass','assets/level_pass.mp3'),
        new Resources('Sound_select_1','assets/select_1.mp3'),
        new Resources('Sound_select_crrect','assets/select_crrect.mp3'),
        new Resources('Sound_select_error','assets/select_error.mp3'),
        new Resources('ReloadBoard','assets/reloadBoard.mp3'),
        new Resources('Tips','assets/tips.mp3'),
        new Resources('Back','assets/back.mp3'),
        new Resources('About','assets/about.mp3'),
        
    ];
}