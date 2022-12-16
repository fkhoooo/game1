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
var Enemy1 = (function (_super) {
    __extends(Enemy1, _super);
    function Enemy1() {
        var _this = _super.call(this) || this;
        _this.setSkin();
        return _this;
    }
    Enemy1.prototype.setSkin = function () {
        this.m_shape = new egret.Shape();
        this.m_shape.graphics.beginFill(0xff0000 * Math.random());
        // this.m_shape.graphics.lineStyle(1,0xff0000)
        this.m_shape.graphics.moveTo(-20, -10);
        this.m_shape.graphics.lineTo(-20, 10);
        this.m_shape.graphics.lineTo(20, 0);
        this.m_shape.graphics.lineTo(-20, -10);
        this.m_shape.graphics.endFill();
        this.addChild(this.m_shape);
    };
    Enemy1.prototype.createAi = function () {
        this.m_ai = new Ai01(this, SpiritManage.instance.heroPool[0]);
    };
    Enemy1.prototype.updateAi = function () {
        this.m_ai.execute();
        _super.prototype.updateAi.call(this);
    };
    return Enemy1;
}(BaseDymicSpirit));
__reflect(Enemy1.prototype, "Enemy1");
//# sourceMappingURL=Enemy1.js.map