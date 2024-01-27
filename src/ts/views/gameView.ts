import $ from "jquery";
import 'bootstrap/dist/js/bootstrap.bundle.js';
import GameMediator from "../Mediator/gameMediator";

$(()=>{
    const gameDialog = new GameMediator();
    gameDialog.init();
});