const { Scaffold } = require('@orlando0309/scaffold.js/scaffold/model');
const moment = require("moment");
const { encrypt } = require('../encrypt');
const crypto = require('crypto');

class AuthModel extends Scaffold{
    // what is your encryption
    encrypt_key = encrypt.noEncryption
    constructor(config, options = {}) {
        super(config);
        // the attribute of email,..,password,...
        this.emailAttribute = options.emailAttribute || 'email';
        this.identifierAttribute = options.identifierAttribute || 'username';
        this.passwordAttribute = options.passwordAttribute || 'password';
      }
    checkByIdentifier(identifier) {
        const query = {};
        query[this.emailAttribute] = identifier;
        return this.select(query);
    }
    encryptPassword(password){
        return this.encrypt_key(password)
    }
    comparePassword(password){
        const query = {};
        query[this.passwordAttribute] = this.encrypt_key(password);
        return this.select(query);
    }
    comparePassword(mypassword,password){
        return (mypassword) === this.encrypt_key(password)
    }
    
    expirationtime(){
        return moment().add(1,"hours")
    }
}

module.exports ={AuthModel}