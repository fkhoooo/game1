class P2Sprite 
{   
    public id:number;
    protected box:p2.Box;
    public body:p2.Body;
    public entity:Entity;
    public constructor(id:number)
    {
        this.id = id;
    }

    public createSprite(entity:Entity)
    {   
        this.entity = entity;
        this.box = new p2.Box({width:entity.width /  P2World.factor, height:entity.height /  P2World.factor});
        this.box.material = entity.material;
        this.body = new p2.Body({mass:entity.mass});//质量一定要加否则不动
        this.body.position = [entity.x /  P2World.factor, (egret.MainContext.instance.stage.stageHeight - entity.y) / P2World.factor];
        this.body.addShape(this.box);
        this.body.displays = [entity];
        this.body.angle = Tools.getAngle(entity.getAngle());
        this.body.velocity = Tools.getVelocity(entity.velocity);
        this.body.damping = 0;
        P2World.getInstance().world.addBody(this.body);
    }
    
    public dispose()
    {
        P2World.getInstance().world.removeBody(this.body);
        this.entity.dispose();
    }
}