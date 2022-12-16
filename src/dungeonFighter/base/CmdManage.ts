class CmdManage
{
    private m_currCmd:ICmd;
    private m_initCmd:ICmd;
    private m_cmdList:ICmd[] = [];

    public constructor()
    {

    }

    public get initCmd():ICmd
    {
        return this.m_initCmd;
    }

    public set initCmd(cmd:ICmd)
    {
        this.m_initCmd = cmd;
        this.m_currCmd = cmd;
    }

    public get cmd():ICmd
    {
        return this.m_currCmd;
    }

    public addCmd(cmd:ICmd|ICmd[] = null)
    {   
        if(cmd != null)
        {
            if (cmd instanceof Array) 
            {
                this.m_cmdList = this.m_cmdList.concat(cmd);
            }
            else
            {
                this.m_cmdList.unshift(cmd);
            } 
        }

        this.executeCmd();   
    }

    public executeCmd()
    {
        this.m_currCmd = this.m_cmdList.shift() || this.initCmd;
    }

}