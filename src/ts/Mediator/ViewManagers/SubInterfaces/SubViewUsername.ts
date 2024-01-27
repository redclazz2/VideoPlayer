import SubViewClass from "./subViewClass";
import $ from "jquery";

export default class SubViewEnterUsername extends SubViewClass{
    
    Init(): void {
        $("#GameCodeInsert").load("../../../layouts/usernameInput.html",{},this.AddControls);
    }

    AddControls = ():void =>{
        $("#usernameInput").on("click",function(){

        });
    }

}