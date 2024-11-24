import { Model } from "./model.js";
import priceFormatter from "./utils/priceFormatter.js";
import { CostInput } from "./view/costInput.js";
import { CostRange } from "./view/costRange.js";
import { FirstPaymentInput } from "./view/firstPaymentInput.js";
import { FirstPaymentRange } from "./view/firstPaymentRange.js";
import { RadioPrograms } from "./view/radioPrograms.js";
import { ResultsView } from "./view/resultsView.js";
import { TimeInput } from "./view/timeInput.js";
import { TimeRange } from "./view/timeRange.js";

let model = new Model();

new RadioPrograms().render(model.getData());

let cleaveInput = new CostInput(model.getData());

let sliderCost = new CostRange(model.getData());

let firstPaymentCost = new FirstPaymentInput(model);

let firstPaymentRange = new FirstPaymentRange(model);

let timeInput = new TimeInput(model.getData());

let timeCost = new TimeRange(model.getData());

document.addEventListener("updateForm", (e) => {
  model.setData(e.detail);

  let data = model.getData();
  let results = model.getResults();

  // обновление формы
  updateFormAndSliders(data);

  // обновляем поле результата
  new ResultsView(results);
});

function updateFormAndSliders(data) {
  //timeCost
  if (data.onUpdate !== "termRange") {
    timeCost.noUiSlider.set(data.term);
  }

  //timeInput
  if (data.onUpdate !== "inputTerm") {
    timeInput.setRawValue(data.term);
  }

  //firstPaymentRange
  if (data.onUpdate !== "firstPaymentRange") {
    firstPaymentRange.noUiSlider.set(data.firstPaymentPercent * 100);
  }

  //firstPaymentInput
  if (data.onUpdate !== "firstPaymentInput") {
    firstPaymentCost.setRawValue(data.firstPayment);
  }

  //minLimit for first Payment
  if (data.onUpdate === "radioProgram") {
    document.querySelector("#percents-from").innerHTML =
      data.minPaymentPercents * 100 + " %";

    firstPaymentRange.noUiSlider.updateOptions({
      range: {
        min: data.minPaymentPercents * 100,
        max: data.maxPaymentPercents * 100,
      },
    });
  }
  //costInput
  if (data.onUpdate !== "inputCost") {
    cleaveInput.setRawValue(data.cost);
  }

  // costRange
  if (data.onUpdate !== "costRange") {
    sliderCost.noUiSlider.set(data.cost);
  }
}

// Order Form
const openFormBtn = document.querySelector("#openFormBtn");
const orderForm = document.querySelector("#orderForm");
const submitFormBtn = document.querySelector("#submitFormBtn");
const success = document.querySelector("#success");
const errorForm = document.querySelector("#error");

openFormBtn.addEventListener("click", function () {
  if (Object.keys(model.results).length === 0) {
    return;
  } else {
    orderForm.classList.remove("none");
    openFormBtn.classList.add("none");

    orderForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const formData = new FormData(orderForm);

      // disabled кнопки отправки формы

      submitFormBtn.setAttribute("disabled", true);
      submitFormBtn.textContent = "Заявка отправляется...";

      // disabled inputs
      orderForm
        .querySelectorAll("input")
        .forEach((input) => input.setAttribute("disabled", true));

      let templateParams = {
        project: "mortgage-calculator",
        email_from: formData.get("email"),
        name: formData.get("name"),
        phone: formData.get("phone"),
        rate: model.getResults().rate * 100 + " %",
        monthPayment: priceFormatter(model.getResults().monthPayment),
        totalAmount: priceFormatter(model.getResults().totalAmount),
        overPayment: priceFormatter(model.getResults().overPayment),
      };

      emailjs.send("service_ndyd9nf", "template_85xuboe", templateParams).then(
        () => {
          console.log("SUCCESS!");
          orderForm.classList.add("none");
          success.classList.remove("none");
        },
        (error) => {
          console.log(error);
          orderForm.classList.add("none");
          errorForm.classList.remove("none");
        }
      );
    });
  }
});
