import Video from "../../../../classes/video";
import ViewManager from "../viewManager";
import SubViewClass from "./subViewClass";
import $ from "jquery";


declare global {
    interface Window {
        YT: {
            Player: Function;
        };
    }
}

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

let player:any;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('reproductor', {
        height: '100%',  // Cambiado a porcentaje
        width: '100%',   // Cambiado a porcentaje
        videoId: '',     // Inicialmente sin video
        playerVars: {
            'autoplay': 1,
            'controls': 0,  // Oculta los controles
            'disablekb': 1, // Desactiva el teclado
            'fs': 0,        // Oculta el botón de pantalla completa
            'modestbranding': 1 // Oculta el logo de YouTube
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': (event) => {
                if (event.data == YT.PlayerState.PAUSED) {
                    player.playVideo();
                }
            }
        }
    });
}