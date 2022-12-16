/**
 * 搜寻(到达某点)
 */
class SeekAi implements ICmd
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
        spirit.syntheticalVec = spirit.syntheticalVec.add(curVt);

        /*let dis:Vector2D = this.m_tarSpirit.position.subtract(this.m_spirit.position);
        let curVt:Vector2D = dis.subtract(this.m_spirit.vector).normalize(); 
        curVt = curVt.multiply(this.m_spirit.speed);
        this.m_spirit.syntheticalVec = this.m_spirit.syntheticalVec.add(curVt);*/
    }

    public exit()
    {

    }
}