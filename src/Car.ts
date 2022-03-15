class Car extends P2Sprite
{
    private isPause:boolean;
    private lastVelocity:number[] = [];
    private lastForce:number[] = [];
    public constructor(id:number)
    {
        super(id);
    }
    public createSprite(entity:Entity)
    {   
        super.createSprite(entity);
        this.isPause = false;
        this.entity.addEventListener(egret.TouchEvent.TOUCH_TAP,this.beginTouch,this);
        
    }
    private beginTouch(e:TouchEvent):void
    {   
        this.isPause = ! this.isPause;
        if(this.isPause)
        {
            this.lastVelocity = this.body.velocity.concat();
            this.body.velocity = [0,0];

            this.lastForce = this.entity.force.concat();
            this.entity.force = [0,0];
            this.body.force = [0,0];
        }
        else
        {
            this.body.velocity = this.lastVelocity;
            this.entity.force = this.lastForce;
        }
    }

    public dispose()
    {
        this.entity.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.beginTouch,this);
        super.dispose();
    }
}