import $ from "jquery";
import Cookies from "js-cookie";

$("#HostButton" ).on("click", function() {
    window.location.href = "./pages/gameView.html";
    Cookies.remove("Join");
});

$("#JoinButton" ).on("click", function(){
    window.location.href = "./pages/gameJoinCode.html";
});