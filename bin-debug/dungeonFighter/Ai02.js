var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 怪物AI1(逃避-漫游)
 */
var Ai02 = (function () {
    function Ai02(spirit, targetSpirit) {
        if (spirit === void 0) { spirit = null; }
        if (targetSpirit === void 0) { targetSpirit = null; }
        this.m_spirit = spirit;
        this.m_tarSpirit = targetSpirit;
        this.m_spirit.initAi(new RoundAi(this.m_spirit));
    }
    Ai02.prototype.execute = function () {
        var dis = this.m_spirit.position.dist(this.m_tarSpirit.position);
        if (dis < 300 && !(this.m_spirit.ai instanceof EludeAi)) {
            this.m_spirit.addAi(new EludeAi(this.m_spirit, this.m_tarSpirit));
        }
        else if (!(this.m_spirit.ai instanceof RoundAi)) {
            this.m_spirit.addAi(null);
        }
    };
    Ai02.prototype.exit = function () {
    };
    return Ai02;
}());
__reflect(Ai02.prototype, "Ai02", ["ICmd"]);
//# sourceMappingURL=Ai02.js.map