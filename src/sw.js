importScripts('workbox-sw.prod.v2.1.2.js');

// Note: Ignore the error that Glitch raises about WorkboxSW being undefined.
const workbox = new WorkboxSW({
  skipWaiting: true,
  clientsClaim: true
})

workbox.router.registerRoute(
  new RegExp('^https://firebasestorage.googleapis.com'),
  workbox.strategies.cacheFirst()
)

self.addEventListener('notificationclick', (event) => {
  let notification = event.notification
  let action = event.action

  if (action === 'confirm') {
    notification.close()
  } else {
    event.waitUntil(
      clients.matchAll()
        .then(clis => {
          const client = clis.find(c => c.visibilityState === 'visible')
          if (client) {
            client.navigate(notification.data.url)
            client.focus()
          } else {
            clients.openWindow(notification.data.url)
          }
          notification.close()
        })
    )
  }
})

self.addEventListener('notificationclose', (event) => {
  console.log('on close notify')
})

self.addEventListener('push', event =>{
  let data = {title: 'New meetup!', content: 'Meetup was added to calendar', openUrl: '/'}
  if (event.data) {
    data = JSON.parse(event.data.text())
  }

  const options = {
    body: data.content,
    data: {
      url: data.openUrl
    }
  }

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  )
})

workbox.precache([])
