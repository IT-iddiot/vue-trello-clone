export function uuid () {
  //* toString(16) => specify that the final output should be in hexadecimal format
  //* slice(2) => remove the 0. from generated random id
  return Math.random().toString(16).slice(2)
}

export function saveStatePlugin (store) {
  //* save the up-to-date board datas into local storage, act like a db
  //* local storage only store string, so need to stringify
  store.subscribe(
    (mutation, state) => localStorage.setItem('boards', JSON.stringify(state.boards))
  )
}
