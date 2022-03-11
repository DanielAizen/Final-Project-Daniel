import crypto from 'crypto';
import bcrypt from 'bcrypt';

export const genarate_token = () => {
    return crypto.randomBytes(48).toString('base64');
};

export const genarate_hashPassword = async (s) =>{
    const hashPaasword = await bcrypt.hash(s, 10);
    return hashPaasword;
}
