import { Router } from "express"
import { sendTestNotifications, subscribeDevice } from "../controllers/notifications.controllers.js"

const notificationsRoutes = Router()

notificationsRoutes.post('/subscribe', subscribeDevice)
notificationsRoutes.post('/test', sendTestNotifications)

export default notificationsRoutes