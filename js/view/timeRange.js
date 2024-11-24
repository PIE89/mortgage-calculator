import updateModel from "../utils/updateModel.js";

export class TimeRange {
  constructor(data) {
    // инициализация слайдера
    noUiSlider.create(this.element.sliderTerm, {
      start: data.term,
      connect: "lower",
      tooltips: true,
      step: 1,
      range: {
        min: data.minTerm,
        max: data.maxTerm,
      },
      format: wNumb({
        decimals: 0,
        thousand: " ",
        suffix: "",
      }),
    });

    // изменения слайдера
    this.element.sliderTerm.noUiSlider.on("slide", function () {
      updateModel(this.target, {
        term: Number(this.get().split(" ").join("")),
        onUpdate: "termRange",
      });
    });

    // возвращаем для дальнейшего обновления
    return this.element.sliderTerm;
  }

  element = {
    sliderTerm: document.querySelector("#slider-term"),
  };
}
