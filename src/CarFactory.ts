class CarFactory
{   
    private static instance:CarFactory;
    private carPool:Car[] = [];
    private num:number = 0;  
    public constructor()
    {

    }
    public static getIntance():CarFactory
    {
        if(!CarFactory.instance)
        {
            CarFactory.instance = new CarFactory();
        }
        return CarFactory.instance;
    }

    public createCar(contation:any,roadData:RoadData):Car
    {   
        let car:Car = this.carPool.shift(); 
        let entity:Entity;
        let carType:number = Math.ceil(Math.random() * 2);
        if(!car)
        {   
            this.num ++;
            car = new Car(this.num);
            entity = new Entity();
            entity.id = this.num;
        }
        else
        {
            entity = car.entity;
        }
        let carVo:CarJson_json = CarJson_json.getData(carType);
        entity.setData(roadData,contation,this.getTexture(carVo.icon + ""))
        entity.mass = carVo.mass;
        entity.setVelocity(1)
        //entity.setForce(entity.mass * 0.4);
        entity.material = P2World.getInstance().carMaterial;
        //entity.max_velocity = [1,1];
        car.createSprite(entity);
        return car
    }

    private getTexture(name:string):egret.Texture
    {
        let spriteSheet:egret.SpriteSheet = RES.getRes("car_json");
        return spriteSheet.getTexture(name);
    }

    public recoverCar(car:Car)
    {
        if(this.carPool.length < 20)
        {
            this.carPool.push(car);
        }
    }
}