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
var Hero1 = (function (_super) {
    __extends(Hero1, _super);
    function Hero1() {
        var _this = _super.call(this) || this;
        _this.setSkin();
        return _this;
    }
    Hero1.prototype.setSkin = function () {
        this.m_shape = new egret.Shape();
        this.m_shape.graphics.beginFill(0xff0000 * Math.random());
        this.m_shape.graphics.lineStyle(1, 0xff0000);
        this.m_shape.graphics.moveTo(-20, -10);
        this.m_shape.graphics.lineTo(-20, 10);
        this.m_shape.graphics.lineTo(20, 0);
        this.m_shape.graphics.lineTo(-20, -10);
        this.m_shape.graphics.endFill();
        this.addChild(this.m_shape);
    };
    Hero1.prototype.createAi = function () {
        this.m_ai = new Ai02(this, SpiritManage.instance.enemyPool[0]);
    };
    Hero1.prototype.updateAi = function () {
        this.m_ai.execute();
        _super.prototype.updateAi.call(this);
    };
    return Hero1;
}(BaseDymicSpirit));
__reflect(Hero1.prototype, "Hero1");
//# sourceMappingURL=Hero1.js.map