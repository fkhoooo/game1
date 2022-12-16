var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 逃离(远离某点)
 */
var FleeAi = (function () {
    function FleeAi(spirit, targetSpirit) {
        if (spirit === void 0) { spirit = null; }
        if (targetSpirit === void 0) { targetSpirit = null; }
        this.m_spirit = spirit;
        this.m_tarSpirit = targetSpirit;
    }
    FleeAi.prototype.execute = function () {
        this.doExecute(this.m_spirit, this.m_tarSpirit.position);
    };
    FleeAi.prototype.doExecute = function (spirit, targetPt) {
        var dis = targetPt.subtract(spirit.position);
        var currDis = dis.normalize().multiply(spirit.speed);
        var curVt = currDis.subtract(spirit.vector);
        // spirit.syntheticalVec = spirit.syntheticalVec.add(curVt.reverse());
        spirit.syntheticalVec = spirit.syntheticalVec.subtract(curVt);
    };
    FleeAi.prototype.exit = function () {
    };
    return FleeAi;
}());
__reflect(FleeAi.prototype, "FleeAi", ["ICmd"]);
//# sourceMappingURL=FleeAi.js.map