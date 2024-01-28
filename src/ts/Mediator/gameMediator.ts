import { GameClient } from "./GameClient/GameClient";
import Component from "./Interfaces/gameComponentInterface";
import Mediator from "./Interfaces/gameMediatorInterface";
import Cookies from "js-cookie";
import ViewManager from "./ViewManagers/viewManager";
import SubViewEnterUsername from "./ViewManagers/SubViews/SubViewUsername";
import SubViewWaitingPlayers from "./ViewManagers/SubViews/subViewWaitingPlayers";
import SubViewESubmitVideo from "./ViewManagers/SubViews/subViewSubmitVideo";
import SubViewWaitingSubmit from "./ViewManagers/SubViews/subViewWaitingSubmit";
import SubViewVideoPlayer from "./ViewManagers/SubViews/subViewVideoPlayer";

export default class GameMediator implements Mediator{
    gameClient:GameClient;
    viewManager:ViewManager;

    //private isHost:boolean;

    init = () => {
        this.gameClient = new GameClient(this);
        this.viewManager = new ViewManager(this);

        var JoinData = Cookies.get("Join");
        
        if(JoinData == undefined){
            //this.isHost = true;
            this.gameClient.colyseusCreateRoom();
        }else{
            //this.isHost = false;
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

    handleGameClientEvent(event:string,_args:any):void{
        switch(event){
            case "ColyseusJoinRoom":
                this.viewManager.InitializeRoomCodeNavbar(this.gameClient.colyseusRoom.id);
                this.viewManager.ChangeCurrentSubView(new SubViewEnterUsername(this.viewManager));
            break;

            case "ClientJoinedRoom":
                this.UpdatePlayerListOnView();
                break;

            case "ClientLeftRoom":
                this.UpdatePlayerListOnView();
                break;
            
            case "ClientDataUpdate":
                this.UpdatePlayerListOnView();
                break;

            case "LobbyForceStart":
                this.viewManager.ChangeCurrentSubView(new SubViewESubmitVideo(this.viewManager));
                break;

            case "VideoDataUpdate":
                this.viewManager.ChangeCurrentSubView(new SubViewVideoPlayer(this.viewManager));
                var tempSubpage = this.viewManager.currentSubview as SubViewVideoPlayer;
                tempSubpage.setPlayerList(this.gameClient.colyseusRoom.state.players);

                break;
        }
    }

    handleViewEvent(event:string,args:any){
        switch(event){
            case "UsernameRegistration":
                this.gameClient.sendLocalUsername(args);
                this.viewManager.ChangeCurrentSubView(new SubViewWaitingPlayers(this.viewManager));
            break;

            case "LoadedWaitingRoom":
                this.UpdatePlayerListOnView();
            break;

            case "LobbyForceStart":
                this.viewManager.ChangeCurrentSubView(new SubViewESubmitVideo(this.viewManager));
                this.gameClient.sendStartSignal();
            break;

            case "VideoRegistration":
                this.viewManager.ChangeCurrentSubView(new SubViewWaitingSubmit(this.viewManager));
                this.gameClient.sendVideoRegistration(args);
            break;
        }
    }

    UpdatePlayerListOnView(){
        if(this.viewManager.currentSubview.Identifier == "WaitingLobby"){
            var view = this.viewManager.currentSubview as SubViewWaitingPlayers;
            view.UpdatePlayerList(this.gameClient.colyseusRoom.state.players);
        }
    }
}