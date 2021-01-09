<template>
  <v-container>
    <v-row>
      <v-col>
        <v-data-table
          :headers="headers"
          :items="works"
          hide-default-footer
          class="pt-5"
          @dblclick:row="openItem"
        >
          <template v-slot:item.actions="{ item }">
            <v-btn icon
              ><v-icon small @click="deleteWork(item)">
                mdi-delete
              </v-icon></v-btn
            >
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="5"></v-col>
      <v-col cols="4">
        <p class="text-right">Итого сумма:</p>
      </v-col>
      <v-col cols="3">
        <p class="text-right">{{ fullPrice }} руб</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: ['orderId'],
  data: () => ({
    headers: [
      {
        text: 'Наименование',
        align: 'start',
        value: 'work',
      },
      { text: 'Количество', value: 'workPrice', align: 'right' },
      { text: 'Цена, руб', value: 'workPrice', align: 'right' },
      { text: 'Сумма', value: 'workPrice', align: 'right' },
      { text: 'Удалить', value: 'actions', sortable: false, align: 'right' },
    ],
    works: [],
  }),
  computed: {
    fullPrice() {
      if (this.works) {
        return this.works.reduce((price, work) => price + +work.workPrice, 0)
      } else {
        return 0
      }
    },
  },
  async beforeMount() {
    this.works = await this.$store.dispatch('orders/fetchWorks', this.orderId)
  },
  methods: {
    openItem(e, row) {
      this.$emit('dblClickOrder', row.item.id)
    },
    deleteWork(work) {
      this.$emit('onDeleteWork', work)
    },
  },
}
</script>
