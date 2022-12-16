class RoadData{
    /**0:向左,2:向右:1向上,3:向下 */
    public type:number;
    public position:number = 200;
    public roadWidth:number = 200;
    public constructor(type:number,position:number)
    {
        this.type = type;
        this.position = position;
    }


    /**
     * 0: 横轴路
     * 1: 纵轴路
     * ps:位置
     */
    public static getRoad(type:number,ps:number):RoadData
    {
        let roadDis:number[][] = [[0,2],[1,3]];
        let road:number = roadDis[type][Math.floor(Math.random() * 2)];
        return new RoadData(road,ps);
    }

}