import User from '../models/user.js'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const secret = 'test';

export const registerUser = async (req, res) => {
  const { email, username, password } = req.body

  try {
    const oldUser = await User.findOne({ username });

    if (oldUser) return res.status(400).json({ message: "User already exists" })

    const salt = await bcrypt.genSalt(10)

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({ email, password: hashedPassword, username })

    const token = jwt.sign({ username: result.username, id: result._id }, secret, { expiresIn: "1h" })

    res.status(201).json({ result, token })
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" })
    
    console.log(error);
  }
}

export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const oldUser = await User.findOne({ username })

    if (!oldUser) return res.status(404).json({ message: "User doesn't exist" })

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password)

    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" })

    const token = jwt.sign({ username: oldUser.username, id: oldUser._id }, secret, { expiresIn: "1h" })

    res.status(200).json({ result: oldUser, token })
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" })
  }
}
