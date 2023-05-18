

export default class Action{
    name: string;
    hasIcon:boolean;
    iconHTML?:string;
    call:Function;


    constructor(name: string, call:Function,hasIcon:boolean, iconHTMl?:string){
        this.name = name;
        this.hasIcon=hasIcon;
        this.iconHTML=iconHTMl;
        this.call=call;
    }
}