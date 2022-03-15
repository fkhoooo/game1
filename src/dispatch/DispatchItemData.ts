/**
 * 消息派发项
 * 
 * @author yejun
 *
 */
class DispatchItemData {
	public call:Function;//回调函数
	public thisObj:any;//回调对象
	public constructor(_call:Function,_thisObj:any) {
		this.call = _call;
		this.thisObj = _thisObj;
	}
}