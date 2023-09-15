
const knex = require("knex");
const  getConnection=(config)=>{
    const result = knex(config);
  
    return result;
  }
  module.exports = {getConnection}