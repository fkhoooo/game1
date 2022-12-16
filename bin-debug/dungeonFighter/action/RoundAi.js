var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 漫游
 */
var RoundAi = (function () {
    function RoundAi(spirit) {
        this.m_roundDis = 2;
        this.m_wanderRadius = 2;
        this.m_wanderRange = 1;
        this.m_wanderAngle = 0;
        this.m_spirit = spirit;
    }
    RoundAi.prototype.execute = function () {
        var center = this.m_spirit.vector.normalize().multiply(this.m_roundDis);
        var offVect = new Vector2D();
        offVect.length = this.m_wanderRadius;
        offVect.angle = this.m_wanderAngle;
        this.m_wanderAngle += (Math.random() - 0.5) * this.m_wanderRange;
        var targetVec = center.add(offVect);
        this.m_spirit.syntheticalVec = this.m_spirit.syntheticalVec.add(targetVec);
    };
    RoundAi.prototype.exit = function () {
    };
    return RoundAi;
}());
__reflect(RoundAi.prototype, "RoundAi", ["ICmd"]);
//# sourceMappingURL=RoundAi.js.map