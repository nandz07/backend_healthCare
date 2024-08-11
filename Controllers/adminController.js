
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import Admin from '../models/AdminSchema.js'
import User from '../models/UserSchema.js'


const generateToken = user => jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET_key, {
    expiresIn: '15d',
})

export const adminLogin = async (req, res) => {
    const { email } = req.body
    try {
        const admin = await Admin.findOne({ email })
        if (!admin) {
            return res.status(404).json({ message: "User not found" })
        }

        const isPasswordMatch = await bcrypt.compare(req.body.password, admin.password)
        if (!isPasswordMatch) {
            return res.status(400).json({ status: false, message: "Invalid credentials" })
        }
        const adminToken = generateToken(admin)
        res.status(200).json({ status: true, message: "Successfully login", adminToken })

    } catch (err) {
        console.log(err);
        return res.status(500).json({ status: false, message: "Failed to login" })
    }
}

