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
var CarGame = (function (_super) {
    __extends(CarGame, _super);
    function CarGame() {
        var _this = _super.call(this) || this;
        _this.spriteList = {};
        _this.roadDataList = [];
        _this.initEvent();
        P2World.getInstance().init();
        _this.createRoadData();
        _this.createCar();
        return _this;
    }
    CarGame.prototype.initEvent = function () {
        Dispatch.register(CarGame.GAME_OVER, this.gameOver, this);
        Dispatch.register(CarGame.OUT_SIDE, this.outSide, this);
    };
    CarGame.prototype.createRoadData = function () {
        this.roadDataList[0] = RoadData.getRoad(0, 500);
        this.roadDataList[1] = RoadData.getRoad(1, 300);
    };
    CarGame.prototype.createCar = function () {
        var _this = this;
        egret.setInterval(function () {
            var roadType = Math.floor(Math.random() * 2);
            var car = CarFactory.getIntance().createCar(_this, _this.roadDataList[roadType]);
            _this.spriteList[car.id] = car;
        }, this, 1500);
    };
    CarGame.prototype.outSide = function (id) {
        CarFactory.getIntance().recoverCar(this.spriteList[id]);
        if (this.spriteList[id]) {
            this.spriteList[id].dispose();
            delete this.spriteList[id];
        }
    };
    CarGame.prototype.gameOver = function () {
        console.log("游戏结束");
    };
    CarGame.GAME_OVER = "GAME_OVER";
    CarGame.OUT_SIDE = "OUT_SIDE";
    return CarGame;
}(egret.DisplayObjectContainer));
__reflect(CarGame.prototype, "CarGame");
