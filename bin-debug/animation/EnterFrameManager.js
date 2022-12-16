var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 帧刷管理器
 * @author yejun
 *
 */
var EnterFrameManager = (function () {
    function EnterFrameManager() {
        this.m_enterFrameFpsDict = [];
    }
    EnterFrameManager.prototype.init = function () {
        //  egret.startTick(this.advanceTime,this);
        egret.Ticker.getInstance().register(this.advanceTime, this);
    };
    Object.defineProperty(EnterFrameManager, "instance", {
        get: function () {
            if (!this.m_instance) {
                this.m_instance = new EnterFrameManager();
            }
            return this.m_instance;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 添加帧刷
     * @param  {IAnimatable} object
     * @param  {number} fps
     * @returns void
     */
    EnterFrameManager.prototype.add = function (object, fps) {
        if (fps === void 0) { fps = 12; }
        if (this.m_enterFrameFpsDict[fps] == null) {
            this.m_enterFrameFpsDict[fps] = new EnterFrameFpsItem(fps);
        }
        this.m_enterFrameFpsDict[fps].add(object);
    };
    /**
     * 移除帧刷
     * @param  {IAnimatable} object
     * @param  {number} fps
     * @returns void
     */
    EnterFrameManager.prototype.remove = function (object, fps) {
        if (fps === void 0) { fps = 12; }
        if (object == null)
            return;
        if (this.m_enterFrameFpsDict[fps] == null) {
            return;
        }
        this.m_enterFrameFpsDict[fps].remove(object);
    };
    /**
     * 添加帧刷
     * @param  {Function} func
     * @param  {any} thisObj
     * @returns void
     */
    EnterFrameManager.prototype.addEnterFrame = function (func, thisObj) {
        Dispatch.register(EnterFrameManager.ENTER_FRAME, func, thisObj);
    };
    /**
     * 移除帧刷
     * @param  {Function} func
     * @param  {any} thisObj
     * @returns void
     */
    EnterFrameManager.prototype.removeEnterFrame = function (func, thisObj) {
        Dispatch.remove(EnterFrameManager.ENTER_FRAME, func, thisObj);
    };
    /**
     * 帧刷
     * @param  {number} time
     * @returns void
     */
    EnterFrameManager.prototype.advanceTime = function (time) {
        EnterFrameManager.getTimer = egret.getTimer();
        var now = time / 1000.0;
        this.passedTime = now; // - this.mLastFrameTimestamp;
        // this.mLastFrameTimestamp = now;
        if (this.passedTime > 1.0)
            this.passedTime = 1.0;
        if (this.passedTime < 0.0)
            this.passedTime = 1.0 / egret.MainContext.instance.stage.frameRate;
        // Trace.log("advanceTime",time,this.passedTime,EnterFrameManager.getTimer);
        for (var key in this.m_enterFrameFpsDict) {
            this.m_enterFrameFpsDict[key].advanceTime(this.passedTime);
        }
        Dispatch.dispatch(EnterFrameManager.ENTER_FRAME, this.passedTime);
        return true;
    };
    EnterFrameManager.ENTER_FRAME = "ENTER_FRAME";
    EnterFrameManager.getTimer = 0;
    return EnterFrameManager;
}());
__reflect(EnterFrameManager.prototype, "EnterFrameManager");
//# sourceMappingURL=EnterFrameManager.js.map