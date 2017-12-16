(function () {
  'use strict'

  // Check to make sure service workers are supported in the current browser,
  // and that the current page is accessed from a secure origin. Using a
  // service worker from an insecure origin will trigger JS console errors.
  const isLocalhost = Boolean(window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' ||
    // 127.0.0.1/8 is considered localhost for IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
  )

  window.addEventListener('load', function () {
    if ('serviceWorker' in navigator &&
      (window.location.protocol === 'https:' || isLocalhost)) {
      navigator.serviceWorker.register('service-worker.js')
        .then(function (registration) {
          // updatefound is fired if service-worker
          // .js changes.
          console.log('SERVICE WORKER UPDATE')
          registration.onupdatefound = function () {
            // updatefound is also fired the very first time the SW is installed,
            // and there's no need to prompt for a reload at that point.
            // So check here to see if the page is already controlled,
            // i.e. whether there's an existing service worker.
            if (navigator.serviceWorker.controller) {
              // The updatefound event implies that registration.installing is set
              const installingWorker = registration.installing

              installingWorker.onstatechange = function () {
                switch (installingWorker.state) {
                  case 'installed':
                    console.log('SERVICE WORKER INSTALLED')
                    // At this point, the old content will have been purged and the
                    // fresh content will have been added to the cache.
                    // It's the perfect time to display a "New content is
                    // available; please refresh." message in the page's interface.
                    break

                  case 'redundant':
                    throw new Error('The installing ' +
                      'service worker became redundant.')

                  default:
                  // Ignore
                }
              }
            }
          }
        }).catch(function (e) {
        console.error('Error during service worker registration:', e)
      })
    }
  })
})()

self.addEventListener('notificationclick', (event) => {
  let notification = event.notification
  let action = event.action

  if (action === 'confirm') {
    notification.close()
  } else {
    console.log(action)
    event.waitUntil(
      clients.matchAll()
        .then(clis => {
          const client = clis.find(c => c.visibilityState === 'visible')
          if (client) {
            client.navigate('http://localhost:8080')
            client.focus()
          } else {
            clients.openWindow('http://localhost:8080')
          }
          notification.close()
        })
    )
  }
})

self.addEventListener('push', (event) => {
  let data = {title: 'New!', content: 'Something was added', openUrl: '/meetings'}
  if (event.data) {
    data = JSON.parse(event.data.text())
  }
  const options = {
    body: data.content,
    url: data.openUrl
  }
  event.waitUntil(
    self.registration.showNotification(data.title, options)
  )
})
