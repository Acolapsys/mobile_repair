<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="close">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Новый заказ</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-template>
          <v-container>
            <v-row>
              <v-col cols="6">
                <v-row class="pt-5" align="center">
                  <v-col col="2"> </v-col>
                  <v-col col="4"><h4 color="blue--text">Клиент</h4></v-col>
                </v-row>
                <v-row align="center">
                  <v-col col="2"
                    ><span>Имя клиента</span><span class="red--text">*</span>
                  </v-col>
                  <v-col col="4">
                    <v-text-field outlined dense required></v-text-field>
                  </v-col>
                </v-row>
                <v-row align="center">
                  <v-col col="2"
                    ><span>Телефон</span><span class="red--text">*</span>
                  </v-col>
                  <v-col col="4">
                    <v-text-field outlined dense required></v-text-field>
                  </v-col>
                </v-row>
                <v-divider></v-divider>
                <v-row class="pt-5" align="center">
                  <v-col col="2"> </v-col>
                  <v-col col="4"
                    ><h4 color="blue--text">Изделие и неисправности</h4></v-col
                  >
                </v-row>
                <v-row align="center">
                  <v-col col="2"><span>Тип устройства</span> </v-col>
                  <v-col col="4">
                    <v-text-field outlined dense></v-text-field>
                  </v-col>
                </v-row>
                <v-row align="center">
                  <v-col col="2"><span>Бренд</span> </v-col>
                  <v-col col="4">
                    <v-text-field outlined dense></v-text-field>
                  </v-col>
                </v-row>
                <v-row align="center">
                  <v-col col="2"
                    ><span>Модель</span><span class="red--text">*</span>
                  </v-col>
                  <v-col col="4">
                    <v-text-field outlined dense required></v-text-field>
                  </v-col>
                </v-row>
                <v-row align="center">
                  <v-col col="2"
                    ><span>Неисправность</span><span class="red--text">*</span>
                  </v-col>
                  <v-col col="4">
                    <v-textarea outlined rows="3" required></v-textarea>
                  </v-col>
                </v-row>
                <v-row align="center">
                  <v-col col="2"><span>Внешний вид</span> </v-col>
                  <v-col col="4">
                    <v-text-field outlined dense></v-text-field>
                  </v-col>
                </v-row>
                <v-row class="pt-5" align="center">
                  <v-col col="2"> </v-col>
                  <v-col col="4"
                    ><h4 color="blue--text">
                      Дополнительная информация
                    </h4></v-col
                  >
                </v-row>

                <v-row align="center">
                  <v-col col="2"><span>Заметки приемщика</span> </v-col>
                  <v-col col="4">
                    <v-textarea outlined rows="3"></v-textarea>
                  </v-col>
                </v-row>
                <v-row align="center">
                  <v-col col="2"><span>Ориентировочная цена</span> </v-col>
                  <v-col col="4">
                    <v-text-field outlined dense number></v-text-field>
                  </v-col>
                </v-row>
                <v-divider></v-divider>
                <v-row align="center">
                  <v-col col="2"><span>Предоплата</span> </v-col>
                  <v-col col="4">
                    <v-text-field outlined dense number></v-text-field>
                  </v-col>
                </v-row>
                <v-row align="center">
                  <v-col col="2"><span>Менеджер</span> </v-col>
                  <v-col col="4">
                    <v-text-field outlined dense></v-text-field>
                  </v-col>
                </v-row>
                <v-divider></v-divider>
                <v-row align="center" class="mt-5" style="font-size: 0.7rem">
                  <v-btn depressed color="primary" class="mr-5" small>
                    Создать
                  </v-btn>
                  <v-btn depressed small class="mr-2"> Закрыть </v-btn>
                  <v-spacer></v-spacer>
                </v-row>
              </v-col>
            </v-row>
          </v-container>
        </v-template>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
export default {
  data() {
    return {
      dialog: true,
    }
  },
  methods: {
    close() {
      this.$emit('close')
      this.dialog = false
    },
  },
}
</script>
<style scoped>
.v-btn {
  font-size: 0.6rem;
}
</style>
