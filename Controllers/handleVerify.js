const crypto = require('crypto');
const {objDecryption} = require('../HelperFunctions/encryption');

const handleVerify = (symmetricKey, publicKey) => (req, res) => {
    const {signature} = req.body;
    const data = JSON.stringify(objDecryption(req.body.data, symmetricKey))
    const isVerified = crypto.verify('sha256', Buffer.from(data), {
        key: publicKey, 
        padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
    }, Buffer.from(signature, 'base64'))
    if(isVerified){
        res.status(204).send()
    } else {
        res.status(400).send()
    };
}
module.exports = handleVerify;