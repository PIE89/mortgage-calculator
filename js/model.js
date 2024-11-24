export class Model {
  data = {
    selectedProgram: 0.1,
    programs: {
      base: 0.1,
      it: 0.047,
      gov: 0.067,
      zero: 0.12,
    },

    cost: 10000000,
    firstPayment: 6000000,
    firstPaymentPercent: 0.5,
    getMinPayment: function () {
      return this.cost * this.minPaymentPercents;
    },
    getMaxPayment: function () {
      return this.cost * this.maxPaymentPercents;
    },
    minPrice: 375000,
    maxPrice: 100000000,
    minPaymentPercents: 0.15,
    maxPaymentPercents: 0.9,
    minTerm: 1,
    maxTerm: 30,
    term: 5,
  };

  results = {
    // rate: this.data.selectedProgram,
  };

  getData() {
    return { ...this.data };
  }

  getResults() {
    return { ...this.results };
  }

  setData(newData) {
    // записываем изменение ставки если выбираем "Без первоначального взноса"
    if (newData.onUpdate === "radioProgram") {
      if (newData.id === "zero-value") {
        this.data.minPaymentPercents = 0;
      } else {
        this.data.minPaymentPercents = 0.15;
      }
    }

    if (newData.onUpdate === "inputCost" || newData.onUpdate === "costRange") {
      if (newData.cost < this.data.minPrice) {
        newData.cost = this.data.minPrice;
      }
      if (newData.cost > this.data.maxPrice) {
        newData.cost = this.data.maxPrice;
      }

      if (
        this.data.firstPayment >=
        newData.cost * this.data.maxPaymentPercents
      ) {
        this.data.firstPayment = newData.cost * this.data.maxPaymentPercents;
        this.data.firstPaymentPercent = this.data.maxPaymentPercents;
      }
      if (
        this.data.firstPayment <
        newData.cost * this.data.minPaymentPercents
      ) {
        this.data.firstPayment = newData.cost * this.data.minPaymentPercents;
        this.data.firstPaymentPercent = this.data.minPaymentPercents;
      }

      this.data.firstPaymentPercent = +(
        this.data.firstPayment / newData.cost
      ).toFixed(2);
    }

    if (newData.onUpdate === "firstPaymentInput") {
      if (newData.firstPayment < this.data.getMinPayment()) {
        newData.firstPayment = this.data.getMinPayment();
      }

      if (newData.firstPayment > this.data.getMaxPayment()) {
        newData.firstPayment = this.data.getMaxPayment();
      }

      this.data.firstPaymentPercent = +(
        newData.firstPayment / this.data.cost
      ).toFixed(2);
    }

    if (newData.onUpdate === "firstPaymentRange") {
      this.data.firstPayment = Math.round(
        this.data.cost * (newData.firstPaymentPercent / 100)
      );

      newData.firstPaymentPercent = newData.firstPaymentPercent / 100;
    }

    if (newData.onUpdate === "inputTerm") {
      if (newData.term > this.data.maxTerm) {
        newData.term = this.data.maxTerm;
      }
      if (newData.term < this.data.minTerm) {
        newData.term = this.data.minTerm;
      }
    }

    this.data = {
      ...this.data,
      ...newData,
    };

    // расчет ипотеки
    const month = this.data.term * 12;
    const totalAmount = this.data.cost - this.data.firstPayment;
    const monthRate = this.data.selectedProgram / 12;
    const generalRate = (1 + monthRate) ** month;
    const monthPayment =
      (totalAmount * monthRate * generalRate) / (generalRate - 1);

    const overPayment = monthPayment * month - totalAmount;

    this.results = {
      rate: this.data.selectedProgram,
      monthPayment,
      totalAmount,
      overPayment,
    };
  }
}
