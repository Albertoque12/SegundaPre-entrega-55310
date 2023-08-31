const app = require("./app");

const PORT = 3000

app.listen(PORT, ()=> {
    console.log(`Server running at ${PORT}`)
})


//En este Index solo levantamos el servidor
//En app lo configuramos