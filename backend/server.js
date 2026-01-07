const app = require('./src/app')
const connectDB = require('./src/db/db')
const port = 3030
connectDB();
app.listen(port, () => {
    console.log("Server runing on port "+port);
})