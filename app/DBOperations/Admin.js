const Admin = require("../Models/Admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


module.exports = {

    create : async payload => {
            let admin = await Admin.findOne({email:payload.email});
            if(admin)
                return admin;
            return await Admin.create(payload);
    },
    
    makeAuth : async credentials => {
        let admin = await Admin.findOne({email:credentials.email});
        let authenticated = null;
        if (admin && (await bcrypt.compare(credentials.password, admin.password))) {
            const token = jwt.sign(
                {admin_id:admin._id,email:admin.email,name:admin.name},
                process.env.ADMIN_TOKEN_KEY,
                {
                  expiresIn: "2h",
                }
              );
            authenticated = {email:admin.email,name:admin.name,token}
        }
        return authenticated;
    }

}