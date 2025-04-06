const express = require('express')
const cors = require('cors');
const app = express()

app.use(cors({
  origin: '*',
  credentials: true
}));

app.use(express.json())

app.use('/users', require('./routes/userRoute'))
app.use('/register', require('./routes/registerRoute'))
app.use('/login', require('./routes/loginRoute'))

app.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});