const crypto = require('crypto');
const keys = require('../config/keys.json');
const ENC_KEY = Buffer.from(keys.encryptionKey, "hex");
const IV = Buffer.from(keys.ivKey, "hex");

exports.encrypt = (val) => {
    let cipher = crypto.createCipheriv('aes-256-cbc', ENC_KEY, IV);
    let encrypted = cipher.update(val, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    return encrypted;
};

exports.decrypt = (encrypted) => {
    let decipher = crypto.createDecipheriv('aes-256-cbc', ENC_KEY, IV);
    let decrypted = decipher.update(encrypted, 'base64', 'utf8');
    return (decrypted + decipher.final('utf8'));
};

