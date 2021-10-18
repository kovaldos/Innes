// Добавляем эффект нажатия на кастомный чекбокс
const customRadio = document.querySelectorAll(".custom-radio");
if (customRadio.length) {
  customRadio.forEach(item => {
    const chbox = item.querySelector("input");
    chbox.addEventListener("change", () => {
      if (chbox.checked) {
        item.classList.add("checked");
        // uncheckOther();
      } else {
        item.classList.remove("checked");
      }
    });
  });
}

// const uncheckOther = function () {
//   const checkboxes = document.querySelectorAll(".custom-radio input[type='checkbox']");
//   if(checkboxes.length) {
//     checkboxes.forEach(checkbox => {
//       checkbox.addEventListener("click", (e) => {
//       })
//     })
//   }
// };

// uncheckOther();

// Переворачиваем стрелочки на селектах
const selectWrappers = document.querySelectorAll(".select-wrapper");
if (selectWrappers.length) {
  selectWrappers.forEach((selectWrapper) => {
    selectWrapper.addEventListener("click", () => {
      selectWrapper.classList.toggle("icon-rotated");
      // setTimeout(() => {
      //   if (selectWrapper.classList.contains("icon-rotated")) {
      //     selectWrapper.classList.remove("icon-rotated");
      //   }
      // }, 5000);
    });
  });
}
