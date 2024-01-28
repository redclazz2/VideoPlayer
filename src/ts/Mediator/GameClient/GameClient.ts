import Component from "../Interfaces/gameComponentInterface";
import {Client,Room} from "colyseus.js";
import Mediator from "../Interfaces/gameMediatorInterface";

enum ColyseusMessagesTypes{
    SendPlayerUsernameRegistration,
    SendLobbyStartForce,
    SendVideoRegistration
}

export class GameClient extends Component{
    colyseusClient:Client = new Client("http://10.32.34.213:2567");
    colyseusRoom:Room;
    sessionId:string;
    private playerMap: Map<string, any> = new Map<string, any>();

    constructor(dialog:Mediator){
        super(dialog);
    }

    colyseusCreateRoom = async(): Promise<void> => {
        this.colyseusClient.create("PartyRoom").then((room) => {
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

        this.colyseusRoom.onMessage(ColyseusMessagesTypes.SendPlayerUsernameRegistration,(message:any) => {
            this.playerMap.set(message.player,message.data);
            this.dialog.notify(this,"ClientDataUpdate",{}); 
        });

        this.colyseusRoom.onMessage(ColyseusMessagesTypes.SendLobbyStartForce,()=>{
            this.dialog.notify(this,"LobbyForceStart",{});
        });

        this.colyseusRoom.onMessage(ColyseusMessagesTypes.SendVideoRegistration,(message:any)=>{
            console.log(message)
        });

         //#region Define Game Status Sync based on Colyseus
        this.colyseusRoom.state.players.onAdd((client:any, key: string) => {
            this.playerMap.set(key, client);
            this.dialog.notify(this,"ClientJoinedRoom",{});
        });
        
        this.colyseusRoom.state.players.onRemove((_client:any, key: string) => {
            this.playerMap.delete(key);
            this.dialog.notify(this,"ClientLeftRoom",{}); 
        });

        this.colyseusRoom.state.players.onChange((value:any,key:string) =>{
            this.playerMap.set(key,value);
            this.dialog.notify(this,"ClientDataUpdate",{}); 
        });
        //#endregion
    }

    sendLocalUsername = (username:string) =>{
        this.colyseusRoom.send(ColyseusMessagesTypes.SendPlayerUsernameRegistration,{
            RegisteredUsername : username
        });
    }

    sendStartSignal = () => {
        this.colyseusRoom.send(ColyseusMessagesTypes.SendLobbyStartForce);
    }

    sendVideoRegistration = (args:any) =>{
        this.colyseusRoom.send(ColyseusMessagesTypes.SendVideoRegistration,args);
    }
}