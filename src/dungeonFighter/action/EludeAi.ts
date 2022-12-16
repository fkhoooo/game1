/**
 * 躲避(远离对方的追击的预测点)
 */
class EludeAi implements ICmd
{   
    private m_spirit:IDymicSpirit;
    private m_tarSpirit:IDymicSpirit;
    private m_fleeAi:FleeAi;
    public constructor(spirit:IDymicSpirit,targetSpirit:IDymicSpirit)
    {
        this.m_spirit = spirit;
        this.m_tarSpirit = targetSpirit;
        this.m_fleeAi = new FleeAi()
    }
    public execute()
    {   
        let time:number = this.m_tarSpirit.position.dist(this.m_spirit.position) / this.m_spirit.speed;
        let disVt:Vector2D = this.m_tarSpirit.position.add(this.m_tarSpirit.vector.multiply(time));
        this.m_fleeAi.doExecute(this.m_spirit,disVt);  
    }

    public exit()
    {

    }
}