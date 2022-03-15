var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var CarJson_json = (function () {
    function CarJson_json() {
    }
    CarJson_json.getData = function (id) {
        var key = id + '';
        return this.dataList[key];
    };
    CarJson_json.decodeJson = function (data) {
        for (var j in data) {
            var vo = data[j];
            var keyIdx = '';
            for (var i = 0; i < this.key.length; i++) {
                keyIdx += vo[this.key[i]] + (i == this.key.length - 1 ? '' : '_');
            }
            this.dataList[keyIdx] = vo;
        }
    };
    CarJson_json.dataList = {};
    CarJson_json.key = ['id'];
    return CarJson_json;
}());
__reflect(CarJson_json.prototype, "CarJson_json");
window["CarJson_json"] = CarJson_json;
