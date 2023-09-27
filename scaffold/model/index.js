const { Criteria } = require('../../searchengine');
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
    async save(values){
        const [data] = await this.connection(this.table)
        .insert(values)
        .returning('*');
    return data;
    }
    async select(dataIdentifier = {}) {
        console.log(dataIdentifier)
        let query = this.connection(this.table);
        // Iterate through the conditions object and build the query
        for (const condition in dataIdentifier) {
                const { attribute, operation, value } = Criteria.call(condition, dataIdentifier[condition]);
                console.log(attribute, operation, value);
                if (attribute && operation) {
                    query = query.where(attribute, operation, value);
                }
        }

        return await query.select();
    }
    async paginate(page = 1, PAGE_SIZE = 10,dataIdentifier={}) {
        const offset = (page - 1) * PAGE_SIZE;
        let query = this.connection(this.table);

        // Iterate through the conditions object and build the query
        for (const condition in dataIdentifier) {
                const { attribute, operation, value } = Criteria.call(condition, dataIdentifier[condition]);
                console.log(attribute, operation, value);
                if (attribute && operation) {
                    query = query.where(attribute, operation, value);
                }
        }
        return await query.select().limit(PAGE_SIZE).offset(offset);
    }
    count(){
        return this.connection(this.table)
            .count();
    }
    async update(dataIdentifier={}, newData) {
        const result = await this.connection(this.table)
            .update(newData)
            .where(dataIdentifier)
            .returning('*');
        return result[0]; // Assuming you want to return the updated data.
    }
    async deleteData(dataIdentifier) {
        const result = await this.connection(this.table)
            .delete()
            .where(dataIdentifier)
            .returning('*');
        return result[0]; // Assuming you want to return the deleted data.
    }
  
}

module.exports = {Scaffold}