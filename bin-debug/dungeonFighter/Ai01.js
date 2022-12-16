var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 怪物AI1(追击-漫游)
 */
var Ai01 = (function () {
    function Ai01(spirit, targetSpirit) {
        if (spirit === void 0) { spirit = null; }
        if (targetSpirit === void 0) { targetSpirit = null; }
        this.m_spirit = spirit;
        this.m_tarSpirit = targetSpirit;
        this.m_spirit.initAi(new PatrolAI(this.m_spirit));
        this.m_spirit.aiState = AiState.patrol;
    }
    Ai01.prototype.execute = function () {
        var dis = this.m_spirit.position.dist(this.m_tarSpirit.position);
        if (dis < 200 && this.m_spirit.aiState != AiState.seek) {
            this.m_spirit.aiState = AiState.seek;
            this.m_spirit.addAi(new SeekAi(this.m_spirit, this.m_tarSpirit));
        }
        else if (this.m_spirit.aiState != AiState.patrol) {
            this.m_spirit.aiState = AiState.patrol;
            this.m_spirit.addAi(null);
        }
    };
    Ai01.prototype.exit = function () {
    };
    return Ai01;
}());
__reflect(Ai01.prototype, "Ai01", ["ICmd"]);
//# sourceMappingURL=Ai01.js.map