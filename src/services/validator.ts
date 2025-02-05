import bcrypt from "bcrypt";

export class PwValidator {
    static validatePw(pw: string, email?: string): boolean {
        const minLength = 12;
        const hasNumber = /\d/.test(pw);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(pw);
        const hasUpperCase = /[A-Z]/.test(pw);
        const hasLowerCase = /[a-z]/.test(pw);

        if (pw.length < minLength) return false;
        if (!hasNumber || !hasSpecialChar || !hasUpperCase || !hasLowerCase) return false;
        if (email) {
            const lowerPw = pw.toLowerCase(); 
            if (lowerPw.includes(email.toLowerCase())) {
                return false;
               } 
        }
        return true;
    }

    static async isNewPw(newPw: string, oldPwHash: string): Promise<boolean> {
        const ret = await bcrypt.compare(newPw, oldPwHash);
        return ret;
    }
}