const express = require('express');
const app = express()
const crypto = require('crypto');
const fs = require('fs');
const handleEncrypt = require('./Controllers/handleEncrypt');
const handleDecrypt = require('./Controllers/handleDecrypt');
const handleSign = require('./Controllers/handleSign');
const handleVerify = require('./Controllers/handleVerify');
const generateKeys = require('./HelperFunctions/generator');

const PORT = process.env.PORT || 8080;
let publicKey;
let privateKey;
let symmetricKey;


// Key generated on first start and read in on subsequent startups 
if(!fs.existsSync('./Keys/public.pem') || !fs.existsSync('./Keys/private.pem') || !fs.existsSync('./Keys/symmetricKey.key')){
    const keys = generateKeys();
    publicKey  = keys.publicKey
    privateKey = keys.privateKey
    symmetricKey = keys.symmetricKey
} else {
    publicKey = crypto.createPublicKey(fs.readFileSync('./Keys/public.pem', 'utf-8'))
    privateKey = crypto.createPrivateKey(fs.readFileSync('./Keys/private.pem', 'utf-8'))
    symmetricKey = fs.readFileSync('./Keys/symmetricKey.key')    
}

app.use(express.json())

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))

app.get('/', (req, res) => {res.send('Cryptographic-API')})
app.post('/encrypt', handleEncrypt(symmetricKey));
app.post('/decrypt', handleDecrypt(symmetricKey)); 
app.post('/sign', handleSign(symmetricKey, privateKey));
app.post('/verify', handleVerify(symmetricKey, publicKey));
