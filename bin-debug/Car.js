var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var Car = (function (_super) {
    __extends(Car, _super);
    function Car(id) {
        var _this = _super.call(this, id) || this;
        _this.lastVelocity = [];
        _this.lastForce = [];
        return _this;
    }
    Car.prototype.createSprite = function (entity) {
        _super.prototype.createSprite.call(this, entity);
        this.isPause = false;
        this.entity.addEventListener(egret.TouchEvent.TOUCH_TAP, this.beginTouch, this);
    };
    Car.prototype.beginTouch = function (e) {
        this.isPause = !this.isPause;
        if (this.isPause) {
            this.lastVelocity = this.body.velocity.concat();
            this.body.velocity = [0, 0];
            this.lastForce = this.entity.force.concat();
            this.entity.force = [0, 0];
            this.body.force = [0, 0];
        }
        else {
            this.body.velocity = this.lastVelocity;
            this.entity.force = this.lastForce;
        }
    };
    Car.prototype.dispose = function () {
        this.entity.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.beginTouch, this);
        _super.prototype.dispose.call(this);
    };
    return Car;
}(P2Sprite));
__reflect(Car.prototype, "Car");
//# sourceMappingURL=Car.js.map