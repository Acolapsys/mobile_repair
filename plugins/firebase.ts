import { Plugin } from '@nuxt/types'
import { initializeFirebase } from '~/utils/api'

const accessor: Plugin = ({ $fire }) => {
  initializeFirebase($fire)
}

export default accessor
