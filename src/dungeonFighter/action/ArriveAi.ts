/**
 * 到达(到达某点 速度会减慢)
 */
class ArriveAi implements ICmd
{   
    private m_spirit:IDymicSpirit;
    private m_tarData:IDymicSpirit|Vector2D;
    private arriveValue:number = 50;
    public constructor(spirit:IDymicSpirit = null,targetSpirit:IDymicSpirit|Vector2D = null)
    {
        this.m_spirit = spirit;
        this.m_tarData = targetSpirit;
    }

    public setTargetData(targetSpirit:IDymicSpirit|Vector2D)
    {
        this.m_tarData = targetSpirit;
    }

    public execute()
    {   
        let tarVt:Vector2D = (this.m_tarData instanceof Vector2D) ? this.m_tarData : this.m_tarData.position
        let disVt:Vector2D = tarVt.subtract(this.m_spirit.position);
        let disValue:number = tarVt.dist(this.m_spirit.position);
        let currDis:Vector2D = disVt.normalize()
        if( disValue > this.arriveValue)
        {
            currDis = currDis.multiply(this.m_spirit.speed);
        }
        else
        {
            currDis = currDis.multiply(this.m_spirit.speed * (disValue / this.arriveValue));
        }
        
        let curVt:Vector2D = currDis.subtract(this.m_spirit.vector);
        this.m_spirit.syntheticalVec = this.m_spirit.syntheticalVec.add(curVt);
    }

    public exit()
    {

    }
}