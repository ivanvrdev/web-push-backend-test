## COMO EMPEZAR A USAR WEB-PUSH

1. Generar llaves pública y privida

Ejecutar en consola:
~~~
npx web-push generate-vapid-keys
~~~

2. Guardar llaves en el `.env`

3. Crear servicio en el **Frontend** en `/public/sw.js`(vite React)
~~~js
self.addEventListener ('push', async (event) => {
  const data = await event.data.json()
  self.registration.showNotification(data.title, {
    body: data.body
  })
  console.log('Notificación recibida')
})
~~~

4. Montar el servicio al iniciar la app (React)
~~~js
const subscribe = async () => {
    try {
      const register = await navigator.serviceWorker.register('/sw.js', {scope: '/'})

      const subscription = await register.pushManager.getSubscription()

      if (subscription !== null) {
        setStatus('subscrito previamente...')
        return
      }

      const newSubscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: '[TU CLAVE PÚBLICA]'
      })
  
      const response = await fetch('[HOST]/notifications/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newSubscription)
      })
      const data = await response.json()
      setStatus(data.message)
    } catch (error) {
      setStatus('Error al subscribirse...')
      console.log(error)
    }
  }

  useEffect(()=>{
    subscribe()
  }, [])
~~~


## ENDPOINTS

Subscripción:

**POST** `/notifications/subscribe`

Test:

**POST** `/notifications/test`
