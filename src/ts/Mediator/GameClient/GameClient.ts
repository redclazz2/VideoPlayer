import Component from "../Interfaces/gameComponentInterface";
import {Client,Room} from "colyseus.js";
import Mediator from "../Interfaces/gameMediatorInterface";

export class GameClient extends Component{
    colyseusClient:Client = new Client("http://localhost:2567");
    colyseusRoom:Room;
    sessionId:string;
    private playerMap: Map<string, any> = new Map<string, any>();

    constructor(dialog:Mediator){
        super(dialog);
    }

    colyseusCreateRoom = async(): Promise<void> => {
        this.colyseusClient.joinOrCreate("global_room").then((room) => {
            this.colyseusRoom = room;
            this.sessionId = room.sessionId;
            this.handleGlobalJoinAction();
        });
    }

    colyseusJoinRoom = async(room_id:string): Promise<void> => {

    }

    handleGlobalJoinAction = ():void =>{
        this.dialog.notify(this,"ColyseusJoinRoom",{});
    }
}