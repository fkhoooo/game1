var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 范围内巡逻
 */
var PatrolAI = (function () {
    function PatrolAI(spirit) {
        this.m_maxDis = 200;
        this.m_spirit = spirit;
        this.m_pt = this.m_spirit.position;
        this.m_arriveAi = new ArriveAi(this.m_spirit);
    }
    PatrolAI.prototype.execute = function () {
        if (this.m_tarVt == null || this.m_spirit.position.dist(this.m_tarVt) < 10) {
            var ids = Math.random() * (this.m_maxDis - 50) + 50;
            this.m_tarVt = this.m_pt.add(this.m_spirit.vector.normalize().multiply(ids));
            this.m_arriveAi.setTargetData(this.m_tarVt);
            this.m_spirit.addAi(this.m_arriveAi);
        }
    };
    PatrolAI.prototype.exit = function () {
    };
    return PatrolAI;
}());
__reflect(PatrolAI.prototype, "PatrolAI", ["ICmd"]);
//# sourceMappingURL=PatrolAI.js.map