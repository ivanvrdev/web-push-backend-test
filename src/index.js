import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { config } from 'dotenv'
import webPush from 'web-push'

import notificationsRoutes from './routes/notifications.routes.js'

config()

const app = express()

import './connection.js'

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

//configuración de web push
webPush.setVapidDetails(
  'mailto: ivanvrdev@outlook.es',
  process.env.PUBLIC_KEY,
  process.env.PRIVATE_KEY
)

app.use('/notifications', notificationsRoutes)

app.set('port', process.env.PORT || 4000)

app.listen(app.get('port'), ()=>console.log(`servidor corriendo en el puerto ${app.get('port')}`))
