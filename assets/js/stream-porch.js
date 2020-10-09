;(() => {
  const unconnected = document.querySelector(`.unconnected`)
  const failedConnect = document.querySelector(`.failed-connection`)
  const controls = document.querySelector(`.controls`)
  const socket = window.io()
  socket.on(`connect`, () => {
    unconnected.classList.add(`hide`)
    controls.classList.remove(`hide`)
    controls.querySelectorAll(`button`).forEach(btn => {
      btn.addEventListener(`click`, sendRequest)
    })
  })
  socket.on(`connect_error`, () => {
    unconnected.classList.add(`hide`)
    failedConnect.classList.remove(`hide`)
  })
  socket.on(`connect_timeout`, () => {
    unconnected.classList.add(`hide`)
    failedConnect.classList.remove(`hide`)
  })

  function sendRequest({ target }) {
    const { type, value } = target.dataset
    socket.emit(`requestAction`, { type, value })
  }
})()
