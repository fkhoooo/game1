class DungeonFighter extends egret.DisplayObjectContainer implements IAnimatable
{   
    private enemy1:Enemy1;
    private hero1:Hero1;
    private mouseVt:Vector2D = new Vector2D();
    private ai:FleeAi = new FleeAi();
    public constructor()
    {   
        super()
        this.enemy1 = new Enemy1()
        this.enemy1.init(10,400,15,45)
        this.addChild(this.enemy1);
        SpiritManage.instance.enemyPool.push(this.enemy1);

        this.hero1 = new Hero1()
        this.hero1.init(300,500,25,90);
        this.addChild(this.hero1);
        SpiritManage.instance.heroPool.push(this.hero1);

       
        this.enemy1.createAi()
        this.hero1.createAi();
        
        EnterFrameManager.instance.init();
        EnterFrameManager.instance.add(this);
        // Main.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.moveHandler,this)
        
    }

    /*private moveHandler(e:egret.TouchEvent)
    {   
        this.mouseVt.x = e.stageX
        this.mouseVt.y = e.stageY
    }*/

	public advanceTime(passedTime: number):void
	{
        /*if(!this.mouseVt.isZero())
        {
            this.ai.doExecute(this.hero1,this.mouseVt)
            this.hero1.update()
        }*/
        this.enemy1.update();
        this.hero1.update();
        // this.enemy2.update();
    }
}