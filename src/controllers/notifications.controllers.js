import webPush from 'web-push'
import SubscriptionModel from "../models/subscription.model.js"

export const subscribeDevice = async (req, res) => {
  try {

    console.log(req.body)

    const newSubscription = new SubscriptionModel({...req.body})

    await newSubscription.save()

    res.status(201).json({
      message: 'subscrito!'
    })
  } catch (error) {
    req.status(400).json({
      message: 'Error al suscribir dispositivo!'
    })
    console.log('Error al suscribir dispositivo: ', error)
  }
}

export const sendTestNotifications = async (req, res) => {
  const payload = JSON.stringify({
    title: 'Hola mundo',
    body: 'Notificación enviada desde el backend'
  })

  try{
    const subscriptions = await SubscriptionModel.find()

    console.log('enviando notificaciones...')

    // subscriptions.forEach(subscription => console.log(subscription))

    for (const suscription of subscriptions) {
      
      const {endpoint, expirationTime, keys} = suscription
      await webPush.sendNotification({endpoint, expirationTime, keys}, payload)
    }

    console.log('Notificaciones enviadas!')
    res.status(200).json({message: 'Notificaciones enviadas!'})
  }catch(error){
    res.status(500).json({message: 'Error al enviar notificaciones...'})
    console.log('Error al enviar notificaciones:', error)
  }
} 