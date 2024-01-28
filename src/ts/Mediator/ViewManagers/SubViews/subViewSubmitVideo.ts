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
            var videoUrl = $("#videoUrl").val();
            var videoDesc = $("#videoCaption").val();
            
            if(videoUrl != "" && videoDesc != "")
            Mediator.notify(ViewMe,"VideoRegistration",{
                VideoUrl: videoUrl,
                VideoDesc: videoDesc
            })
        });
    }
}