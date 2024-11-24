import updateModel from "../utils/updateModel.js";

export class FirstPaymentInput {
  constructor(model) {
    const settings = {
      numeral: true,
      numeralThousandsGroupStyle: "thousand",
      delimiter: " ",
    };

    // инициализация библиотеки CLEAVE JS
    const cleaveInput = new Cleave(this.elements.inputFirstPayment, settings);

    //заносим значение COST (из modal)
    cleaveInput.setRawValue(model.getData().firstPayment);

    //вешаем прослушку на изменение
    this.elements.inputFirstPayment.addEventListener("input", function () {
      const value = +cleaveInput.getRawValue();
      // находим родителя данного инпута
      let parent = this.closest(".param__details");

      // вешаем или убираем красную рамку в зависимости от изменения стоимости
      if (
        value < model.getData().getMinPayment() ||
        value > model.getData().getMaxPayment()
      ) {
        parent.classList.add("param__details--error");
      } else if (
        value >= model.getData().getMinPayment() ||
        value <= model.getData().getMaxPayment()
      ) {
        parent.classList.remove("param__details--error");
      }

      // обновляем модель с новыми данными firstPayment
      updateModel(this, {
        firstPayment: +cleaveInput.getRawValue(),
        onUpdate: "firstPaymentInput",
      });
    });

    // вешаем прослушку на событие change!!
    this.elements.inputFirstPayment.addEventListener("change", function () {
      const value = +cleaveInput.getRawValue();
      let parent = this.closest(".param__details");

      if (value < model.getData().getMinPayment()) {
        parent.classList.remove("param__details--error");
        cleaveInput.setRawValue(model.getData().getMinPayment());
      } else if (value > model.getData().getMaxPayment()) {
        parent.classList.remove("param__details--error");
        cleaveInput.setRawValue(model.getData().getMaxPayment());
      }

      // обновляем модель с новыми данными cost
      updateModel(this, {
        firstPayment: +cleaveInput.getRawValue(),
        onUpdate: "firstPaymentInput",
      });
    });

    // возвращаем для дальнейшего обновления
    return cleaveInput;
  }

  elements = {
    inputFirstPayment: document.querySelector("#input-downpayment"),
  };
}
