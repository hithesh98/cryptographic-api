const {encrypt} = require('../HelperFunctions/encryption');

const handleEncrypt = (symmetricKey) => (req, res) => {
    let cipherObj = {};
    for(const [key, value] of Object.entries(req.body)){
        cipherObj[key] = encrypt(value, symmetricKey)
    }
    return res.status(200).send(cipherObj)
}

module.exports = handleEncrypt;