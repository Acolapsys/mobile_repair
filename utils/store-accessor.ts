import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import payments from '~/store/payments'

let paymentsStore: payments

function initialiseStores(store: Store<any>): void {
  paymentsStore = getModule(payments, store)
}

export { initialiseStores, paymentsStore }
