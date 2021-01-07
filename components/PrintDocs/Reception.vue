<template>
  <div>
    <table
      style="width: 100%"
      border="0"
      data-mce-style="width: 100%;"
      class="mce-item-table"
      data-mce-selected="1"
    >
      <tbody>
        <tr>
          <td style="width: 50%" data-mce-style="width: 50%;">
            <p><strong>Сервисный центр "Симка"</strong></p>
            <p>г. Чусовой, ул.&nbsp;50 лет ВЛКСМ 27</p>
            <p>тел.: 8 (34256) 3-02-10</p>
          </td>
          <td style="text-align: right" data-mce-style="text-align: right;">
            &nbsp;
          </td>
        </tr>
      </tbody>
    </table>
    <p><br /></p>
    <p style="text-align: center" data-mce-style="text-align: center;">
      <span
        style="text-decoration: underline"
        data-mce-style="text-decoration: underline;"
        >Квитанция&nbsp;<strong>{{ order.orderId }}</strong
        >&nbsp;от&nbsp;<em>{{ order.date }}</em></span
      >
    </p>
    <p><br /></p>
    <table
      style="width: 100%"
      border="0"
      data-mce-style="width: 100%;"
      class="mce-item-table"
    >
      <tbody>
        <tr>
          <td style="width: 50%" data-mce-style="width: 50%;">
            <p>
              <strong>Клиент:</strong>&nbsp;{{ order.clientName }},&nbsp;{{
                order.phoneNumber
              }}
            </p>
            <p>
              <strong>Устройство:&nbsp;</strong>{{ order.kindofgood }}&nbsp;{{
                order.brandName
              }}
              {{ order.modelOfGood }}
            </p>
            <p><strong>Внешний вид:</strong>&nbsp;{{ order.appearance }}</p>
            <p><strong>Дефект:</strong>&nbsp;{{ order.malfunction }}</p>
          </td>
          <td valign="top">
            <p>
              <strong>Ориентировочная стоимость:</strong>&nbsp;{{
                order.estimatedPrice
              }}&nbsp;руб
            </p>
            <p><strong>Аванс:</strong>&nbsp;{{ order.prepaiment }}</p>
            <p><strong>Заметки приемщика:</strong>&nbsp;{{ order.notes }}</p>
          </td>
        </tr>
      </tbody>
    </table>
    <p><br /></p>
    <p>
      1. Технический центр не несет ответственности за возможную потерю данных в
      &nbsp;памяти устройства, а так же за оставленные SIM и FLASH карты.
      Заблаговременно примите меры по резервированию информации.
    </p>
    <p>
      2. Заказчик принимает на себя риск возможной полной или частичной утраты
      работоспособности устройства в процессе ремонта, в случае грубых нарушений
      пользователем условий эксплуатации , наличие следов попадания
      токопроводящей жидкости (коррозии), либо механических повреждений.
    </p>
    <p>
      3. На восстановленные после попадания &nbsp;жидкости на устройство
      гарантия не распространяется и не продлевается.
    </p>
    <p>
      4. Срок хранения аппарата 30 дней с ориентировочной даты готовности. После
      данного срока аппарат утилизируется и претензии по нему не принимаются.
    </p>
    <p>
      5. В случае утери квитанции, устройство выдается по предъявлению паспорта
      на имя заказчика.
    </p>
    <p>
      6. Устройство&nbsp;с согласия Заказчика принимается в ремонт/на
      диагностику без разборки и предварительной проверки на, возможно, имеющие
      место неисправности, не указанные в квитанции.
    </p>
    <p><br /></p>
    <p><br /></p>
    <table
      style="width: 100%"
      border="0"
      data-mce-style="width: 100%;"
      class="mce-item-table"
    >
      <tbody>
        <tr>
          <td style="width: 50%" valign="top" data-mce-style="width: 50%;">
            <p>Приемщик: _____________________&nbsp;{{ order.managerName }}</p>
          </td>
          <td></td>
          <td>
            <p style="text-align: right" data-mce-style="text-align: right;">
              _____________________ {{ order.clientName }}
            </p>
            <p style="text-align: right" data-mce-style="text-align: right;">
              с условиями ремонта ознакомлен и согласен&nbsp;
            </p>
          </td>
        </tr>
      </tbody>
    </table>
    <p><br /></p>
    <p style="text-align: center" data-mce-style="text-align: center;">
      <br />
    </p>
    <p style="text-align: center" data-mce-style="text-align: center;">
      - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
      - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    </p>
    <p style="text-align: center" data-mce-style="text-align: center;">
      <br />
    </p>
    <p style="text-align: center" data-mce-style="text-align: center;">
      <br />
    </p>
    <table
      style="width: 100%"
      border="0"
      data-mce-style="width: 100%;"
      class="mce-item-table"
      data-mce-selected="1"
    >
      <tbody>
        <tr>
          <td style="width: 50%" data-mce-style="width: 50%;">
            <p><strong>Сервисный центр "Симка"</strong></p>
            <p>г. Чусовой, ул.&nbsp;50 лет ВЛКСМ 27</p>
            <p>тел.: 8 (34256) 3-02-10</p>
          </td>
          <td style="text-align: right" data-mce-style="text-align: right;">
            &nbsp;
          </td>
        </tr>
      </tbody>
    </table>
    <p><br /></p>
    <p style="text-align: center" data-mce-style="text-align: center;">
      <span
        style="text-decoration: underline"
        data-mce-style="text-decoration: underline;"
        >Квитанция&nbsp;<strong>{{ order.orderId }}</strong
        >&nbsp;от&nbsp;<em>{{ order.date }}</em></span
      >
    </p>
    <p><br /></p>
    <table
      style="width: 100%"
      border="0"
      data-mce-style="width: 100%;"
      class="mce-item-table"
    >
      <tbody>
        <tr>
          <td style="width: 50%" data-mce-style="width: 50%;">
            <p>
              <strong>Клиент:</strong>&nbsp;{{ order.clientName }},&nbsp;{{
                order.phoneNumber
              }}
            </p>
            <p>
              <strong>Устройство:&nbsp;</strong>{{ order.kindofgood }}&nbsp;{{
                order.brandName
              }}
              {{ order.modelOfGood }}
            </p>
            <p><strong>Внешний вид:</strong>&nbsp;{{ order.appearance }}</p>
            <p><strong>Дефект:</strong>&nbsp;{{ order.malfunction }}</p>
          </td>
          <td valign="top">
            <p>
              <strong>Ориентировочная стоимость:</strong>&nbsp;{{
                order.estimatedPrice
              }}&nbsp;руб
            </p>
            <p><strong>Аванс:</strong>&nbsp;{{ order.prepaiment }}</p>
            <p><strong>Заметки приемщика:</strong>&nbsp;{{ order.notes }}</p>
          </td>
        </tr>
      </tbody>
    </table>
    <p><br /></p>
    <p>
      1. Технический центр не несет ответственности за возможную потерю данных в
      &nbsp;памяти устройства, а так же за оставленные SIM и FLASH карты.
      Заблаговременно примите меры по резервированию информации.
    </p>
    <p>
      2. Заказчик принимает на себя риск возможной полной или частичной утраты
      работоспособности устройства в процессе ремонта, в случае грубых нарушений
      пользователем условий эксплуатации , наличие следов попадания
      токопроводящей жидкости (коррозии), либо механических повреждений.
    </p>
    <p>
      3. На восстановленные после попадания &nbsp;жидкости на устройство
      гарантия не распространяется и не продлевается.
    </p>
    <p>
      4. Срок хранения аппарата 30 дней с ориентировочной даты готовности. После
      данного срока аппарат утилизируется и претензии по нему не принимаются.
    </p>
    <p>
      5. В случае утери квитанции, устройство выдается по предъявлению паспорта
      на имя заказчика.
    </p>
    <p>
      6. Устройство&nbsp;с согласия Заказчика принимается в ремонт/на
      диагностику без разборки и предварительной проверки на, возможно, имеющие
      место неисправности, не указанные в квитанции.
    </p>
    <p><br /></p>
    <p><br /></p>
    <table
      style="width: 100%"
      border="0"
      data-mce-style="width: 100%;"
      class="mce-item-table"
    >
      <tbody>
        <tr>
          <td style="width: 50%" valign="top" data-mce-style="width: 50%;">
            <p>Приемщик: _____________________&nbsp;{{ order.managerName }}</p>
          </td>
          <td>
            <p style="text-align: right" data-mce-style="text-align: right;">
              _____________________ {{ order.clientName }}
            </p>
            <p style="text-align: right" data-mce-style="text-align: right;">
              с условиями ремонта ознакомлен и согласен&nbsp;
            </p>
          </td>
        </tr>
      </tbody>
    </table>
    <p style="text-align: center" data-mce-style="text-align: center;">
      &nbsp;&nbsp;
    </p>
    <div
      id="mceResizeHandlenw"
      data-mce-bogus="all"
      class="mce-resizehandle"
      unselectable="true"
      data-mce-style="cursor: nw-resize; margin: 0px; padding: 0px; left: 3.5px; top: 3.5px;"
      style="
        cursor: nw-resize;
        margin: 0px;
        padding: 0px;
        left: 3.5px;
        top: 3.5px;
      "
    ></div>
    <div
      id="mceResizeHandlene"
      data-mce-bogus="all"
      class="mce-resizehandle"
      unselectable="true"
      data-mce-style="cursor: ne-resize; margin: 0px; padding: 0px; left: 675.5px; top: 3.5px;"
      style="
        cursor: ne-resize;
        margin: 0px;
        padding: 0px;
        left: 675.5px;
        top: 3.5px;
      "
    ></div>
    <div
      id="mceResizeHandlese"
      data-mce-bogus="all"
      class="mce-resizehandle"
      unselectable="true"
      data-mce-style="cursor: se-resize; margin: 0px; padding: 0px; left: 675.5px; top: 67.5px;"
      style="
        cursor: se-resize;
        margin: 0px;
        padding: 0px;
        left: 675.5px;
        top: 67.5px;
      "
    ></div>
    <div
      id="mceResizeHandlesw"
      data-mce-bogus="all"
      class="mce-resizehandle"
      unselectable="true"
      data-mce-style="cursor: sw-resize; margin: 0px; padding: 0px; left: 3.5px; top: 67.5px;"
      style="
        cursor: sw-resize;
        margin: 0px;
        padding: 0px;
        left: 3.5px;
        top: 67.5px;
      "
    ></div>
  </div>
</template>

<script>
export default {
  props: {
    orderId: String,
  },
  data: () => ({
    order: {},
  }),
  async beforeMount() {
    this.order = await this.$store.dispatch('orders/getOrder', this.orderId)
    console.log(this.order)
  },
}
</script>

<style scoped>
p {
  margin-bottom: 2px !important;
}
@media print {
  p {
    margin-bottom: 2px !important;
  }
}
</style>
