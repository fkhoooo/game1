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
var DungeonFighter = (function (_super) {
    __extends(DungeonFighter, _super);
    function DungeonFighter() {
        var _this = _super.call(this) || this;
        _this.mouseVt = new Vector2D();
        _this.ai = new FleeAi();
        _this.enemy1 = new Enemy1();
        _this.enemy1.init(10, 400, 15, 45);
        _this.addChild(_this.enemy1);
        SpiritManage.instance.enemyPool.push(_this.enemy1);
        _this.hero1 = new Hero1();
        _this.hero1.init(300, 500, 25, 90);
        _this.addChild(_this.hero1);
        SpiritManage.instance.heroPool.push(_this.hero1);
        _this.enemy1.createAi();
        _this.hero1.createAi();
        EnterFrameManager.instance.init();
        EnterFrameManager.instance.add(_this);
        return _this;
        // Main.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.moveHandler,this)
    }
    /*private moveHandler(e:egret.TouchEvent)
    {
        this.mouseVt.x = e.stageX
        this.mouseVt.y = e.stageY
    }*/
    DungeonFighter.prototype.advanceTime = function (passedTime) {
        /*if(!this.mouseVt.isZero())
        {
            this.ai.doExecute(this.hero1,this.mouseVt)
            this.hero1.update()
        }*/
        this.enemy1.update();
        this.hero1.update();
        // this.enemy2.update();
    };
    return DungeonFighter;
}(egret.DisplayObjectContainer));
__reflect(DungeonFighter.prototype, "DungeonFighter", ["IAnimatable"]);
//# sourceMappingURL=DungeonFighter.js.map