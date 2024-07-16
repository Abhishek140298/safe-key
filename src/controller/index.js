const User = require("../model/user");
const UserDetails = require("../model/useoriginAndPassword");

async function createmPin(req, res) {
  console.log("Req body", req.body);
  try {
    const { mpin, mobileNumber } = req.body;

    const newUser = new User({
      mobileNumber: mobileNumber,
      mpin: mpin,
    });

    await newUser.save();
    res.status(200).send(newUser);
  } catch (err) {
    console.log("User", err);

    res.status(400).send(err);
  }
}

async function checkUserExists(req, res) {
  console.log("Req.params", req.params, User);
  try {
    const mobileNumber = Number(req.params.mobileNumber);
    if(mobileNumber.length!==10){
        res.status(400).json({ error: "Mobile number is invalid"});
        return
    }
    const checkNumber = await User.findOne({ mobileNumber: mobileNumber });


    if (!checkNumber) {
      res.status(404).json({ error: "Mobile number does not exist",userExist:false });
    } else {
      res.status(200).send({ userExist: true });
    }
  } catch (err) {
    res.status(400).send(err);
  }
}

async function checkMpinCorrect(req, res) {
  try {
    const mobileNumber = Number(req.params.mobileNumber);
    const mpin = Number(req.params.mpin);
    const getMpinOfNumber = await User.findOne({ mobileNumber: mobileNumber });
    if (!getMpinOfNumber) {
      res.status(404).json({ error: "Mobile number does not exist" });
      
    } else if (getMpinOfNumber.mpin == mpin) {
      res.status(200).send({ mpin: true });
    } else {
      res.status(200).send({ userExist: false });
    }
  } catch (err) {
    res.status(400).send(err);
  }
}

async function createOriginAndPassword(req, res) {
  try {
    const { originName, originPassword } = req.body;
    const mobileNumber = Number(req.params.mobileNumber);
    const checkMobileNumber = await User.findOne({
      mobileNumber: mobileNumber,
    });
    if (!checkMobileNumber) {
      res.status(404).json({ error: "Mobile number does not exist" });
    } else {
      const newOriginpaaPassword = new UserDetails({
        user_id: checkMobileNumber._id,
        originName: originName,
        originPassword: originPassword,
      });

      await newOriginpaaPassword.save();

      res.status(200).send(newOriginpaaPassword);
    }
  } catch (error) {
    res.status(400).send(err);
  }
}

async function getAllOriginAndPassword(req, res) {
  try {
    const mobileNumber = Number(req.params.mobileNumber);
    const checkMobileNumber = await User.findOne({
      mobileNumber: mobileNumber,
    });

    if (!checkMobileNumber) {
      res.status(404).json({ error: "Mobile number does not exist" });
    } else {
      const user_id = checkMobileNumber._id;
      const alluserOriginAndPassword = await UserDetails.find({
        user_id: user_id,
      });
      res.status(200).send({
        status: "OK",
        data: alluserOriginAndPassword,
      });
    }
  } catch (err) {
    res.status(400).send(err);
  }
}

async function updateOriginAndPassword(req, res) {
  try {
    const { _id, originName, originPassword } = req.body;
    if (_id) {
      const prevData = await UserDetails.findOne({ _id: _id });

      if (!prevData) {
        res.status(404).json({ error: "origin id does not exixt" });
      } else {
        const user_id = prevData.user_id;
        const updatedData = await UserDetails.findByIdAndUpdate(
          _id,
          { ...req.body, user_id: user_id },
          { new: true, runValidators: true }
        );
        res.status(200).send({ status: "OK", data: updatedData });
      }
    }
  } catch (err) {
    res.status(400).send(err);
  }
}


async function deleteUserOriginAndPassword(req,res){
    try{
        const _id=req.params.originpassId
        const deleteOriginAndPass=await UserDetails.findByIdAndDelete(_id)
        res.status(200).send({status:"OK",
  data:deleteOriginAndPass  })

    }
    catch(err){
        res.status(400).send(err);

    }
}

module.exports = {
  createmPin,
  checkUserExists,
  checkMpinCorrect,
  createOriginAndPassword,
  getAllOriginAndPassword,
  updateOriginAndPassword,
  deleteUserOriginAndPassword
};
