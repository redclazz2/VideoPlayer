import SubViewClass from "./subViewClass";
import $ from "jquery";

export default class SubViewVideoPlayer extends SubViewClass{   
    playerList:Map<string,any>

    Init(): void {
        $("#GameCodeInsert").load("../../../layouts/videoPlayer.html",{},()=>{
            $('#test').text('wiiii');
        });
    }

    setPlayerList(playerList:Map<string,any>):void{
        this.playerList = playerList; //Wow :o
        
    }
}