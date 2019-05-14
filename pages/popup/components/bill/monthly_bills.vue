<template>
  <div>
    <monthly-bill v-for="bill in bills" :bill="bill"></monthly-bill>
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
      bills: app.bills.data
    };
  },
  methods: {
    readBills() {
      chrome.tabs.executeScript(
        {
          file: "js/inject.js"
        },
        results => {
          let bill = results[0];
          if (bill) {
            this.calcMonthBase(bill);
            this.calcTotals(bill);
            this.saveBill(bill);
          }
        }
      );
    },
    // Calculate monthly plan base for each user
    calcMonthBase(bill) {
      const monthBase =
        this.toNumber(bill.planCharge) / Object.keys(bill.users).length;
      bill.monthBase = `$${monthBase.toFixed(2)}`;
    },
    // Calculate the total amount user should pay
    calcTotals(bill) {
      let monthTotal = 0;
      for (let username in bill.users) {
        let userTotal = this.toNumber(bill.monthBase);

        Object.keys(bill.users[username]).forEach(chargeItem => {
          const chargeAmount = bill.users[username][chargeItem];
          userTotal += this.toNumber(chargeAmount);
        });

        bill.users[username]["Total"] = `$${userTotal.toFixed(2)}`;
        monthTotal += userTotal;
      }
      bill.month = bill.month.replace("Monthly plan charges for ", "");
      bill.monthTotal = `$${monthTotal.toFixed(2)}`;
    },
    saveBill(bill) {
      this.bills[bill.month] = bill;
      app.bills.save();
    },
    toNumber(currenty) {
      return Number(currenty.replace(/[^0-9.-]+/g, ""));
    }
  },
  mounted() {
    this.readBills();
  }
};
</script>