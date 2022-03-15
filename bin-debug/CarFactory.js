var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var CarFactory = (function () {
    function CarFactory() {
        this.carPool = [];
        this.num = 0;
    }
    CarFactory.getIntance = function () {
        if (!CarFactory.instance) {
            CarFactory.instance = new CarFactory();
        }
        return CarFactory.instance;
    };
    CarFactory.prototype.createCar = function (contation, roadData) {
        var car = this.carPool.shift();
        var entity;
        var carType = Math.ceil(Math.random() * 2);
        if (!car) {
            this.num++;
            car = new Car(this.num);
            entity = new Entity();
            entity.id = this.num;
        }
        else {
            entity = car.entity;
        }
        var carVo = CarJson_json.getData(carType);
        entity.setData(roadData, contation, this.getTexture(carVo.icon + ""));
        entity.mass = carVo.mass;
        entity.setVelocity(1);
        //entity.setForce(entity.mass * 0.4);
        entity.material = P2World.getInstance().carMaterial;
        //entity.max_velocity = [1,1];
        car.createSprite(entity);
        return car;
    };
    CarFactory.prototype.getTexture = function (name) {
        var spriteSheet = RES.getRes("car_json");
        return spriteSheet.getTexture(name);
    };
    CarFactory.prototype.recoverCar = function (car) {
        if (this.carPool.length < 20) {
            this.carPool.push(car);
        }
    };
    return CarFactory;
}());
__reflect(CarFactory.prototype, "CarFactory");
