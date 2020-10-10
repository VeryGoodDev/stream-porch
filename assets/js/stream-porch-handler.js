;(() => {
  const output = document.querySelector(`output`)
  const socket = window.io()
  socket.on(`connect`, () => {
    output.textContent = `No actions happening`
    socket.on(`handleAction`, ({ type, value, display }) => {
      if (type === `audio`) {
        const audio = document.querySelector(`[data-name="${value}"]`)
        if (!audio) {
          output.textContent = `Bad audio action provided`
          console.error(`Bad action provided`, { type, value, display })
          return
        }
        document.querySelectorAll(`audio`).forEach(audioEl => {
          if (!audioEl.paused) {
            audioEl.pause()
            audioEl.currentTime = 0
            audioEl.removeEventListener(`ended`, handleEnded)
          }
        })
        audio.addEventListener(`ended`, handleEnded)
        audio.play()
        output.textContent = `Now playing ${display}`
      }
    })
  })
  // TODO: Custom options for reconnect
  // TODO: Handle more built-in events
  function handleEnded({ currentTarget }) {
    output.textContent = `No actions happening`
    currentTarget.removeEventListener(`ended`, handleEnded)
  }
})()
