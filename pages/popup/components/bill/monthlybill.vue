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
              Recent
              <span class="semi-bold">Bill</span>
            </h3>
            <p>{{result.month}}</p>
            <br>
            <!-- END CONTENT TITLE -->
            <table class="table no-more-tables">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Base</th>
                  <th v-for="column in columns">
                    <span>{{column | trunc}}</span>
                  </th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(userBill, user) in result.users">
                  <td class="v-align-middle">{{user}}</td>
                  <td class="v-align-middle">
                    <span class="muted">{{result.monthBase}}</span>
                  </td>
                  <td class="v-align-middle" v-for="column in columns">
                    <span class="muted">{{userBill[column]}}</span>
                  </td>
                  <td class="v-align-middle">{{userBill.total}}</td>
                </tr>
                <tr>
                  <td class="v-align-middle">Plan Charge</td>
                  <td class="v-align-middle">
                    <span class="muted">{{result.planCharge}}</span>
                  </td>
                  <td class="v-align-middle" v-for="column in columns">
                    <span class="muted"></span>
                  </td>
                  <td class="v-align-middle">{{result.monthTotal}}</td>
                </tr>
              </tbody>
            </table>
            <button type="button" class="btn btn-success btn-cons pull-right">
              <i class="fa fa-cloud-upload"></i>
              <span class="bold">Upload</span>
            </button>
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
import { app } from "src/app/app.js";
export default {
  data: function() {
    return {
      result: {},
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
    readBill() {
      chrome.tabs.executeScript(
        {
          file: "js/inject.js"
        },
        results => {
          this.result = results[0];
          this.createColumns();
          this.calcMonthBase();
          this.calcTotals();
        }
      );
    },
    createColumns() {
      let columns = new Set();

      for (let username in this.result.users) {
        Object.keys(this.result.users[username]).forEach(column => {
          columns.add(column);
        });
      }

      this.columns = columns;
    },
    calcTotals() {
      let monthTotal = Number(this.result.planCharge.replace(/[^0-9.-]+/g, ""));
      for (let username in this.result.users) {
        let userTotal = 0;

        Object.keys(this.result.users[username]).forEach(chargeItem => {
          const chargeAmount = this.result.users[username][chargeItem];
          userTotal += Number(chargeAmount.replace(/[^0-9.-]+/g, ""));
        });

        this.result.users[username].total = `$${userTotal.toFixed(2)}`;
        monthTotal += userTotal;
      }
      this.result.monthTotal = `$${monthTotal.toFixed(2)}`;
    },
    calcMonthBase() {
      this.result.monthBase =
        Number(this.result.planCharge.replace(/[^0-9.-]+/g, "")) /
        Object.keys(this.result.users).length;
      this.result.monthBase = `$${this.result.monthBase.toFixed(2)}`;
    }
  },
  mounted() {
    this.readBill();
  }
};
</script>