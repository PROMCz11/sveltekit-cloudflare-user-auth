import bcrypt from "bcryptjs";
export const hashPassword = async (password) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
};
export const verifyPassword = async (hashedPassword, plainPassword) => {
    const isValid = bcrypt.compareSync(plainPassword, hashedPassword);
    return isValid;
};