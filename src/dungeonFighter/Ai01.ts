/**
 * 怪物AI1(追击-漫游)
 */
class Ai01 implements ICmd
{   
    private m_spirit:BaseDymicSpirit;
    private m_tarSpirit:BaseDymicSpirit;
    public constructor(spirit:BaseDymicSpirit = null,targetSpirit:BaseDymicSpirit = null)
    {
        this.m_spirit = spirit;
        this.m_tarSpirit = targetSpirit;
        this.m_spirit.initAi(new PatrolAI(this.m_spirit));
        this.m_spirit.aiState = AiState.patrol;
    }
    public execute()
    {   
        let dis:number = this.m_spirit.position.dist(this.m_tarSpirit.position);
        if(dis < 200 && this.m_spirit.aiState != AiState.seek)
        {   
            this.m_spirit.aiState = AiState.seek;
            this.m_spirit.addAi(new SeekAi(this.m_spirit,this.m_tarSpirit));
        }
        else if(this.m_spirit.aiState != AiState.patrol)
        {   
            this.m_spirit.aiState = AiState.patrol;
            this.m_spirit.addAi(null); 
        }
    }

    public exit()
    {

    }
}