import SubViewClass from "./subViewClass";
import $ from "jquery";

export default class SubViewWaitingSubmit extends SubViewClass{   
    Init(): void {
        $("#GameCodeInsert").load("../../../layouts/waitingRoom.html");
    }
}