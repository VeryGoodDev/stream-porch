/* eslint-disable no-restricted-globals */

self.addEventListener(`install`, evt => {
  evt.waitUntil(
    caches.open(`stream-porch`).then(cache => {
      return cache.addAll([`/`])
    })
  )
})

self.addEventListener(`fetch`, evt => {
  console.log(evt)
})
