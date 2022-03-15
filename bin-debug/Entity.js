var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var Entity = (function (_super) {
    __extends(Entity, _super);
    function Entity() {
        var _this = _super.call(this) || this;
        _this.velocity = []; //初始速度
        _this.max_velocity = []; //最大的速度
        _this.force = []; //加速度;
        return _this;
    }
    Entity.prototype.setData = function (roadData, contation, texture) {
        this.roadData = roadData;
        if (!this.skin) {
            this.skin = new egret.Bitmap();
            this.skin.touchEnabled = true;
        }
        this.skin.texture = texture;
        this.width = texture.textureWidth;
        this.height = texture.textureHeight;
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2;
        var beginPs = this.getBeginPos();
        this.x = beginPs[0];
        this.y = beginPs[1];
        this.addChild(this.skin);
        contation.addChild(this);
        this.isClear = false;
    };
    /**
     * 起始坐标
     */
    Entity.prototype.getBeginPos = function () {
        switch (this.roadData.type) {
            case 0: return [Main.stageWidth + this.width, Math.floor(Math.random() * this.roadData.roadWidth + this.roadData.position)];
            case 1: return [Math.floor(Math.random() * this.roadData.roadWidth + this.roadData.position), Main.stageHeight + this.height];
            case 2: return [-this.width, Math.floor(Math.random() * this.roadData.roadWidth + this.roadData.position)];
            case 3: return [Math.floor(Math.random() * this.roadData.roadWidth + this.roadData.position), -this.height];
        }
    };
    /**
     * 车的角度
     */
    Entity.prototype.getAngle = function () {
        switch (this.roadData.type) {
            case 0: return 0;
            case 1: return 270;
            case 2: return 180;
            case 3: return 90;
        }
    };
    /**
     * 速度向量
     */
    Entity.prototype.setVelocity = function (speed) {
        switch (this.roadData.type) {
            case 0:
                this.velocity = [-1 * speed, 0];
                break;
            case 1:
                this.velocity = [0, -1 * speed];
                break;
            case 2:
                this.velocity = [speed, 0];
                break;
            case 3:
                this.velocity = [0, speed];
                break;
        }
    };
    /**
     * 设置力(加速度)
     */
    Entity.prototype.setForce = function (speed) {
        switch (this.roadData.type) {
            case 0:
                this.force = [-1 * speed, 0];
                break;
            case 1:
                this.force = [0, -1 * speed];
                break;
            case 2:
                this.force = [speed, 0];
                break;
            case 3:
                this.force = [0, speed];
                break;
        }
    };
    Entity.prototype.isOutSide = function () {
        switch (this.roadData.type) {
            case 0: return this.x < 0;
            case 1: return this.y < 0;
            case 2: return this.x > Main.stageWidth;
            case 3: return this.y > Main.stageHeight;
        }
    };
    Entity.prototype.dispose = function () {
        this.force = [0, 0];
        this.skin && this.removeChild(this.skin);
        this.parent && this.parent.removeChild(this);
    };
    return Entity;
}(egret.DisplayObjectContainer));
__reflect(Entity.prototype, "Entity");
