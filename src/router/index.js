const express = require('express')
const router=express.Router()
const userController=require('../controller')

router.get('/get',((req,res)=>{
    res.send("Wrong ")
}))


router.post('/create/mPin',userController.createmPin)
router.get('/checkUser/:mobileNumber',userController.checkUserExists)
router.get('/mpin/correct/:mobileNumber/:mpin',userController.checkMpinCorrect)
router.post('/create/originandpassword/:mobileNumber',userController.createOriginAndPassword)
router.get('/getall/oringpass/:mobileNumber',userController.getAllOriginAndPassword)
router.put('/update/originandpassword',userController.updateOriginAndPassword)
router.delete('/delete/originandpassword/:originpassId',userController.deleteUserOriginAndPassword)


module.exports=router