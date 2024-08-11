
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import Admin from '../models/AdminSchema.js'
import User from '../models/UserSchema.js'
import Doctor from '../models/DoctorSchema.js'


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

export const getAllDoctors = async (req, res) => {
    try {
        const { query } = req.query
        let doctors;

        if (query) {
            doctors = await Doctor.find({
                $or: [
                    { name: { $regex: query, $options: "i" } },
                    { specialization: { $regex: query, $options: "i" } }
                ],
            }).select("-password");
        } else {
            doctors = await Doctor.find({}).select("-password")
        }

        res.status(200).json({ success: true, message: 'Doctors found', data: doctors })
    } catch (error) {
        res.status(500).json({ success: false, message: 'No doctor found' })

    }
}
export const setDoctroAprroved = async (req, res) => {
    const doctorId = req.params.id
    try {
        const doctor = await Doctor.findById(doctorId);
        let updateDoctor
        if (doctor.isApproved === 'approved') {
            updateDoctor = await Doctor.findByIdAndUpdate(doctorId, { $set: { isApproved: 'pending' } }, { new: true })
        } else {
            updateDoctor = await Doctor.findByIdAndUpdate(doctorId, { $set: { isApproved: 'approved' } }, { new: true })
        }
        res.status(200).json({ success: true, message: 'Successfully updated', data: updateDoctor })
    } catch (error) {
        res.status(500).json({ success: false, message: 'No doctor found' })

    }
}

