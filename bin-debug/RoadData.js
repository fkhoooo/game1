var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var RoadData = (function () {
    function RoadData(type, position) {
        this.position = 200;
        this.roadWidth = 200;
        this.type = type;
        this.position = position;
    }
    /**
     * 0: 横轴路
     * 1: 纵轴路
     * ps:位置
     */
    RoadData.getRoad = function (type, ps) {
        var roadDis = [[0, 2], [1, 3]];
        var road = roadDis[type][Math.floor(Math.random() * 2)];
        return new RoadData(road, ps);
    };
    return RoadData;
}());
__reflect(RoadData.prototype, "RoadData");
//# sourceMappingURL=RoadData.js.map