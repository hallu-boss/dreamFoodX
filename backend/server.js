const express = require('express')
const cors = require('cors');
const { handleGetProfileReq } = require('./controllers/profileController');
const app = express()

app.use(cors({
  origin: '*',
  credentials: true
}));

app.use(express.json())

app.use('/users', require('./routes/userRoute'))
app.use('/register', require('./routes/registerRoute'))
app.use('/login', require('./routes/loginRoute'))

app.get('/profile', verifyToken, handleGetProfileReq)

app.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});