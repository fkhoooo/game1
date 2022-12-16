/**
 * 范围内巡逻
 */
class PatrolAI implements ICmd
{   
    private m_spirit:BaseDymicSpirit;
    private m_pt:Vector2D;
    private m_maxDis:number = 200;
    private m_tarVt:Vector2D;
    private m_arriveAi:ArriveAi;
    public constructor(spirit:BaseDymicSpirit)
    {
        this.m_spirit = spirit;
        this.m_pt = this.m_spirit.position;
        this.m_arriveAi = new ArriveAi(this.m_spirit)
    }
    public execute()
    {   
        if(this.m_tarVt == null || this.m_spirit.position.dist(this.m_tarVt) < 10)
        {
            let ids:number = Math.random() * (this.m_maxDis - 50 ) + 50;
            this.m_tarVt = this.m_pt.add(this.m_spirit.vector.normalize().multiply(ids));
            this.m_arriveAi.setTargetData(this.m_tarVt);
            this.m_spirit.addAi(this.m_arriveAi)
        }
    }

    public exit()
    {

    }
}