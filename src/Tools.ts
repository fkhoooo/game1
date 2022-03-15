class Tools
{
    public static getVelocity(vel:number[]):number[]
    {   
        let cloneVel:number[] = vel
        return [cloneVel[0],-cloneVel[1]];
    }

    public static getForce(force:number[]):number[]
    {   
        let cloneForce:number[] = force
        return [cloneForce[0],-cloneForce[1]];
    }

    public static getAngle(value:number):number
    {   
        return Math.PI / 180 * value;
    }
}