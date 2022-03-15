var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var P2Sprite = (function () {
    function P2Sprite(id) {
        this.id = id;
    }
    P2Sprite.prototype.createSprite = function (entity) {
        this.entity = entity;
        this.box = new p2.Box({ width: entity.width / P2World.factor, height: entity.height / P2World.factor });
        this.box.material = entity.material;
        this.body = new p2.Body({ mass: entity.mass }); //质量一定要加否则不动
        this.body.position = [entity.x / P2World.factor, (egret.MainContext.instance.stage.stageHeight - entity.y) / P2World.factor];
        this.body.addShape(this.box);
        this.body.displays = [entity];
        this.body.angle = Tools.getAngle(entity.getAngle());
        this.body.velocity = Tools.getVelocity(entity.velocity);
        this.body.damping = 0;
        P2World.getInstance().world.addBody(this.body);
    };
    P2Sprite.prototype.dispose = function () {
        P2World.getInstance().world.removeBody(this.body);
        this.entity.dispose();
    };
    return P2Sprite;
}());
__reflect(P2Sprite.prototype, "P2Sprite");
