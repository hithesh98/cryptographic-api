const crypto =  require('crypto');

const algorithm = 'aes-256-cbc';
const iv = crypto.randomBytes(16);

const encrypt = (plaintext, symmetricKey) => {
    let cipher = crypto.createCipheriv(algorithm, symmetricKey, iv);
    let encrypted = Buffer.concat([cipher.update(Buffer.from(JSON.stringify(plaintext), 'utf-8')), cipher.final()]);
    return encrypted.toString('base64')
}

const decrypt = (ciphertext, symmetricKey) => {
    let decipher  = crypto.createDecipheriv(algorithm, symmetricKey, iv);
    let decrypted = Buffer.concat([decipher.update(Buffer.from(ciphertext, 'base64')), decipher.final()]);
    return decrypted.toString('utf-8')
}

// detect encrypted strings in an object and decrypts them
const objDecryption = (obj, symmetricKey) => {
    let plaintextObj = {};
    for(const [key, value] of Object.entries(obj)){
        try {
            plaintextObj[key] = JSON.parse(decrypt(value, symmetricKey))
        } catch (error) {
            plaintextObj[key] = value
        }
    }
    return plaintextObj
}

module.exports = {encrypt, decrypt, objDecryption}