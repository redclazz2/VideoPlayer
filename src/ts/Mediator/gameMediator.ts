import { GameClient } from "./GameClient/GameClient";
import Component from "./Interfaces/gameComponentInterface";
import Mediator from "./Interfaces/gameMediatorInterface";
import Cookies from "js-cookie";
import ViewManager from "./ViewManagers/viewManager";
import SubViewEnterUsername from "./ViewManagers/SubInterfaces/SubViewUsername";

export default class GameMediator implements Mediator{
    private gameClient:GameClient;
    private viewManager:ViewManager;

    private isHost:boolean;

    init = () => {
        this.gameClient = new GameClient(this);
        this.viewManager = new ViewManager(this);

        var JoinData = Cookies.get("Join");
        
        if(JoinData == undefined){
            this.isHost = true;
            this.gameClient.colyseusCreateRoom();
        }else{
            this.isHost = false;
            this.gameClient.colyseusJoinRoom(JoinData);
        }
    }

    notify(sender: Component, event: string, args: any): void {
        if(sender == this.gameClient){
            this.handleGameClientEvent(event,args);
        }

        if(sender == this.viewManager){
            this.handleViewEvent(event,args);
        }
    }

    handleGameClientEvent(event:string,args:any):void{
        switch(event){
            case "ColyseusJoinRoom":
                this.viewManager.InitializeRoomCodeNavbar(this.gameClient.colyseusRoom.id);
                this.viewManager.ChangeCurrentSubView(new SubViewEnterUsername(this.viewManager));
            break;
        }
    }

    handleViewEvent(event:string,args:any){
        switch(event){
            case "UsernameRegistration":
                this.gameClient.sendLocalUsername(args);
            break;
        }
    }
}