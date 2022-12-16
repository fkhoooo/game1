/**
 * 怪物AI1(逃避-漫游)
 */
class Ai02 implements ICmd
{   
    private m_spirit:BaseDymicSpirit;
    private m_tarSpirit:BaseDymicSpirit;
    public constructor(spirit:BaseDymicSpirit = null,targetSpirit:BaseDymicSpirit = null)
    {
        this.m_spirit = spirit;
        this.m_tarSpirit = targetSpirit;
        this.m_spirit.initAi(new RoundAi(this.m_spirit))
    }
    public execute()
    {   
        let dis:number = this.m_spirit.position.dist(this.m_tarSpirit.position);
        if(dis < 300 && !(this.m_spirit.ai instanceof EludeAi))
        {
            this.m_spirit.addAi(new EludeAi(this.m_spirit,this.m_tarSpirit))
        }
        else if(!(this.m_spirit.ai instanceof RoundAi))
        {
            this.m_spirit.addAi(null); 
        }
    }

    public exit()
    {

    }
}