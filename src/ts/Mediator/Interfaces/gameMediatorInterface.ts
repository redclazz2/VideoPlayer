import Component from "./gameComponentInterface";

export default interface Mediator{
    notify(sender:Component, event:string,args:any):void;
}