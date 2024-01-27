import Mediator from "./gameMediatorInterface";

export default class Component{
    dialog:Mediator;

    constructor(dialog:Mediator){
        this.dialog = dialog;
    }

    //This will implement new methods
}