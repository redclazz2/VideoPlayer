import SubViewClass from "./subViewClass";
import $ from "jquery";

export default class SubViewEnterUsername extends SubViewClass{   
    Init(): void {
        $("#GameCodeInsert").load("../../../layouts/usernameInput.html",{},this.AddControls);
    }

    AddControls = ():void =>{
        var ViewMe = this.MainView;
        var Mediator = this.MainView.dialog;
        $("#usernameInput").on("click",function(){
            Mediator.notify(ViewMe,"UsernameRegistration",$("#txtUsername").val())
        });
    }
}