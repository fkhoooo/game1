/**
 * 漫游
 */
class RoundAi implements ICmd
{   
    private m_spirit:IDymicSpirit;
    private m_roundDis:number = 2;
    private m_wanderRadius:number = 2;
    private m_wanderRange:number = 1;
    private m_wanderAngle:number = 0;
    public constructor(spirit:IDymicSpirit)
    {
        this.m_spirit = spirit;
    }
    public execute()
    {   
        let center:Vector2D = this.m_spirit.vector.normalize().multiply(this.m_roundDis);
        let offVect:Vector2D = new Vector2D();
        offVect.length = this.m_wanderRadius;
        offVect.angle = this.m_wanderAngle;
        this.m_wanderAngle += (Math.random() - 0.5) * this.m_wanderRange;
        let targetVec:Vector2D = center.add(offVect);
        this.m_spirit.syntheticalVec = this.m_spirit.syntheticalVec.add(targetVec);
    }

    public exit()
    {

    }
}