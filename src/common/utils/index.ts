const bcrypt = require('bcrypt');

export function getClientIp(req) {
    let ip = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress || '';
    ip = ip.match(/\d+.\d+.\d+.\d+/);
    return ip ? ip.join('.') : null
}

/**
 * @description bcrypt加密密码
 * @param pwd 
 * @returns promise<string>
 */
export function bcryptGenSalt(pwd: string): Promise<string> {
    return new Promise(resolve => {
        const saltRounds = 10;
        bcrypt.hash(pwd, saltRounds, function(err, hash) {
            resolve(hash);
        });
    })
}

export function bcryptCompare(pwd:string, hash:string): Promise<boolean>{
    return new Promise(resolve=>{
        bcrypt.compare(pwd, hash, function(err, res) {
            resolve(res);
        });
    })
}