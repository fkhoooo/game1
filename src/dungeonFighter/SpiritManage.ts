class SpiritManage 
{   
    public  heroPool:BaseDymicSpirit[] = [];
    public  enemyPool:BaseDymicSpirit[] = [];
    private static m_instance: SpiritManage;
	public constructor() {}
	public static get instance(): SpiritManage 
    {
		if(!this.m_instance) 
        {
            this.m_instance = new SpiritManage();
        }
		return this.m_instance;
	}

}