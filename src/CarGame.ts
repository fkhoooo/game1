
class CarGame extends egret.DisplayObjectContainer{
    public static GAME_OVER:string = "GAME_OVER";
    public static OUT_SIDE:string = "OUT_SIDE";
    public spriteList:any = {};
    public roadDataList:RoadData[] = [];
    public constructor() {
        super();
        this.initEvent();
        P2World.getInstance().init(); 
        this.createRoadData();
        this.createCar();
            
    }

    private initEvent()
    {   
        Dispatch.register(CarGame.GAME_OVER,this.gameOver,this);
        Dispatch.register(CarGame.OUT_SIDE,this.outSide,this); 
    }

    private createRoadData()
    {
        this.roadDataList[0] = RoadData.getRoad(0,500);
        this.roadDataList[1] = RoadData.getRoad(1,300);
        
    }

    private createCar()
    {   
        egret.setInterval(()=>{
        let roadType:number =  Math.floor(Math.random() * 2)
        let car:Car = CarFactory.getIntance().createCar(this, this.roadDataList[roadType]);
        this.spriteList[car.id] = car;
        },this,1500)

      
    }
    private outSide(id:number)
    {   
        CarFactory.getIntance().recoverCar(this.spriteList[id]);
        if(this.spriteList[id])
        {
            this.spriteList[id].dispose();
            delete this.spriteList[id]
        } 
    }

    private gameOver():void
    {   
       console.log("游戏结束");
    }  
}