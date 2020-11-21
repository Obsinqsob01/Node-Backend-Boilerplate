import bcrypt from "bcrypt"

export const HashPassword = async password => {
    try {
        let salt = await bcrypt.genSalt(10)

        let passwordHashed = await bcrypt.hash(password, salt)

        return passwordHashed
    } catch (error) {
        return error
    }
}

export const ComparePassword = async (password, passwordHashed) => {
    try {
        return await bcrypt.compare(password, passwordHashed)
    } catch(error) {
        return false
    }
}
