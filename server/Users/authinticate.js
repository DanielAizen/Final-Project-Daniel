import crypto from 'crypto';
import bcrypt from 'bcrypt';

export const genarate_token = () => {
    return crypto.randomBytes(48).toString('base64');
};

export const genarate_hashPassword = async (str) =>{
    const hashPaasword = await bcrypt.hash(str, 10);
    return hashPaasword;
};

export const compare_hasedPassword = async (user_pwd, db_pwd) =>{
    const res = await bcrypt.compare(`` + user_pwd, `` + db_pwd);
    return res;
};

