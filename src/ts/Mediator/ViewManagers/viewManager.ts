import $ from "jquery";
import Component from "../Interfaces/gameComponentInterface";
import SubView from "./SubInterfaces/subViewInterface";

export default class ViewManager extends Component{
    currentSubview:SubView;

    InitializeRoomCodeNavbar = (room_id:string) =>{
        $("#RoomCodeInsert").load("../layouts/roomCode.html",{},function(){
            $("#roomCodeTitle").append(room_id);
        });
    }

    ChangeCurrentSubView = async (newSubView:SubView) => {
        $("#GameCodeInsert").html('');
        this.currentSubview = newSubView;
        this.currentSubview.Init();
    }
}