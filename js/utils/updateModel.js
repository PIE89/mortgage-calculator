export default function updateModel(element, data) {
  element.dispatchEvent(
    new CustomEvent("updateForm", {
      bubbles: true,
      detail: {...data},
    })
  );
}


