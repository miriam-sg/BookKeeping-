require('dotenv').config()
const http = require('http')
const app = require('./app')
const { openConnection } = require('./services/db/mongo-connection')

openConnection('mongodb://127.0.0.1:27017').then(_=>{
    app.listen(3000,"127.0.0.1",()=>{
        console.log(`http://127.0.0.1:3000`);
    })
}).catch(ex=>{
    console.log('could not open connection to mongo db server');
})



const server = http.createServer(app)