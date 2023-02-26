import { connect } from "mongoose"
import { config } from "dotenv"

config()

connect(process.env.DATABASE_URI, {dbName: process.env.DATABASE_NAME})
.then(()=>console.log('servidor connectado a la base de datos'))
.catch((error)=>console.log('error al conectar el servidor a la base de datos: ', error))
