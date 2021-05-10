const crypto = require('crypto');
const {objDecryption} = require('../HelperFunctions/encryption');

const handleSign = (symmetricKey, privateKey) => (req, res) => {
    const plaintext = JSON.stringify(objDecryption(req.body, symmetricKey))
    const signature = crypto.sign('sha256', Buffer.from(plaintext), {
        key: privateKey,
        padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
    }).toString('base64')
    res.status(200).send(JSON.stringify(signature))
}

module.exports = handleSign;