<template>
  <div class="content" style="height: 100%">
    <!-- BEGIN PAGE TITLE -->
    <div class="page-title"></div>
    <!-- END PAGE TITLE -->

    <div class="row">
      <div class="col-md-12">
        <div class="grid simple">
          <div class="grid-title no-border">
            <div class="tools">
              <a href="javascript:;" class="collapse"></a>
              <a href="#grid-config" data-toggle="modal" class="config"></a>
              <a href="javascript:;" class="reload"></a>
              <a href="javascript:;" class="remove"></a>
            </div>
          </div>
          <div class="grid-body no-border">
            <!-- BEGIN CONTENT TITLE -->
            <h3>
              <span class>{{bill.month}}</span>
            </h3>
            <!-- END CONTENT TITLE -->
            <table class="table no-more-tables">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Base</th>
                  <th v-for="column in columns">
                    <span>{{column | trunc}}</span>
                  </th>
                  <th>Adjusted</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(userBill, user) in bill.users">
                  <td class="v-align-middle">{{user}}</td>
                  <td class="v-align-middle">
                    <span class="muted">{{bill.monthBase}}</span>
                  </td>
                  <td class="v-align-middle" v-for="column in columns">
                    <span class="muted">{{userBill[column]}}</span>
                  </td>
                  <td class="v-align-middle"></td>
                </tr>
                <tr>
                  <td class="v-align-middle">Plan Charge</td>
                  <td class="v-align-middle">
                    <span class="muted">{{bill.planCharge}}</span>
                  </td>
                  <td class="v-align-middle" v-for="column in columns">
                    <span class="muted"></span>
                  </td>
                  <td class="v-align-middle">{{bill.monthTotal}}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>

<script>
import Search from "../../mixins/search.vue";
import Indicator from "../../mixins/indicator.vue";
export default {
  props: ["bill"],
  data: function() {
    return {
      columns: {}
    };
  },
  mixins: [Search, Indicator],
  filters: {
    trunc: function(value) {
      const maxLen = 8;
      return value.length > maxLen
        ? value.substr(0, maxLen - 1) + "..."
        : value;
    }
  },
  methods: {
    createColumns() {
      let columns = new Set();

      for (let username in this.bill.users) {
        Object.keys(this.bill.users[username]).forEach(column => {
          columns.add(column);
        });
      }

      this.columns = Array.from(columns);
    }
  },
  mounted() {
    this.createColumns();
  }
};
</script>