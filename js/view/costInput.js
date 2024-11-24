import updateModel from "../utils/updateModel.js";

export class CostInput {
  constructor(data) {
    const settings = {
      numeral: true,
      numeralThousandsGroupStyle: "thousand",
      delimiter: " ",
    };
    // инициализация библиотеки CLEAVE JS
    const cleaveInput = new Cleave(this.elements.inputCost, settings);

    //заносим значение COST (из modal)
    cleaveInput.setRawValue(data.cost);

    //вешаем прослушку на изменение
    this.elements.inputCost.addEventListener("input", function () {
      const value = +cleaveInput.getRawValue();

      // находим родителя данного инпута
      let parent = this.closest(".param__details");

      // вешаем или убираем красную рамку в зависимости от изменения стоимости
      if (value < data.minPrice || value > data.maxPrice) {
        parent.classList.add("param__details--error");
      } else if (value >= data.minPrice || value <= data.maxPrice) {
        parent.classList.remove("param__details--error");
      }

      // обновляем модель с новыми данными cost
      updateModel(this, {
        cost: +cleaveInput.getRawValue(),
        onUpdate: "inputCost",
      });
    });

    // вешаем прослушку на событие change!!
    this.elements.inputCost.addEventListener("change", function () {
      const value = +cleaveInput.getRawValue();
      let parent = this.closest(".param__details");

      if (value < data.minPrice) {
        parent.classList.remove("param__details--error");
        cleaveInput.setRawValue(data.minPrice);
      } else if (value > data.maxPrice) {
        parent.classList.remove("param__details--error");
        cleaveInput.setRawValue(data.maxPrice);
      }

      // обновляем модель с новыми данными cost
      updateModel(this, {
        cost: +cleaveInput.getRawValue(),
        onUpdate: "inputCost",
      });
    });

    // возвращаем для дальнейшего обновления
    return cleaveInput;
  }

  elements = {
    inputCost: document.querySelector("#input-cost"),
  };
}
