var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 消息派发项
 *
 * @author yejun
 *
 */
var DispatchItemData = (function () {
    function DispatchItemData(_call, _thisObj) {
        this.call = _call;
        this.thisObj = _thisObj;
    }
    return DispatchItemData;
}());
__reflect(DispatchItemData.prototype, "DispatchItemData");
