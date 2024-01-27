import SubViewClass from "./subViewClass";
import $ from "jquery";

export default class SubViewWaitingPlayers extends SubViewClass{   
    Init(): void {
        this.Identifier = "WaitingLobby";
        $("#GameCodeInsert").load("../../../layouts/waitingRoom.html",{},this.AddControls);
    }

    AddControls = ():void =>{
        var ViewMe = this.MainView;
        var Mediator = this.MainView.dialog;
        
        $("#LobbyStartButton").on("click",function(){
            Mediator.notify(ViewMe,"LobbyForceStart",{});
        });

        Mediator.notify(ViewMe,"LoadedWaitingRoom",{});
    }

    UpdatePlayerList = (PlayerMap:Map<string,any>):void =>{
        $("#PlayersInLobby").html('');
        PlayerMap.forEach((value: any, _key: string) => {
            $("#PlayersInLobby").append(`<li>${value.username}</li>`);
        });
    }
}