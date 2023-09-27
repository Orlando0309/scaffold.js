const operations={
    "eq":"=",
    "ne":"!=",
    "lt":"<",
    "gt":">",
    "lte":"<=",
    "gte":">=",
    "like":"like",
    "contains":"like",
    "startsWith":"like",
    "endsWith":"like"
};

class Criteria{
    static getKeyAndOperation(str){
        if(str.includes("__")){
            let strliste=str.split("__");
            let attribute=strliste[0]
            let lookup=strliste[1]
            return {
                attribute,
                lookup
            }
        }
        return {attribute:str,lookup:"eq"}
    }
    static contains(value){
        return `%${value}%`
    }
    static endsWith(value){
        return `%${value}`
    }
    static startsWith(value){
        return `${value}%`
    }
    static eq(value){
        return `${value}`
    }
    static ne(value){
        return `${value}`
    }
   static lt(value){
    return `${value}`
   }
   static gt(value){
    return `${value}`
   }
   static lte(value){
    return `${value}`
   }
   static gte(value){
    return `${value}`
   }

   static call(str,value){
    const { attribute, lookup } = Criteria.getKeyAndOperation(str);
    if (typeof Criteria[lookup] === 'function') {
        return {
          attribute,
          operation: operations[lookup],
          value:Criteria[lookup](value)
        }
      }
      throw new Error(`Unsupported operation: ${lookup}`);
   }

}

module.exports = {operations,Criteria}