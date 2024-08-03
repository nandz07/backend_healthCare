
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'


const generateToken = user => jwt.sign({ adminEmail: "admin@gmail.com" }, process.env.JWT_SECRET_key, {
    expiresIn: '15d',
})

export const adminLogin = async (req, res) => {
    const adminData = req.body
    const adminEmail = "admin@gmail.com"
    const adminPassword = "123123"
    try {

        if (adminData.email == adminEmail && adminData.password == adminPassword) {
            // res.json({ status: true, admin: true, admin: token })
            const adminToken = generateToken(adminEmail)
            res.status(200).json({ status: true, message: "Successfully login", adminToken })
        } else {
            return res.status(400).json({ status: false, message: "invalid Email or Password" });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ status: false, message: "Failed to login" })
    }
}