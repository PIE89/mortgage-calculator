import priceFormatter from "../utils/priceFormatter.js";

export class ResultsView {
  constructor(results) {
    const settings = {
      numeral: true,
      numeralThousandsGroupStyle: "thousand",
      delimiter: " ",
    };

    let { rate, monthPayment, totalAmount, overPayment } = results;
    this.elements.totalPercent.textContent = rate * 100 + " %";
    this.elements.monthPayment.textContent = priceFormatter(monthPayment);
    this.elements.totalCost.textContent = priceFormatter(totalAmount);
    this.elements.totalOverpayment.textContent = priceFormatter(overPayment);
  }

  elements = {
    totalPercent: document.querySelector("#total-percent"),
    monthPayment: document.querySelector("#total-month-payment"),
    totalCost: document.querySelector("#total-cost"),
    totalOverpayment: document.querySelector("#total-overpayment"),
  };
}
