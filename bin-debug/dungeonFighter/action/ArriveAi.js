var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 到达(到达某点 速度会减慢)
 */
var ArriveAi = (function () {
    function ArriveAi(spirit, targetSpirit) {
        if (spirit === void 0) { spirit = null; }
        if (targetSpirit === void 0) { targetSpirit = null; }
        this.arriveValue = 50;
        this.m_spirit = spirit;
        this.m_tarData = targetSpirit;
    }
    ArriveAi.prototype.setTargetData = function (targetSpirit) {
        this.m_tarData = targetSpirit;
    };
    ArriveAi.prototype.execute = function () {
        var tarVt = (this.m_tarData instanceof Vector2D) ? this.m_tarData : this.m_tarData.position;
        var disVt = tarVt.subtract(this.m_spirit.position);
        var disValue = tarVt.dist(this.m_spirit.position);
        var currDis = disVt.normalize();
        if (disValue > this.arriveValue) {
            currDis = currDis.multiply(this.m_spirit.speed);
        }
        else {
            currDis = currDis.multiply(this.m_spirit.speed * (disValue / this.arriveValue));
        }
        var curVt = currDis.subtract(this.m_spirit.vector);
        this.m_spirit.syntheticalVec = this.m_spirit.syntheticalVec.add(curVt);
    };
    ArriveAi.prototype.exit = function () {
    };
    return ArriveAi;
}());
__reflect(ArriveAi.prototype, "ArriveAi", ["ICmd"]);
//# sourceMappingURL=ArriveAi.js.map