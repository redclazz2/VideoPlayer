import Video from "../../../../classes/video";
import ViewManager from "../viewManager";
import SubViewClass from "./subViewClass";
import $ from "jquery";

export default class SubViewVideoPlayer extends SubViewClass{   
    playerList:Map<string,any>
    videoList:Video[]
    

    constructor(MainView:ViewManager,VideoList:Video[]){
        super(MainView);
        this.videoList = VideoList;
    }

    Init(): void {
        $("#GameCodeInsert").load("../../../layouts/videoPlayer.html",{},()=>{

        });
    }

    setPlayerList(playerList:Map<string,any>):void{
        this.playerList = playerList; //Wow :o
    }

    playRound():void{
        for(var v in this.videoList){

        }
    }
}