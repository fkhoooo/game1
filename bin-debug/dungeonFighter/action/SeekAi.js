var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 搜寻(到达某点)
 */
var SeekAi = (function () {
    function SeekAi(spirit, targetSpirit) {
        if (spirit === void 0) { spirit = null; }
        if (targetSpirit === void 0) { targetSpirit = null; }
        this.m_spirit = spirit;
        this.m_tarSpirit = targetSpirit;
    }
    SeekAi.prototype.execute = function () {
        this.doExecute(this.m_spirit, this.m_tarSpirit.position);
    };
    SeekAi.prototype.doExecute = function (spirit, targetPt) {
        var dis = targetPt.subtract(spirit.position);
        var currDis = dis.normalize().multiply(spirit.speed);
        var curVt = currDis.subtract(spirit.vector);
        spirit.syntheticalVec = spirit.syntheticalVec.add(curVt);
        /*let dis:Vector2D = this.m_tarSpirit.position.subtract(this.m_spirit.position);
        let curVt:Vector2D = dis.subtract(this.m_spirit.vector).normalize();
        curVt = curVt.multiply(this.m_spirit.speed);
        this.m_spirit.syntheticalVec = this.m_spirit.syntheticalVec.add(curVt);*/
    };
    SeekAi.prototype.exit = function () {
    };
    return SeekAi;
}());
__reflect(SeekAi.prototype, "SeekAi", ["ICmd"]);
//# sourceMappingURL=SeekAi.js.map