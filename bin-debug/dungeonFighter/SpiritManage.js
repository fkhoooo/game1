var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SpiritManage = (function () {
    function SpiritManage() {
        this.heroPool = [];
        this.enemyPool = [];
    }
    Object.defineProperty(SpiritManage, "instance", {
        get: function () {
            if (!this.m_instance) {
                this.m_instance = new SpiritManage();
            }
            return this.m_instance;
        },
        enumerable: true,
        configurable: true
    });
    return SpiritManage;
}());
__reflect(SpiritManage.prototype, "SpiritManage");
//# sourceMappingURL=SpiritManage.js.map