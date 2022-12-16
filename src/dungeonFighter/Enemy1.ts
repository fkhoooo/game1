class Enemy1 extends BaseDymicSpirit
{   
    private m_shape:egret.Shape;
    private m_ai:ICmd
    public constructor()
    {
        super();
        this.setSkin();
    }

    public setSkin()
    {
        this.m_shape = new egret.Shape();
        this.m_shape.graphics.beginFill(0xff0000 * Math.random())
        // this.m_shape.graphics.lineStyle(1,0xff0000)
        this.m_shape.graphics.moveTo(-20,-10)
        this.m_shape.graphics.lineTo(-20,10)
        this.m_shape.graphics.lineTo(20,0)
        this.m_shape.graphics.lineTo(-20,-10);
        this.m_shape.graphics.endFill();
        this.addChild(this.m_shape);
    }

    public createAi()
    {
        this.m_ai = new Ai01(this,SpiritManage.instance.heroPool[0]);
    }

    protected updateAi()
    {    
        this.m_ai.execute();
        super.updateAi();
    }

}