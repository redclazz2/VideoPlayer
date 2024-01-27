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
        this.colyseusClient.joinOrCreate("PartyRoom").then((room) => {
            this.colyseusRoom = room;
            this.sessionId = room.sessionId;
            this.handleGlobalJoinAction();
        });
    }

    colyseusJoinRoom = async(room_id:string): Promise<void> => {
        this.colyseusClient.joinById(room_id).then((room: Room) => {
            this.colyseusRoom = room;
            this.sessionId = room.sessionId;
            this.handleGlobalJoinAction();
        });
    }

    handleGlobalJoinAction = ():void =>{
        this.dialog.notify(this,"ColyseusJoinRoom",{});

         //#region Define Game Status Sync based on Colyseus
        this.colyseusRoom.state.players.onAdd((client:any, key: string) => {
            this.playerMap.set(key, client);
            this.dialog.notify(this,"ClientJoinedRoom",{});
        });
        
        this.colyseusRoom.state.players.onRemove((_client:any, key: string) => {
            this.playerMap.delete(key);
            this.dialog.notify(this,"ClientLeftRoom",{}); 
        });
        //#endregion
    }
}