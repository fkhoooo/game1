 class Vector2D 
 {
	private _x: number;
	private _y: number;
	//构造函数
	public constructor(x: number = 0, y: number = 0) {
		this._x = x;
		this._y = y;
	}
	/**复制向量*/
	public clone(): Vector2D {
		return new Vector2D(this._x, this._y);
	}
	/**将当前向量变成0向量*/
	public zero(): Vector2D {
		this._x = 0;
		this._y = 0;
		return this;
	}
	/**判断是否是0向量*/
	public isZero(): Boolean {
		return this._x == 0 && this._y == 0;
	}
	/**判断是否为空向量 */
	public isNull(): Boolean {
		return this._x == null || this._y == null;
	}
	/**设置向量的大小*/
	public set length(value: number) {
		let a: number = this.angle;
		this._x = Math.cos(a) * value;
		this._y = Math.sin(a) * value;
	}
	public get length(): number {
		return Math.sqrt(this.lengthSQ);
	}
	/**获取当前向量大小的平方*/
	public get lengthSQ(): number {
		return this._x * this._x + this._y * this._y;
	}
	/**设置向量的方法*/
	public set angle(value: number) {
		let len: number = this.length;
		this._x = Math.cos(value) * len;
		this._y = Math.sin(value) * len;
	}
	public get angle(): number {
		return Math.atan2(this._y, this._x);
	}
	/**将当前向量转化成单位向量*/
	public normalize(): Vector2D {
		if (this.length == 0) {
			this._x = 1;
			return this;
		}
		return this.divide(this.length);
	}
	/**截取当前向量*/
	public truncate(max: number): Vector2D {
		this.length = Math.min(max, this.length);
		return this;
	}
	/**反转向量*/
	public reverse(): Vector2D {
		this._x = -this._x;
		this._y = -this._y;
		return this;
	}
	/**判断当前向量是否是单位向量*/
	public isNormalized(): Boolean {
		return this.length == 1.0;
	}
	/**向量积*/
	public dotProd(v2: Vector2D): number {
		return this._x * v2.x + this._y * v2.y;
	}
	/**判断两向量是否垂直*/
	public crossProd(v2: Vector2D): number {
		return this._x * v2.y - this._y * v2.x;
	}
	/**返回两向量夹角的弦度值*/
	public static angleBetween(v1: Vector2D, v2: Vector2D): number {
		if (!v1.isNormalized()) v1 = v1.clone().normalize();
		if (!v2.isNormalized()) v2 = v2.clone().normalize();
		return Math.acos(v1.dotProd(v2));
	}
	/**判定给定的向量是否在本向量的左侧或右侧，左侧返回-1，右侧返回1*/
	public sign(v2: Vector2D): number {
		return this.perp.dotProd(v2) < 0 ? -1 : 1;
	}
	/**返回与本向量垂直的向量(即自身顺时针旋转90度，得到一个新向量)*/
	public get perp(): Vector2D {
		return new Vector2D(-this.y, this.x);
	}
	/**返回当前向量与V2的距离*/
	public dist(v2: Vector2D): number {
		return Math.sqrt(this.distSQ(v2));
	}
	/**返回当前向量与V2的距离的平方*/
	public distSQ(v2: Vector2D): number {
		let dx: number = v2.x - this.x;
		let dy: number = v2.y - this.y;
		return dx * dx + dy * dy;
	}
	/**两向量相加*/
	public add(v2: Vector2D): Vector2D {
		return new Vector2D(this._x + v2.x, this._y + v2.y);
	}
	/**两向量相减*/
	public subtract(v2: Vector2D): Vector2D {
		return new Vector2D(this._x - v2.x, this._y - v2.y);
	}
	/**数与向量的乘积*/
	public multiply(value: number): Vector2D {
		return new Vector2D(this._x * value, this._y * value);
	}
	/**数与向量的商*/
	public divide(value: number): Vector2D {
		return new Vector2D(this._x / value, this._y / value);
	}
	/**判断两向量是否相等*/
	public equals(v2: Vector2D): Boolean {
		return this._x == v2.x && this._y == v2.y;
	}
	/**设置X坐标*/
	public set x(value: number) {
		this._x = value;
	}
	public get x(): number {
		return this._x;
	}
	/**设置Y坐标*/
	public set y(value: number) {
		this._y = value;
	}
	public get y(): number {
		return this._y;
	}
	/**返回对象的字符形式*/
	public toString(): string {
		return this.x + "_" + this.y;
	}

	public clear()
	{
		this._x = 0;
		this._y = 0;
	}

	//绘制一条线段
	/*public draw(graphics:Graphics,color:unumber=0):void{
	graphics.lineStyle(0,color);
	graphics.moveTo(0,0);
	graphics.lineTo(_x,_y);
	}*/
}
