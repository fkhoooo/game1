/**
 * 追击目标(到达预测的目的地)
 */
class PursueAi implements ICmd
{   
    private m_spirit:IDymicSpirit;
    private m_tarSpirit:IDymicSpirit;
    private m_seekAi:SeekAi;
    public constructor(spirit:IDymicSpirit,targetSpirit:IDymicSpirit)
    {
        this.m_spirit = spirit;
        this.m_tarSpirit = targetSpirit;
        this.m_seekAi = new SeekAi();
    }
    public execute()
    {   
        let time:number = this.m_tarSpirit.position.dist(this.m_spirit.position) / this.m_spirit.speed;
        let disVt:Vector2D = this.m_tarSpirit.position.add(this.m_tarSpirit.vector.multiply(time));
        this.m_seekAi.doExecute(this.m_spirit,disVt);
    }

    public exit()
    {

    }
}