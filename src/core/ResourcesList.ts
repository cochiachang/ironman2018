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
}