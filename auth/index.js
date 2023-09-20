const moment = require("moment");

class ServiceAuth{
    // generatetoken(...args);
    expirationtime(value,unite){ return moment().add(value,unite);}
    model=undefined
}
const states={
    NOT_CONNECTED:"NOT_CONNECTED",
    USER_NOT_FOUND:"USER_NOT_FOUND",
    WRONG_PASSWORD:"WRONG_PASSWORD",
    LOGGED_IN:"LOGGED_IN",
}
class DefaultAuth extends ServiceAuth{
    model = undefined
    config=undefined
    constructor(model){
        super()
        this.model = model
    }

    async login(username, password,action=()=>{}) {
        let state = states.NOT_CONNECTED;
      
        const instance=new this.model()
        try {
        instance.open(this.config)
          let user = await instance.checkByIdentifier(username);
          console.log(user)
          if (user.length===0) {
            state = states.USER_NOT_FOUND;
          } else {
            user=user[0]
            console.log("user found")
            const isPasswordCorrect = await instance.comparePassword(
              user[instance.passwordAttribute],
              password
            );
            console.log("password done...")
      
            if (!isPasswordCorrect) {
              state = states.WRONG_PASSWORD;
            }else{
                state = states.LOGGED_IN;
            }
            
          }
          action(user,state)
        } catch (error) {
          console.error('Error during login:', error);
          state = states.ERROR;
        }finally{
            await instance.close()
        }
      
        return state;
      }
    

}
module.exports = {ServiceAuth,DefaultAuth,states}