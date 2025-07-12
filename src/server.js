const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// match GET method
app.get('/user', (req, res) => {
    res.send({
        firstName: 'Aarti',
        middleName: 'Nilesh',
        lastName: 'Mishra',
        age: 26,
        gender: 'female',
        profession: 'Java Full-stack developer',
        address: {
            city: 'Bengaluru',
            pincode: 560076,
            area: 'kodichikanahalli'
        }

    })
})


//match POST method
app.post('/user', (req, res) => {
    res.send('User saved Successfully !!')
})


//match DELETE method
app.delete('/user', (req, res) => {
    res.send('User deleted Successfully !!')
})

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
})

//will match all http methods to /use
app.use('/user', (req, res) => {
    res.send('use method overides all the http methods')
})