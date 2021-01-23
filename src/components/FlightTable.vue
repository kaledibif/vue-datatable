<template>
  <div class="flight-table mt-5">
    <div class="row">
      <div class="table-responsive mt-2">
        <span class="filter-object">Filter Object: {{ JSON.stringify(orders) }}</span>
        <table class="table table-striped table-bordered mt-2" style="width: 100%" id="table">
          <thead>
          <tr class="flight-tr">
            <th v-for="(column, index) in columns"
                v-bind:key="index">
              <div class="col-group">
                <span class="flight-column"
                      @click="handleClick(column)">{{ column }}</span>
                <div class="order-group">
                  <span v-if="isActiveOrder(column)"
                        class="m-2">{{ getOrderNumber(column) }}</span>
                  <div v-if="isActiveOrder(column)"
                       class="icon-group">
                    <i v-if="isActiveAsc(column)"
                       @click="handleDoubleClick(column)"
                       class="fa fa-sort-alpha-down float-end"></i>
                    <i v-else-if="isActiveDesc(column)"
                       @click="handleDoubleClick(column)"
                       class="fa fa-sort-alpha-up float-end"></i>
                  </div>
                </div>
              </div>
            </th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="row in orderedFlights" :key="row.flight">
            <td>{{ row.time }}</td>
            <td>{{ row.flight }}</td>
            <td>{{ row.destination }}</td>
            <td>{{ row.airline }}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';

export default {
  name: 'FlightTable',
  props: {
    flights: Array
  },
  data: () => ({
    orders: [
      {
        'field': 'destination',
        'order': 'asc',
      },
    ],
    columns: ['time', 'flight', 'destination', 'airline']
  }),
  methods: {
    handleClick(column) {
      const i = this.orders.map(function (e) {
        return e.field;
      })
        .indexOf(column);
      if (i > -1) {
        this.orders.splice(i, 1);
      } else {
        this.orders.push({
          'field': column,
          'order': 'asc'
        });
      }
    },
    handleDoubleClick(column) {
      this.orders.forEach(o => {
        if (o.field === column) {
          o.order = o.order === 'asc' ? 'desc' : 'asc';
        }
      });
    },
    isActiveOrder(field) {
      const sort = this.orders.filter(order => order.field === field);
      return (sort && sort[0]);
    },
    isActiveAsc(field) {
      const sort = this.orders.filter(order => order.field === field);
      return (sort && sort[0] && sort[0].order === 'asc');
    },
    isActiveDesc(field) {
      const sort = this.orders.filter(order => order.field === field);
      return (sort && sort[0] && sort[0].order === 'desc');
    },
    getOrderNumber(column) {
      return this.orders.map(function (e) {
        return e.field;
      })
        .indexOf(column) + 1;
    }
  },
  computed: {
    orderedFlights() {
      const fieldsArr = this.orders.reduce((result, { field }) => [...result, field], []);
      const ordersArr = this.orders.reduce((result, { order }) => [...result, order], []);

      return _.orderBy(
        this.flights,
        fieldsArr,
        ordersArr
      );
    },

  },
  created() {
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.filter-object {
  opacity: 0.6;
  font-size: 14px;
  font-family: monospace;
}

.flight-column {
  text-transform: capitalize;
  cursor: pointer;
}

.col-group {
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.order-group {
  width: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  cursor: pointer;
  border-radius: 2px;
}

.icon-group {
  display: flex;
  padding: 8px;
  border-radius: 2px;
  background-color: #ccc;
}

</style>
