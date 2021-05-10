const crypto = require('crypto');
const fs = require('fs');
const path = require('path')

const generateKeys = () => {
    let symmetricKey = crypto.randomBytes(32);        
    let {publicKey, privateKey} =  crypto.generateKeyPairSync('rsa', {modulusLength:4096}); 

    publicKey = publicKey.export({type: 'pkcs1', format: 'pem'}).toString();
    privateKey = privateKey.export({type: 'pkcs1', format: 'pem'}).toString();

    fs.openSync(path.join(__dirname,'../Keys/public.pem'),'w');
    fs.writeFileSync(path.join(__dirname, '../Keys/public.pem'), publicKey, 'utf-8');

    fs.openSync(path.join(__dirname,'../Keys/private.pem'), 'w');
    fs.writeFileSync(path.join(__dirname, '../Keys/private.pem'), privateKey, 'utf-8');

    fs.openSync(path.join(__dirname, '../Keys/symmetricKey.key'), 'w');
    fs.writeFileSync(path.join(__dirname, '../Keys/symmetricKey.key'), symmetricKey, 'utf-8');
    
    return {publicKey, privateKey, symmetricKey}
} 

module.exports = generateKeys;
