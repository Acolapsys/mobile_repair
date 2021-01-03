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
  props: {
    works: {
      type: Array,
    },
  },
  data: () => ({
    headers: [
      {
        text: 'Наименование',
        align: 'start',
        value: 'title',
      },
      { text: 'Количество', value: 'amount' },
      { text: 'Цена, руб', value: 'price' },
      { text: 'Сумма', value: 'sum' },
    ],
  }),
  computed: {
    fullPrice() {
      if (this.works) {
        return this.works.reduce((price, work) => price + work.sum)
      } else {
        return 0
      }
    },
  },
  methods: {
    openItem(e, row) {
      this.$emit('dblClickOrder', row.item.id)
    },
  },
}
</script>
