/**
 * 逃离(远离某点)
 */
class FleeAi implements ICmd
{   
    private m_spirit:IDymicSpirit;
    private m_tarSpirit:IDymicSpirit;
    public constructor(spirit:IDymicSpirit = null,targetSpirit:IDymicSpirit = null)
    {
        this.m_spirit = spirit;
        this.m_tarSpirit = targetSpirit;
    }
    public execute()
    {   
        this.doExecute(this.m_spirit,this.m_tarSpirit.position);
    }

    public doExecute(spirit:IDymicSpirit,targetPt:Vector2D)
    {
        let dis:Vector2D = targetPt.subtract(spirit.position);
        let currDis:Vector2D = dis.normalize().multiply(spirit.speed);
        let curVt:Vector2D = currDis.subtract(spirit.vector);
        // spirit.syntheticalVec = spirit.syntheticalVec.add(curVt.reverse());
        spirit.syntheticalVec = spirit.syntheticalVec.subtract(curVt);
    }

    public exit()
    {

    }
}