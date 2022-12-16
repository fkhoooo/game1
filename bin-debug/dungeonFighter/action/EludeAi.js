var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 躲避(远离对方的追击的预测点)
 */
var EludeAi = (function () {
    function EludeAi(spirit, targetSpirit) {
        this.m_spirit = spirit;
        this.m_tarSpirit = targetSpirit;
        this.m_fleeAi = new FleeAi();
    }
    EludeAi.prototype.execute = function () {
        var time = this.m_tarSpirit.position.dist(this.m_spirit.position) / this.m_spirit.speed;
        var disVt = this.m_tarSpirit.position.add(this.m_tarSpirit.vector.multiply(time));
        this.m_fleeAi.doExecute(this.m_spirit, disVt);
    };
    EludeAi.prototype.exit = function () {
    };
    return EludeAi;
}());
__reflect(EludeAi.prototype, "EludeAi", ["ICmd"]);
//# sourceMappingURL=EludeAi.js.map