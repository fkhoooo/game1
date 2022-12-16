class Entity extends egret.DisplayObjectContainer
{   
    public id:number;
    private skin:egret.Bitmap;
    public velocity:number[] = []; //初始速度
    public max_velocity:number[] = [];//最大的速度
    public force:number[] = [];//加速度;
    public mass:number; //质量
    public material:p2.Material;
    public isClear:boolean;
    private roadData:RoadData;//所属路数据
    public constructor()
    {   
        super();
       
    }

    public setData(roadData:RoadData,contation:any,texture:egret.Texture)
    {
        this.roadData = roadData;
        if(!this.skin)
        {
            this.skin = new egret.Bitmap();
            this.skin.touchEnabled = true;
        }
        this.skin.texture = texture;
        this.width = texture.textureWidth;
        this.height = texture.textureHeight;
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2;
        let beginPs:number[] = this.getBeginPos();
        this.x = beginPs[0];
        this.y = beginPs[1]; 
        this.addChild(this.skin);
        contation.addChild(this);
        this.isClear = false;
    }


    /**
     * 起始坐标
     */
    public getBeginPos():number[]
    {
        switch(this.roadData.type)
        {
            case 0:return [Main.stageWidth + this.width,Math.floor(Math.random() * this.roadData.roadWidth + this.roadData.position)];    
            case 1: return [Math.floor(Math.random() * this.roadData.roadWidth + this.roadData.position),Main.stageHeight + this.height];
            case 2:return [-this.width ,Math.floor(Math.random() * this.roadData.roadWidth + this.roadData.position)];  
            case 3:return [Math.floor(Math.random() * this.roadData.roadWidth + this.roadData.position),-this.height];     
        }
    }
    
    /**
     * 车的角度
     */
    public getAngle():number
    {   
        switch(this.roadData.type)
        {
            case 0: return 0;
            case 1: return 270;
            case 2: return 180;
            case 3: return 90;  
        }      
    }

    /**
     * 速度向量
     */
    public setVelocity(speed:number)
    {
        switch(this.roadData.type)
        {
            case 0: this.velocity = [-1 * speed,0]; break;
            case 1: this.velocity = [0,-1 * speed]; break;
            case 2: this.velocity = [speed,0]; break;
            case 3: this.velocity = [0,speed]; break;   
        }      
    }


    /**
     * 设置力(加速度)
     */
    public setForce(speed:number)
    {
        switch(this.roadData.type)
        {
            case 0: this.force = [-1 * speed,0]; break;
            case 1: this.force = [0,-1 * speed]; break;
            case 2: this.force = [speed,0]; break;
            case 3: this.force = [0,speed]; break;   
        }  
    }

    public isOutSide():boolean
    {
        switch(this.roadData.type)
        {
            case 0: return this.x < 0;        
            case 1: return this.y < 0;
            case 2: return this.x > Main.stageWidth;
            case 3: return this.y > Main.stageHeight;    
        }  
    }

    public dispose():void
    {   
        this.force = [0,0];
        this.skin && this.removeChild(this.skin);
        this.parent && this.parent.removeChild(this);
    }
 
}