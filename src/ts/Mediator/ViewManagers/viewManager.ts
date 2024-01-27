import $ from "jquery";
import Component from "../Interfaces/gameComponentInterface";

export default class ViewManager extends Component{
    InitializeRoomCodeNavbar = (room_id:string) =>{
        $("#RoomCodeInsert").load("../layouts/roomCode.html",{},function(){
            $("#roomCodeTitle").append(room_id);
        });
    }    
}