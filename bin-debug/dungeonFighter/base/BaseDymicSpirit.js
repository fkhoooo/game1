var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var BaseDymicSpirit = (function (_super) {
    __extends(BaseDymicSpirit, _super);
    function BaseDymicSpirit() {
        var _this = _super.call(this) || this;
        _this.mass = 1;
        _this.position = new Vector2D();
        _this.vector = new Vector2D();
        _this.syntheticalVec = new Vector2D();
        _this.aiMG = new CmdManage();
        return _this;
    }
    BaseDymicSpirit.prototype.update = function () {
        this.resetPt();
        this.updateAi();
        this.syntheticalVec = this.syntheticalVec.truncate(12);
        this.syntheticalVec = this.syntheticalVec.divide(this.mass);
        this.vector = this.vector.add(this.syntheticalVec);
        this.vector = this.vector.truncate(this.speed);
        this.syntheticalVec.clear();
        this.position = this.position.add(this.vector);
        this.renderSpirit();
    };
    BaseDymicSpirit.prototype.resetPt = function () {
        if (this.position.x <= 0) {
            this.position.x = 0;
            this.vector.x *= -1;
        }
        else if (this.position.x > 750) {
            this.position.x = 750;
            this.vector.x *= -1;
        }
        if (this.position.y <= 0) {
            this.position.y = 0;
            this.vector.y *= -1;
        }
        else if (this.position.y > 1334) {
            this.position.y = 1334;
            this.vector.y *= -1;
        }
    };
    BaseDymicSpirit.prototype.init = function (x, y, speed, angle) {
        this.position.x = x;
        this.position.y = y;
        this.speed = speed;
        this.vector.length = speed;
        this.vector.angle = angle * Math.PI / 180;
        this.renderSpirit();
    };
    BaseDymicSpirit.prototype.updateAi = function () {
        this.aiMG.cmd.execute();
    };
    BaseDymicSpirit.prototype.renderSpirit = function () {
        this.x = this.position.x;
        this.y = this.position.y;
        this.rotation = this.vector.angle * 180 / Math.PI;
    };
    Object.defineProperty(BaseDymicSpirit.prototype, "ai", {
        get: function () {
            return this.aiMG.cmd;
        },
        enumerable: true,
        configurable: true
    });
    BaseDymicSpirit.prototype.addAi = function (ai) {
        this.aiMG.addCmd(ai);
    };
    BaseDymicSpirit.prototype.initAi = function (ai) {
        this.aiMG.initCmd = ai;
    };
    return BaseDymicSpirit;
}(eui.Component));
__reflect(BaseDymicSpirit.prototype, "BaseDymicSpirit", ["IDymicSpirit", "ISpirit"]);
//# sourceMappingURL=BaseDymicSpirit.js.map