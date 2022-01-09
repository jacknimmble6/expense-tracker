import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  username: { 
    type: String,
    required: true, 
    unique: true
  },
  email: String,
  password: { 
    type: String,
    required: true 
  },
  token: String
})

const User = mongoose.model('User', userSchema)

export default User
