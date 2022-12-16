var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var CmdManage = (function () {
    function CmdManage() {
        this.m_cmdList = [];
    }
    Object.defineProperty(CmdManage.prototype, "initCmd", {
        get: function () {
            return this.m_initCmd;
        },
        set: function (cmd) {
            this.m_initCmd = cmd;
            this.m_currCmd = cmd;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CmdManage.prototype, "cmd", {
        get: function () {
            return this.m_currCmd;
        },
        enumerable: true,
        configurable: true
    });
    CmdManage.prototype.addCmd = function (cmd) {
        if (cmd === void 0) { cmd = null; }
        if (cmd != null) {
            if (cmd instanceof Array) {
                this.m_cmdList = this.m_cmdList.concat(cmd);
            }
            else {
                this.m_cmdList.unshift(cmd);
            }
        }
        this.executeCmd();
    };
    CmdManage.prototype.executeCmd = function () {
        this.m_currCmd = this.m_cmdList.shift() || this.initCmd;
    };
    return CmdManage;
}());
__reflect(CmdManage.prototype, "CmdManage");
//# sourceMappingURL=CmdManage.js.map