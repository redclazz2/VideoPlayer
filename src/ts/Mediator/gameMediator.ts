import { GameClient } from "./GameClient/GameClient";
import Component from "./Interfaces/gameComponentInterface";
import Mediator from "./Interfaces/gameMediatorInterface";
import Cookies from "js-cookie";

export default class GameMediator implements Mediator{
    private gameClient:GameClient;

    init = () => {
        this.gameClient = new GameClient(this);

        if(Cookies.get("Join") == undefined){
            this.gameClient.colyseusCreateRoom();
        }else{
            //Joins a room
        }
    }

    notify(sender: Component, event: string, args: any): void {
        throw new Error("Method not implemented.");
    }
}