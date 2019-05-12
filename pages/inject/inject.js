// bill will be save in the following structure
monthlyBill = {
  month: "",
  planCharge: 0,
  users: {}
}

/********** CUSTOM CODE BEGIN **********/

// ATT may change how the web page is organized, hence
// need continuously support new page format.

SelectorAPIv1 = {
  wirelessBill: "[ddh-wireless-bill-details]",
  wirelessBillPerPerson: ".accord-content-block.ng-scope",
  name: "[role] > div",
  row: " [role]",
  column: ":scope > div"
}

SelectorAPIv2 = {
  wirelessBill: "#printfas1",
  wirelessBillPerPerson: ":scope > [ng-repeat]",
  name: ".row .pull-left > span",
  row: " .row",
  column: ":scope > span"
}

ParserAPIv1 = {
  maxUsers: 30,
  chargeTitles: [
    "[monthly-charges-title]",
    "[purchase-lexi-content]",
    "[sur-charges-title]",
    "[tax-charges-title]",
    "[activity-since-wireless-charges]"
  ],
  parse(html, selectorApi) {
    html.querySelector(selectorApi.wirelessBill)
      .querySelectorAll(selectorApi.wirelessBillPerPerson)
      .forEach(fullBill => {
        let isMonthlyTotal = (monthlyBill.planCharge === 0)
        for (let i = 0; i < this.chargeTitles.length; i++) {
          const name = fullBill.querySelector(selectorApi.name).innerText

          const monthlySummary = fullBill.querySelector(this.chargeTitles[i] + selectorApi.row)
          if (monthlySummary === null) continue;

          const chargeTitle = monthlySummary.querySelector(selectorApi.column).innerText
          const chargeFee = monthlySummary.querySelector(selectorApi.column).nextElementSibling.innerText
          console.log(name + ": " + chargeTitle + " - " + chargeFee)

          if (isMonthlyTotal) {
            monthlyBill.month = chargeTitle
            monthlyBill.planCharge = chargeFee
            isMonthlyTotal = false
          } else {
            if (monthlyBill.users[name] == null)
              monthlyBill.users[name] = {}
            monthlyBill.users[name][chargeTitle] = chargeFee
          }
        }
      })
  }
}

try {
  console.log("Try ParserAPIv1 + SelectorAPIv2")
  ParserAPIv1.parse(document, SelectorAPIv2)
} catch {
  console.log("Try ParserAPIv1 + SelectorAPIv1")
  ParserAPIv1.parse(document, SelectorAPIv1)
}

/********** CUSTOM CODE END **********/

monthlyBill