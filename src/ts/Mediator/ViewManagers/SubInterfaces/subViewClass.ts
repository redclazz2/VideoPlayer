import ViewManager from "../viewManager";
import SubView from "./subViewInterface";

export default class SubViewClass implements SubView{
    MainView:ViewManager;

    constructor(MainView:ViewManager){
        this.MainView = MainView;
    }

    Init(): void {
        throw new Error("Method not implemented.");
    }

}