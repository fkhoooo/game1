var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 消息派发管理
 *
 * @author yejun
 *
 */
var Dispatch = (function () {
    function Dispatch() {
        this.observers = [];
    }
    Dispatch.getInstance = function () {
        if (this.instance == null) {
            this.instance = new Dispatch();
        }
        return this.instance;
    };
    /**
     * 添加派发监听
     * @param  {string} type
     * @param  {Function} call
     * @param  {any} thisObj
     * @param  {boolean=false} isExcute
     * @returns void
     */
    Dispatch.prototype.add = function (type, call, thisObj, isExcute) {
        if (isExcute === void 0) { isExcute = false; }
        var funcs = this.observers[type];
        if (call != null && isExcute) {
            call.apply(thisObj);
        }
        //			mapping[call] = {'module':module, 'method':method};
        if (funcs == null) {
            funcs = [];
            this.observers[type] = funcs;
        }
        else {
            if (this.getCallIdx(funcs, call, thisObj) != -1) {
                return;
            }
        }
        funcs.push(new DispatchItemData(call, thisObj));
    };
    /**
     * 获取回调的索引
     * @param  {DispatchItemData[]} funcs
     * @param  {Function} call
     * @returns number
     */
    Dispatch.prototype.getCallIdx = function (funcs, call, thisObj) {
        for (var i = 0; i < funcs.length; i++) {
            if (funcs[i].call == call && funcs[i].thisObj == thisObj) {
                return i;
            }
        }
        return -1;
    };
    /**
     * 移除派发
     * @param  {string} type
     * @param  {Function} call
     * @returns void
     */
    Dispatch.prototype.remove = function (type, call, thisObj) {
        var funcs = this.observers[type];
        if (funcs) {
            var index = this.getCallIdx(funcs, call, thisObj);
            if (index != -1) {
                funcs[index].call = null;
                funcs[index].thisObj = null;
                funcs.splice(index, 1);
            }
            if (funcs.length <= 0) {
                this.observers[type] = null;
                delete this.observers[type];
            }
        }
    };
    /**
     * 执行派发
     * @param  {String} type
     * @param  {Array} params
     * @returns void
     */
    Dispatch.prototype.execute = function (type, params) {
        var funcs = this.observers[type];
        if (funcs) {
            funcs = funcs.concat();
        }
        else {
            return;
        }
        var copyFuncs = [];
        for (var j = 0; j < funcs.length; j++) {
            copyFuncs[j] = funcs[j];
        }
        for (var i = 0; i < copyFuncs.length; i++) {
            var dispatchItem = copyFuncs[i];
            var call = dispatchItem.call;
            var thisObj = dispatchItem.thisObj;
            if (call != null && thisObj != null) {
                if (params.length == 0) {
                    call.apply(thisObj, null);
                }
                else {
                    call.apply(thisObj, params);
                }
            }
        }
    };
    Dispatch.dispatch = function (type) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        this.getInstance().execute(type, args);
    };
    /**
     *
     * @param type
     * @param call
     * @param isExcute 添加监听并执行一次
     *
     */
    Dispatch.register = function (type, call, thisObj, isExcute) {
        if (isExcute === void 0) { isExcute = false; }
        this.getInstance().add(type, call, thisObj, isExcute);
    };
    Dispatch.remove = function (type, call, thisObj) {
        this.getInstance().remove(type, call, thisObj);
    };
    return Dispatch;
}());
__reflect(Dispatch.prototype, "Dispatch");
//# sourceMappingURL=Dispatch.js.map