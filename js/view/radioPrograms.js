import updateModel from "../utils/updateModel.js";

export class RadioPrograms {
  elements = {
    baseRadio: document.querySelector("#base-value"),
    itRadio: document.querySelector("#it-value"),
    govRadio: document.querySelector("#gov-value"),
    zeroRadio: document.querySelector("#zero-value"),

    baseText: document.querySelector("#base-text"),
    itText: document.querySelector("#it-text"),
    govText: document.querySelector("#gov-text"),
    zeroText: document.querySelector("#zero-text"),

    radioBtns: document.querySelectorAll("[name=program]"),
  };

  render(data) {
    const { base, it, gov, zero } = data.programs;

    this.elements.baseRadio.value = base;
    this.elements.itRadio.value = it;
    this.elements.govRadio.value = gov;
    this.elements.zeroRadio.value = zero;

    this.elements.baseText.textContent = base * 100 + "%";
    this.elements.itText.textContent = it * 100 + "%";
    this.elements.govText.textContent = gov * 100 + "%";
    this.elements.zeroText.textContent = zero * 100 + "%";

    this.elements.radioBtns.forEach((btn) => {
      btn.addEventListener("change", function () {
        updateModel(this, {
          selectedProgram: parseFloat(this.value),
          onUpdate: "radioProgram",
          id: this.id,
        });
      });
    });
  }
}
