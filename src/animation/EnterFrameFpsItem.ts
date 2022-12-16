/**
 * fps 帧刷项
 * @author yejun
 *
 */
class EnterFrameFpsItem implements IAnimatable {
	private m_objects: IAnimatable[] = [];
	private m_durations: number[];
	private m_startTimes: number[];

	private m_defaultFrameDuration: number;
	private m_finalFrame: number;
	private m_totalTime: number;
	private m_currentTime: number = 0.0;
	private m_currentFrame: number;
	private m_fps: number;

	public constructor(fps: number) {
		this.m_fps = fps;
		this.m_finalFrame = this.m_fps - 1;
		this.m_defaultFrameDuration = 1.0 / this.m_fps;
		this.m_currentFrame = 0;
		this.m_currentTime = 0.0;
		this.m_totalTime = this.m_defaultFrameDuration * this.m_fps;
		this.m_durations = [];
		this.m_startTimes = [];
		for (var i: number = 0; i < this.m_fps; ++i) {
			this.m_durations[i] = this.m_defaultFrameDuration;
			this.m_startTimes[i] = i * this.m_defaultFrameDuration;
		}
	}

	public advanceTime(passedTime: number): void {
		// if(MovieClip2D.resetCurTime)
		// {
		// 	this.mCurrentTime = 0.0;
		// }

		var previousFrame: number = this.m_currentFrame;

		if (this.m_currentTime == this.m_totalTime) { this.m_currentTime = 0.0; this.m_currentFrame = 0; }
		if (passedTime == 0.0 || this.m_currentTime == this.m_totalTime) return;

		this.m_currentTime += passedTime;

		var isDispatch: Boolean = false;

		while (this.m_currentTime + 0.0005 - (this.m_startTimes[this.m_currentFrame] + this.m_durations[this.m_currentFrame]) >= 0) {
			if (this.m_currentFrame == this.m_finalFrame) {
				this.m_currentTime -= this.m_totalTime;
				this.m_currentFrame = 0;
			}
			else {
				this.m_currentFrame++;
			}

			var advanceTimeList:any[] = [];

			var i: number;
			for (i = 0; i < this.m_objects.length; i++) {
				advanceTimeList[i] = this.m_objects[i];
			}

			for (i = 0; i < advanceTimeList.length; i++) {
				advanceTimeList[i].advanceTime(passedTime);
			}

			isDispatch = true;
		}
	}

	public add(object: IAnimatable): void {
		if (object && this.m_objects.indexOf(object) == -1) {
			this.m_objects[this.m_objects.length] = object;
		}
	}

	public remove(object: IAnimatable): void {
		if (object == null) return;
		var index: number = this.m_objects.indexOf(object);
		if (index != -1) {
			this.m_objects.splice(index, 1);
		}
	}
}