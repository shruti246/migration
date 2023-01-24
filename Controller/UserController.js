var db = require('../models')
var User = db.users;

var add = async(req,res)=>{
    try{
        let data = await User.create({firstName:"John",lastName:"ken",email:"s1@gmail.com"})
        res.send({success:data})
    }catch(e){
        console.log(e)
        res.send(e)
    }
}

module.exports = {add}