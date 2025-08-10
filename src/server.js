import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './config/database.js'
import { User } from './models/user.js'
import './config/database.js'

dotenv.config()
const app = express();

app.post('/signup', async (req, res) => {
    const user = new User({
        firstName: 'Aarti',
        lastName: 'Mishra',
        gender: 'Female',
        age: 27,
        password: 'Aarti@345',
        email: 'aarti@gmail.com'
    })
    await user.save()
    res.send(`user signedup successfully`)
})


connectDB().then(() => {
    console.log('DB Connection Successful')
    app.listen(port, () => {
        console.log(`Server running on port: ${port}`);
    })
}).catch((err) => {
    console.log('something went wrong', err)
})

