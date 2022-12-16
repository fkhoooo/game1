var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * fps 帧刷项
 * @author yejun
 *
 */
var EnterFrameFpsItem = (function () {
    function EnterFrameFpsItem(fps) {
        this.m_objects = [];
        this.m_currentTime = 0.0;
        this.m_fps = fps;
        this.m_finalFrame = this.m_fps - 1;
        this.m_defaultFrameDuration = 1.0 / this.m_fps;
        this.m_currentFrame = 0;
        this.m_currentTime = 0.0;
        this.m_totalTime = this.m_defaultFrameDuration * this.m_fps;
        this.m_durations = [];
        this.m_startTimes = [];
        for (var i = 0; i < this.m_fps; ++i) {
            this.m_durations[i] = this.m_defaultFrameDuration;
            this.m_startTimes[i] = i * this.m_defaultFrameDuration;
        }
    }
    EnterFrameFpsItem.prototype.advanceTime = function (passedTime) {
        // if(MovieClip2D.resetCurTime)
        // {
        // 	this.mCurrentTime = 0.0;
        // }
        var previousFrame = this.m_currentFrame;
        if (this.m_currentTime == this.m_totalTime) {
            this.m_currentTime = 0.0;
            this.m_currentFrame = 0;
        }
        if (passedTime == 0.0 || this.m_currentTime == this.m_totalTime)
            return;
        this.m_currentTime += passedTime;
        var isDispatch = false;
        while (this.m_currentTime + 0.0005 - (this.m_startTimes[this.m_currentFrame] + this.m_durations[this.m_currentFrame]) >= 0) {
            if (this.m_currentFrame == this.m_finalFrame) {
                this.m_currentTime -= this.m_totalTime;
                this.m_currentFrame = 0;
            }
            else {
                this.m_currentFrame++;
            }
            var advanceTimeList = [];
            var i;
            for (i = 0; i < this.m_objects.length; i++) {
                advanceTimeList[i] = this.m_objects[i];
            }
            for (i = 0; i < advanceTimeList.length; i++) {
                advanceTimeList[i].advanceTime(passedTime);
            }
            isDispatch = true;
        }
    };
    EnterFrameFpsItem.prototype.add = function (object) {
        if (object && this.m_objects.indexOf(object) == -1) {
            this.m_objects[this.m_objects.length] = object;
        }
    };
    EnterFrameFpsItem.prototype.remove = function (object) {
        if (object == null)
            return;
        var index = this.m_objects.indexOf(object);
        if (index != -1) {
            this.m_objects.splice(index, 1);
        }
    };
    return EnterFrameFpsItem;
}());
__reflect(EnterFrameFpsItem.prototype, "EnterFrameFpsItem", ["IAnimatable"]);
//# sourceMappingURL=EnterFrameFpsItem.js.map