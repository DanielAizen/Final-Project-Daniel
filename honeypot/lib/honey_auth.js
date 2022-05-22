
import crypto from 'crypto';

const regexs = {
    '1=1': /[0-9]+[\=][0-9]+/g,
    'lines': /[\t\r\n]/g,
    'complex': /(ALTER|CREATE|DELETE|DROP|EXEC(UTE){0,1}|INSERT( +INTO){0,1}|MERGE|SELECT|UPDATE|UNION( +ALL){0,1})/g,
    'complex2': /^(.+)\\sand\\s(.+)|(.+)\\sor(.+)\\s$/g,
    'script': /<script[\s\S]*?>[\s\S]*?<\/script>/gi
};

export function honey_auth_str(str) {
    for (let r in regexs){
        if (str.match(regexs[r]) !== null){
            return true;
        }
    }
    return false;
}

export function genarate_honey_token () {
    return crypto.randomBytes(48).toString('base64');
}