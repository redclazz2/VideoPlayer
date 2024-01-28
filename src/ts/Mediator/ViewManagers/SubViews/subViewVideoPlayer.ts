import Video from "../../../../classes/video";
import ViewManager from "../viewManager";
import SubViewClass from "./subViewClass";
import $ from "jquery";
import "youtube-video-js";

export default class SubViewVideoPlayer extends SubViewClass{   
    playerList:Map<string,any>;
    videoList:Video[]
    currentVideoPointer = 0;
    YoutubePlayer:any;
    
    constructor(MainView:ViewManager,VideoList:Video[],playerList:Map<string,any>){
        super(MainView);
        this.videoList = VideoList;
        this.playerList = playerList;
    }

    Init(): void {
        $("#GameCodeInsert").load("../../../layouts/videoPlayer.html");
    }

    playNextVideo():void{
        //$("").;
    }
}