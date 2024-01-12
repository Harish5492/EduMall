const affiliateRequest = require('../models/affiliateRequestmodel')
const model = require('../models/usermodel');

class referalAndAffiliate {
    
    generateAlphanumericCode() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let code = '';
      
        for (let i = 0; i < 6; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          code += characters.charAt(randomIndex);
        }
      
        return code;
      }

    errorCheckCode(code) {
        if (!code) throw { message: "No Code Given", status: false }
    }

    errorCheckValidCode(findCode) {
        console.log("findCode", findCode)
        if (!findCode) throw { message: "Invalid Code", status: false }
        if (findCode.expiresAt < new Date) throw { message: "Code Expired", status: false }
    }


    async reqAction(id, status, remarks) {
    if(status==='Success') {
       const updation = await affiliateRequest.findByIdAndUpdate(
            id,
            {
                $set: { requestStatus: status}
            },
            { new: true, runValidators: true }
            
        ); 
        const roleChange = await model.findByIdAndUpdate({_id:updation.requestorID},
            {
                $set: { role: 'subAdmin'}
            },
            { new: true, runValidators: true }
         )
         console.log("ischange",roleChange)
    }
        
        else if(status==='Failure') {
            if(!remarks) throw "please enter remarks"
            await affiliateRequest.findByIdAndUpdate(
            id,
            {
                $set: { requestStatus: status,remarks:remarks}
            },
            { new: true, runValidators: true }
        );}
        else throw {message:"Please Enter valid status",status:false}
    }

}

module.exports = new referalAndAffiliate()