import updateModel from "../utils/updateModel.js";

export class FirstPaymentRange {
  constructor(data) {
    // инициализация слайдера
    noUiSlider.create(this.element.sliderFirstPaymentPercent, {
      start: data.getData().firstPaymentPercent * 100,
      connect: "lower",
      tooltips: true,
      step: 1,
      range: {
        min: data.getData().minPaymentPercents * 100,
        max: data.getData().maxPaymentPercents * 100,
      },
      format: wNumb({
        decimals: 0,
        thousand: " ",
        suffix: "",
      }),
    });

    // изменения слайдера
    this.element.sliderFirstPaymentPercent.noUiSlider.on("slide", function () {
      updateModel(this.target, {
        firstPaymentPercent: Number(this.get().split(" ").join("")),
        onUpdate: "firstPaymentRange",
      });
    });

    // возвращаем для дальнейшего обновления
    return this.element.sliderFirstPaymentPercent;
  }

  element = {
    sliderFirstPaymentPercent: document.querySelector("#slider-downpayment"),
  };
}
