import { NuxtFireInstance } from '@nuxtjs/firebase'

let $fire: NuxtFireInstance

export function initializeFirebase(firebaseInstance: NuxtFireInstance) {
  $fire = firebaseInstance
}

export { $fire }
