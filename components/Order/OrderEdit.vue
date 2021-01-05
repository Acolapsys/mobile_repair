<template>
  <v-card width="100%" class="pa-3">
    <v-card-title>Работы и материалы</v-card-title>
    <v-container>
      <v-row>
        <v-col cols="6">
          <v-form @submit.prevent="saveOrder">
            <v-row class="pt-5 d-flex flex-column" align="center">
              <v-col col="2"><h4>Исполнитель</h4></v-col>
              <v-col col="2">
                <v-select
                  v-model="managerName"
                  :items="managers"
                  outlined
                  hide-details
                ></v-select>
              </v-col>
            </v-row>
            <v-row class="pt-5 d-flex flex-column" align="center">
              <v-col col="2"><h4>Выполненная работа</h4></v-col>
            </v-row>
            <v-row>
              <v-col col="6">
                <WorksAndParts :works="order.works" />
              </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-row align="center" class="ma-5" style="font-size: 0.7rem">
              <v-btn depressed color="primary" class="mr-5" small type="submit">
                Сохранить
              </v-btn>
              <v-btn depressed small class="mr-2" @click="close">
                Закрыть
              </v-btn>
              <v-spacer></v-spacer>
            </v-row>
          </v-form> </v-col
      ></v-row>
    </v-container>
  </v-card>
</template>
<script>
import WorksAndParts from '@/components/Order/WorksAndParts'
export default {
  name: 'OrderEdit',
  components: {
    WorksAndParts,
  },
  props: {
    order: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    managers: ['Тимур Шакиров', 'Оператор'],
    managerName: null,
  }),
  beforeMount() {
    this.managerName = this.$store.getters['auth/userName']
  },
  methods: {
    close() {
      this.$store.commit('orders/setOpenedOrder', false)
    },
    async saveOrder() {
      const orderData = {}
      await this.$store.dispatch('orders/updateOrder', orderData)
    },
  },
}
</script>
