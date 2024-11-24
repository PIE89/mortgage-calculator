import updateModel from "../utils/updateModel.js";

export class CostRange {
  constructor(data) {
    // инициализация слайдера
    noUiSlider.create(this.element.sliderCost, {
      start: data.cost,
      connect: "lower",
      tooltips: true,
      step: 100000,
      range: {
        min: data.minPrice,
        "1%": [400000, 100000],
        "50%": [10000000, 500000],
        max: data.maxPrice,
      },
      format: wNumb({
        decimals: 0,
        thousand: " ",
        suffix: "",
      }),
    });

    // изменения слайдера
    this.element.sliderCost.noUiSlider.on("slide", function () {
      updateModel(this.target, {
        cost: Number(this.get().split(" ").join("")),
        onUpdate: "costRange",
      });
    });

    // возвращаем для дальнейшего обновления
    return this.element.sliderCost;
  }

  element = {
    sliderCost: document.querySelector("#slider-cost"),
  };
}
