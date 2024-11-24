import updateModel from "../utils/updateModel.js";

export class TimeInput {
  constructor(data) {
    const settings = {
      numeral: true,
      numeralThousandsGroupStyle: "thousand",
      delimiter: " ",
    };
    // инициализация библиотеки CLEAVE JS
    const cleaveInput = new Cleave(this.elements.inputTerm, settings);

    //заносим значение COST (из modal)
    cleaveInput.setRawValue(data.term);

    //вешаем прослушку на изменение
    this.elements.inputTerm.addEventListener("input", function () {
      const value = +cleaveInput.getRawValue();

      // находим родителя данного инпута
      let parent = this.closest(".param__details");

      // вешаем или убираем красную рамку в зависимости от изменения стоимости
      if (value < data.minTerm || value > data.maxTerm) {
        parent.classList.add("param__details--error");
      } else if (value >= data.minTerm || value <= data.maxTerm) {
        parent.classList.remove("param__details--error");
      }

      // обновляем модель с новыми данными term
      updateModel(this, {
        term: +cleaveInput.getRawValue(),
        onUpdate: "inputTerm",
      });
    });

    // вешаем прослушку на событие change!!
    this.elements.inputTerm.addEventListener("change", function () {
      const value = +cleaveInput.getRawValue();
      let parent = this.closest(".param__details");

      if (value < data.minTerm) {
        parent.classList.remove("param__details--error");
        cleaveInput.setRawValue(data.minTerm);
      } else if (value > data.maxTerm) {
        parent.classList.remove("param__details--error");
        cleaveInput.setRawValue(data.maxTerm);
      }

      // обновляем модель с новыми данными term
      updateModel(this, {
        term: +cleaveInput.getRawValue(),
        onUpdate: "inputTerm",
      });
    });

    // возвращаем для дальнейшего обновления
    return cleaveInput;
  }

  elements = {
    inputTerm: document.querySelector("#input-term"),
  };
}
