import { writable, readable, derived } from 'svelte/store'
import * as local from './util.js'

const time = readable(new Date(), (set) => {
  const interval = setInterval(() => {
    set(new Date())
  }, 1000)

  return () => {
    clearInterval(interval)
  }
})

function createUser() {
  let { subscribe, set, update } = writable(local.getUser())

  return {
    subscribe,
    set: (user) => set(user),
    update: (data) => update(...u, ...data),
    logout: () => {
      console.log('Removing user...')
      local.removeUser()
      console.log('user removed.')
      set({})
    }
  }
}

export const user = createUser()