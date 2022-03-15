class CarJson_json
{
   public id:number//ID;
   public mass:number//质量;
   public icon:number//资源;
   private static dataList:any = {};
   private static key:string[] = ['id'];
   public constructor()
   {
   }

   public static getData(id:number):CarJson_json
   {
      let key:string = id + '';
      return this.dataList[key]
   }

   public static decodeJson(data:any)
   {
      for(let j in data)
      {
          let vo:CarJson_json = data[j];
          let keyIdx:string = '';
          for(let i:number = 0; i < this.key.length; i++)
          {
               keyIdx += vo[this.key[i]] + (i == this.key.length - 1 ? '' : '_');
          }
          this.dataList[keyIdx] = vo;
      }
   }
}
window["CarJson_json"] = CarJson_json