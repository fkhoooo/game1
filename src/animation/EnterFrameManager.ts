/**
 * 帧刷管理器
 * @author yejun
 *
 */
class EnterFrameManager {

	public static ENTER_FRAME:string = "ENTER_FRAME";

	private static m_instance: EnterFrameManager;

	private m_elapsedTime: number;

	private m_enterFrameFpsDict: Object = [];

	public static getTimer:number = 0;

	public constructor() {
	}

	public init():void
	{
		//  egret.startTick(this.advanceTime,this);
		egret.Ticker.getInstance().register(this.advanceTime,this);
	}

	public static get instance(): EnterFrameManager {
		if (!this.m_instance) {
			this.m_instance = new EnterFrameManager();
		}
		return this.m_instance;
	}

	/**
	 * 添加帧刷
	 * @param  {IAnimatable} object
	 * @param  {number} fps
	 * @returns void
	 */
	public add(object: IAnimatable, fps: number=12): void {
		if (this.m_enterFrameFpsDict[fps] == null) {
			this.m_enterFrameFpsDict[fps] = new EnterFrameFpsItem(fps);
		}

		this.m_enterFrameFpsDict[fps].add(object);
	}

	/**
	 * 移除帧刷
	 * @param  {IAnimatable} object
	 * @param  {number} fps
	 * @returns void
	 */
	public remove(object: IAnimatable, fps: number=12): void {
		if (object == null) return;
		if (this.m_enterFrameFpsDict[fps] == null) {
			return;
		}
		this.m_enterFrameFpsDict[fps].remove(object);
	}

	/**
	 * 添加帧刷
	 * @param  {Function} func
	 * @param  {any} thisObj
	 * @returns void
	 */
	public addEnterFrame(func:Function,thisObj:any):void
	{
		Dispatch.register(EnterFrameManager.ENTER_FRAME,func,thisObj);
	}
	
	/**
	 * 移除帧刷
	 * @param  {Function} func
	 * @param  {any} thisObj
	 * @returns void
	 */
	public removeEnterFrame(func:Function,thisObj:any):void
	{
		Dispatch.remove(EnterFrameManager.ENTER_FRAME,func,thisObj);
	}

	public mLastFrameTimestamp:number;
	public passedTime:number;

	/**
	 * 帧刷
	 * @param  {number} time
	 * @returns void
	 */
	public advanceTime(time: number): boolean {

		EnterFrameManager.getTimer = egret.getTimer();

		var now:number = time / 1000.0;
		this.passedTime = now;// - this.mLastFrameTimestamp;
		// this.mLastFrameTimestamp = now;
            
		if (this.passedTime > 1.0) this.passedTime = 1.0;

		if (this.passedTime < 0.0) this.passedTime = 1.0 / egret.MainContext.instance.stage.frameRate;

		// Trace.log("advanceTime",time,this.passedTime,EnterFrameManager.getTimer);

		for (var key in this.m_enterFrameFpsDict) {
			this.m_enterFrameFpsDict[key].advanceTime(this.passedTime);
		}

		Dispatch.dispatch(EnterFrameManager.ENTER_FRAME,this.passedTime)

		return true;
	}
}