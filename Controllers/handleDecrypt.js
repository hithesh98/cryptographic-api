const {objDecryption} = require('../HelperFunctions/encryption');

const handleDecrypt = (symmetricKey) => (req, res) => {
    let plaintextObj = objDecryption(req.body, symmetricKey);
    return res.status(200).json(plaintextObj)
}
    
module.exports = handleDecrypt