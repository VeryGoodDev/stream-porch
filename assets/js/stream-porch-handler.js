;(() => {
  const socket = window.io()
  socket.on(`connect`, () => {
    socket.on(`handleAction`, ({ type, value }) => {
      console.log(`action!`)
      if (type === `audio`) {
        // TODO: Error handling
        // TODO: Show on screen when something happens
        // (hook into audio API to determine when start/stop?)
        document.querySelector(`[data-name="${value}"]`).play()
      }
    })
  })
  // TODO: Custom options for reconnect
  // TODO: Handle more built-in events
})()
