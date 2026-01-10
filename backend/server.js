const app = require('./src/app')
const pool = require('./src/db/db')
const port = 3030
app.listen(port, () => {
    console.log("Server runing on port "+port);
})