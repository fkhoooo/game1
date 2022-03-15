class P2World
{
    private static instance:P2World;
    public world:p2.World;
    public carMaterial:p2.Material;
    public trainMaterial:p2.Material;
    public static factor: number = 50;
    public constructor()
    {
      
    }

    public static getInstance():P2World
    {
        if(!P2World.instance)
        {
            P2World.instance = new P2World()
            P2World.instance.init();
        }
        return P2World.instance;
    }
    
    public init()
    {
        this.world = new p2.World()
        this.world.applyGravity = false;
        this.initMaterial();
        this.initEvent();
    }

    private initEvent()
    {
        this.world.on("beginContact", this.onBeginContact, this);
        this.world.on("endContact", this.onEndContact);
        egret.startTick(this.update,this)

    }

    private update(dt: number = 1):boolean
    {
       this.world.step(60 / 1000);
		var l = this.world.bodies.length;
		for (var i: number = 0; i < l; i++) {
			var body: p2.Body = this.world.bodies[i];
        
            if(body && body.displays[0])
            {   
                var display: Entity = body.displays[0] as Entity;
                if (display) 
                {   
                   // body.force = Tools.getForce(display.force)
                    display.x = body.position[0] * P2World.factor;
                    display.y = egret.MainContext.instance.stage.stageHeight - body.position[1] * P2World.factor;
                    display.rotation = 360 - (body.angle + body.shapes[0].angle) * 180 / Math.PI;
                    if(!display.isClear && display.isOutSide())
                    {   
                        display.isClear = true;
                        Dispatch.dispatch(CarGame.OUT_SIDE,display.id); 
                    }
                }
            }
			
		}
        return 
    }

    /**
     * 材料集合
     */
    private initMaterial(): void 
    {
        this.carMaterial = new p2.Material(1);
        this.trainMaterial = new p2.Material(2);
      
        let contactMaterial = new p2.ContactMaterial(this.carMaterial, this.carMaterial);
        contactMaterial.friction = 0.5;
        contactMaterial.restitution = 0.9;
        this.world.addContactMaterial(contactMaterial);

        let contactMaterial2 = new p2.ContactMaterial(this.carMaterial, this.trainMaterial);
        contactMaterial2.friction = 0.7;
        contactMaterial2.restitution = 0.7;
        this.world.addContactMaterial(contactMaterial2);

    }

    private onBeginContact(event: { bodyA: p2.Body; bodyB: p2.Body; shapeA: p2.Shape, shapeB: p2.Shape }): void 
    {
        let bodyA: p2.Body = event.bodyA;
        let bodyB: p2.Body = event.bodyB;
        let shapeA: p2.Shape = event.shapeA;
        let shapeB: p2.Shape = event.shapeB;
        let boxA: Entity = bodyA.displays[0] as Entity;
        let boxB: Entity = bodyB.displays[0] as Entity;
/*        bodyA.velocity = [0, 0];
        bodyB.velocity = [0, 0];*/
       // bodyA.force = [0,0];
        //bodyB.force = [0,0];
       // boxA.setForce(0)
        //boxB.setForce(0);
        bodyA.damping = 0.5;
        bodyB.damping = 0.5;
        bodyA.angularDamping = 0.5;
        bodyB.angularDamping = 0.5;
    }

     // 刚体碰撞结束
    private onEndContact(event): void 
    {
        var bodyA: p2.Body = event.bodyA;
        var bodyB: p2.Body = event.bodyB;
        var boxA: egret.DisplayObject = bodyA.displays[0];
        var boxB: egret.DisplayObject = bodyB.displays[0];
        if (!boxA || !boxB)
            return;
        Dispatch.dispatch(CarGame.GAME_OVER);
    }

    private dispose()
    {   
        this.carMaterial = null;
        this.trainMaterial = null;
        this.world.off("beginContact", this.onBeginContact);
        this.world.off("endContact", this.onEndContact);
        egret.stopTick(this.update, this);
    }

}
