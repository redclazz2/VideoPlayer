import $ from "jquery";
import Cookies from "js-cookie";

$("#GoButton").on("click", function(){
    var RoomCodeInput = $("#RoomCode").val()?.toString();    
    Cookies.set("Join",RoomCodeInput != undefined ? RoomCodeInput : "");
    window.location.href = "./gameView.html";
});