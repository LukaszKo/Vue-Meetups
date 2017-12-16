export default {
  urlBase64ToUint8Array (base54String) {
    let padding = '='.repeat((4 - base54String.length % 4) % 4)
    let base64 = (base54String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/')

    let rawData = window.atob(base64)
    let outputArray = new Uint8Array(rawData.length)

    for (let i = 0; i < rawData.length; i++) {
      outputArray[i] = rawData.charCodeAt(i)
    }
    return outputArray
  }
}
