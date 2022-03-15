/**
 * 消息派发管理
 * 
 * @author yejun
 *
 */
class Dispatch {
	public observers: Object = [];

	private static instance: Dispatch;

	public constructor() {
	}

	public static getInstance(): Dispatch {
		if (this.instance == null) {
			this.instance = new Dispatch();
		}
		return this.instance;
	}

	/**
	 * 添加派发监听
	 * @param  {string} type
	 * @param  {Function} call
	 * @param  {any} thisObj
	 * @param  {boolean=false} isExcute
	 * @returns void
	 */
	private add(type: string, call: Function, thisObj: any, isExcute: Boolean = false): void {
		var funcs: DispatchItemData[] = this.observers[type];
		if (call != null && isExcute) {
			call.apply(thisObj);
		}
		//			mapping[call] = {'module':module, 'method':method};
		if (funcs == null) {
			funcs = [];
			this.observers[type] = funcs;
		} else {
			if (this.getCallIdx(funcs, call,thisObj) != -1) {
				return;
			}
		}
		funcs.push(new DispatchItemData(call, thisObj));
	}

	/**
	 * 获取回调的索引
	 * @param  {DispatchItemData[]} funcs
	 * @param  {Function} call
	 * @returns number
	 */
	private getCallIdx(funcs: DispatchItemData[], call: Function,thisObj:any): number {
		for (var i: number = 0; i < funcs.length; i++) {
			if (funcs[i].call == call && funcs[i].thisObj == thisObj) {
				return i;
			}
		}

		return -1;
	}

	/**
	 * 移除派发
	 * @param  {string} type
	 * @param  {Function} call
	 * @returns void
	 */
	private remove(type: string, call: Function,thisObj:any): void {
		var funcs: DispatchItemData[] = this.observers[type];
		if (funcs) {
			var index: number = this.getCallIdx(funcs, call,thisObj);
			if (index != -1) {
				funcs[index].call = null;
				funcs[index].thisObj = null;
				funcs.splice(index, 1);
			}

			if(funcs.length <= 0)
			{
				this.observers[type] = null;
				delete this.observers[type];
			}
		}
	}

	/**
	 * 执行派发
	 * @param  {String} type
	 * @param  {Array} params
	 * @returns void
	 */
	public execute(type: string, params: any[]): void {
		var funcs: DispatchItemData[] = this.observers[type];
		if (funcs) {
			funcs = funcs.concat();
		}
		else
		{
			return;
		}

		var copyFuncs:DispatchItemData[] = [];
		for (var j: number = 0; j < funcs.length; j++) {
			copyFuncs[j] = funcs[j];
		}

		for (var i: number = 0; i < copyFuncs.length; i++) {
			var dispatchItem: DispatchItemData = copyFuncs[i];
			var call: Function = dispatchItem.call;
			var thisObj: any = dispatchItem.thisObj;

			if(call != null && thisObj != null)
			{
				if (params.length == 0) {
					call.apply(thisObj, null);
				} else {
					call.apply(thisObj, params);
				}
			}
		}

	}

	public static dispatch(type: string, ...args): void {
		this.getInstance().execute(type, args);
	}

	/**
	 * 
	 * @param type
	 * @param call
	 * @param isExcute 添加监听并执行一次
	 * 
	 */
	public static register(type: string, call: Function,thisObj:any, isExcute: Boolean = false): void {
		this.getInstance().add(type, call,thisObj,isExcute);
	}

	public static remove(type: string, call: Function,thisObj:any): void {
		this.getInstance().remove(type, call,thisObj);
	}
}