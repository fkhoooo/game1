var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var P2World = (function () {
    function P2World() {
    }
    P2World.getInstance = function () {
        if (!P2World.instance) {
            P2World.instance = new P2World();
            P2World.instance.init();
        }
        return P2World.instance;
    };
    P2World.prototype.init = function () {
        this.world = new p2.World();
        this.world.applyGravity = false;
        this.initMaterial();
        this.initEvent();
    };
    P2World.prototype.initEvent = function () {
        this.world.on("beginContact", this.onBeginContact, this);
        this.world.on("endContact", this.onEndContact);
        egret.startTick(this.update, this);
    };
    P2World.prototype.update = function (dt) {
        if (dt === void 0) { dt = 1; }
        this.world.step(60 / 1000);
        var l = this.world.bodies.length;
        for (var i = 0; i < l; i++) {
            var body = this.world.bodies[i];
            if (body && body.displays[0]) {
                var display = body.displays[0];
                if (display) {
                    // body.force = Tools.getForce(display.force)
                    display.x = body.position[0] * P2World.factor;
                    display.y = egret.MainContext.instance.stage.stageHeight - body.position[1] * P2World.factor;
                    display.rotation = 360 - (body.angle + body.shapes[0].angle) * 180 / Math.PI;
                    if (!display.isClear && display.isOutSide()) {
                        display.isClear = true;
                        Dispatch.dispatch(CarGame.OUT_SIDE, display.id);
                    }
                }
            }
        }
        return;
    };
    /**
     * 材料集合
     */
    P2World.prototype.initMaterial = function () {
        this.carMaterial = new p2.Material(1);
        this.trainMaterial = new p2.Material(2);
        var contactMaterial = new p2.ContactMaterial(this.carMaterial, this.carMaterial);
        contactMaterial.friction = 0.5;
        contactMaterial.restitution = 0.9;
        this.world.addContactMaterial(contactMaterial);
        var contactMaterial2 = new p2.ContactMaterial(this.carMaterial, this.trainMaterial);
        contactMaterial2.friction = 0.7;
        contactMaterial2.restitution = 0.7;
        this.world.addContactMaterial(contactMaterial2);
    };
    P2World.prototype.onBeginContact = function (event) {
        var bodyA = event.bodyA;
        var bodyB = event.bodyB;
        var shapeA = event.shapeA;
        var shapeB = event.shapeB;
        var boxA = bodyA.displays[0];
        var boxB = bodyB.displays[0];
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
    };
    // 刚体碰撞结束
    P2World.prototype.onEndContact = function (event) {
        var bodyA = event.bodyA;
        var bodyB = event.bodyB;
        var boxA = bodyA.displays[0];
        var boxB = bodyB.displays[0];
        if (!boxA || !boxB)
            return;
        Dispatch.dispatch(CarGame.GAME_OVER);
    };
    P2World.prototype.dispose = function () {
        this.carMaterial = null;
        this.trainMaterial = null;
        this.world.off("beginContact", this.onBeginContact);
        this.world.off("endContact", this.onEndContact);
        egret.stopTick(this.update, this);
    };
    P2World.factor = 50;
    return P2World;
}());
__reflect(P2World.prototype, "P2World");
//# sourceMappingURL=P2World.js.map