var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Tools = (function () {
    function Tools() {
    }
    Tools.getVelocity = function (vel) {
        var cloneVel = vel;
        return [cloneVel[0], -cloneVel[1]];
    };
    Tools.getForce = function (force) {
        var cloneForce = force;
        return [cloneForce[0], -cloneForce[1]];
    };
    Tools.getAngle = function (value) {
        return Math.PI / 180 * value;
    };
    return Tools;
}());
__reflect(Tools.prototype, "Tools");
//# sourceMappingURL=Tools.js.map