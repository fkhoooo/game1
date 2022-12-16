class BaseDymicSpirit extends eui.Component implements IDymicSpirit
{   
    public position:Vector2D;
    public vector:Vector2D;
    public syntheticalVec:Vector2D;
    public speed:number;
    public mass:number = 1;
    public aiMG:CmdManage;
    public aiState:number;
    public constructor()
    {
        super();
        this.position = new Vector2D();
        this.vector = new Vector2D();
        this.syntheticalVec = new Vector2D();
        this.aiMG = new CmdManage();
    }
    
    public update()
    {   
        this.resetPt();
        this.updateAi();
        this.syntheticalVec = this.syntheticalVec.truncate(12);
        this.syntheticalVec = this.syntheticalVec.divide(this.mass);
        this.vector = this.vector.add(this.syntheticalVec);
        this.vector = this.vector.truncate(this.speed);
        this.syntheticalVec.clear();
        this.position = this.position.add(this.vector);
        this.renderSpirit();  
    }

    private resetPt()
    {
        if(this.position.x <= 0)
        {
            this.position.x = 0;
            this.vector.x *= -1;
        }
        else if(this.position.x > 750)
        {
            this.position.x = 750
            this.vector.x *= -1;
        }

        if(this.position.y <= 0)
        {
            this.position.y = 0;
            this.vector.y *= -1;
        }
        else if(this.position.y > 1334)
        {
            this.position.y = 1334
            this.vector.y *= -1;
        }
    }


    public init(x:number,y:number,speed:number,angle:number)
    {
        this.position.x = x;
        this.position.y = y; 

        this.speed = speed;
        this.vector.length = speed;
        this.vector.angle = angle * Math.PI / 180;
        this.renderSpirit();
    }


    protected updateAi()
    {   
        this.aiMG.cmd.execute();
    }

    private renderSpirit()
    {
        this.x = this.position.x;
        this.y = this.position.y;
        this.rotation = this.vector.angle * 180 / Math.PI;
    }

    public get ai():ICmd
    {
        return this.aiMG.cmd
    }

    public addAi(ai:ICmd)
    {
        this.aiMG.addCmd(ai);
    }

    public initAi(ai:ICmd)
    {
        this.aiMG.initCmd = ai;
    }
}