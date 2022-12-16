
class Main extends egret.DisplayObjectContainer {

    public static stageWidth:number;
    public static stageHeight:number;
    public static stage:egret.Stage
    public constructor()
    {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        
    }

    private onAddToStage(event: egret.Event)
    {   
        Main.stageWidth = egret.MainContext.instance.stage.stageWidth;
        Main.stageHeight = egret.MainContext.instance.stage.stageHeight;
        let wrd:p2.World = new p2.World();
        this.runGame()

        Main.stage = this.stage;
    }

    private async runGame() {
        await this.loadResource()
        await this.loadJson();
        this.createGameScene();
    }

    private async loadResource() {
        try {
            const loadingView = new LoadingUI();
            this.stage.addChild(loadingView);
            await RES.loadConfig("resource/default.res.json", "resource/");
            await RES.loadGroup("preload", 0, loadingView);
            this.stage.removeChild(loadingView);
        }
        catch (e) {
            console.error(e);
        }
    }

    private async loadJson() {
        try {
            const loadingView = new LoadingUI();
            this.stage.addChild(loadingView);
            await RES.loadGroup("preloadJson", 0, loadingView);
            this.stage.removeChild(loadingView);
            let jsonList = RES.getGroupByName("preloadJson");
            let zip:JSZip = new JSZip(RES.getRes("jsonData_bin"));
            //解压打包的json 在解析
           /* for(let key in  zip["files"])
            {
                let jsonName:string = key
                let className:string = jsonName.charAt(0).toUpperCase() + jsonName.slice(1); 
                className = className.replace(".json","_json");
                let item:any = egret.getDefinitionByName(className);
                let data = zip.file(jsonName);
                zip.remove(jsonName);
                if(data)
                {   
                    item && item.decodeJson(JSON.parse(data.asText()))  
                }
            }*/

            //直接解析
            for(let i:number = 0; i < jsonList.length; i++)
            {   
                let jsonName:string = jsonList[i].name;
                if(jsonName == "jsonData_bin") continue;
                let className:string = jsonName.charAt(0).toUpperCase() + jsonName.slice(1); 
                let item:any = egret.getDefinitionByName(className);
                if(item)
                {
                   item.decodeJson(RES.getRes(jsonName))   
                }
            }
        }
        catch (e) {
            console.error(e);
        }
    }
    /**
     * 创建场景界面
     * Create scene interface
     */
    protected createGameScene(): void
    {
        this.stage.addChild(new DungeonFighter())
    }
   
}
