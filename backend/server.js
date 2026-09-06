const app = require('./src/app')
const port = Number(process.env.PORT) || 3030
app.listen(port, () => {
    console.log("Server runing on port "+port);
})
