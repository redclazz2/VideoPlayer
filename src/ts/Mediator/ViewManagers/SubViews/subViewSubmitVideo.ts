import SubViewClass from "./subViewClass";
import $ from "jquery";

export default class SubViewESubmitVideo extends SubViewClass{   
    Init(): void {
        $("#GameCodeInsert").load("../../../layouts/videoSubmit.html",{},this.AddControls);
    }

    AddControls = ():void =>{
        var ViewMe = this.MainView;
        var Mediator = this.MainView.dialog;
        $("#VideoSubmit").on("click",function(){
            Mediator.notify(ViewMe,"VideoRegistration",{
                VideoUrl: $().val(),
                VideoDesc: $().val()
            })
        });
    }
}