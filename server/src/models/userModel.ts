import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    type: String,
    password: String,
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'task'
    }]
}, { timestamps: true });

const User = mongoose.model('user', userSchema)

export default User;
