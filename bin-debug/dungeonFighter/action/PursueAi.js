var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 追击目标(到达预测的目的地)
 */
var PursueAi = (function () {
    function PursueAi(spirit, targetSpirit) {
        this.m_spirit = spirit;
        this.m_tarSpirit = targetSpirit;
        this.m_seekAi = new SeekAi();
    }
    PursueAi.prototype.execute = function () {
        var time = this.m_tarSpirit.position.dist(this.m_spirit.position) / this.m_spirit.speed;
        var disVt = this.m_tarSpirit.position.add(this.m_tarSpirit.vector.multiply(time));
        this.m_seekAi.doExecute(this.m_spirit, disVt);
    };
    PursueAi.prototype.exit = function () {
    };
    return PursueAi;
}());
__reflect(PursueAi.prototype, "PursueAi", ["ICmd"]);
//# sourceMappingURL=PursueAi.js.map