self.addEventListener('activate', () => {
  console.log('SW Activated DEV')
})

self.addEventListener('notificationclick', (event) => {
  let notification = event.notification
  let action = event.action

  console.log('NOTIFICATION CLICK')

  if (action === 'confirm') {
    notification.close()
  } else {
    console.log(action)
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

self.addEventListener('push', function (event) {
  console.log('Push notification received', event)

  let data = {title: 'New!', content: 'Something was added', openUrl: '/'}
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
