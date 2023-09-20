const knex = require('knex');
class Scaffold{
    table = undefined
    values=undefined
    connection=undefined
    constructor(values) {
        this.values = values
    }

    open(config){
        this.connection= knex(config)
    }
    async close() {
        await this.connection.destroy();
      }

    check(){
        return this.table!==undefined
    }
    save(values){
        return this.connection(this.table)
        .insert(values)
        .returning('*')
    }
    select(dataIdentifier = {}) {
        return this.connection(this.table)
            .select()
            .where(dataIdentifier);
    }
    paginate(page=1,PAGE_SIZE=10){
        const offset = (page - 1) * PAGE_SIZE;
        return this.connection(this.table)
        .select()
          .limit(PAGE_SIZE)
          .offset(offset);
    }
    count(){
        return this.connection(this.table)
            .count();
    }
    update(dataIdentifier, newData) {
        return this.connection(this.table)
            .update(newData)
            .where(dataIdentifier)
            .returning("*");
    }
    deleteData(dataIdentifier) {
        return this.connection(this.table)
            .delete()
            .where(dataIdentifier)
            .returning("*");
    }
        
}

module.exports = {Scaffold}