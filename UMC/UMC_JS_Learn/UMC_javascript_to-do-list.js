let InputBox = document.querySelector("input");
let doList = document.querySelector(".do_list");
let doneList = document.querySelector(".done_list");

InputBox.addEventListener("compositionend", function (event) {
  console.log(InputBox.value);
});

InputBox.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    if (event.isComposing) return; // 한글 중복 입력 문제 해결
    event.preventDefault(); // submit 문제 해결

    let li = document.createElement("li");
    li.setAttribute("class", "do_item");
    li.textContent = InputBox.value;

    let btn = document.createElement("button");
    btn.setAttribute("class", "contain-btn");
    btn.textContent = "완료";

    li.appendChild(btn);
    doList.appendChild(li);

    InputBox.value = "";
  }
});

doList.addEventListener("click", function (event) {
  if (event.target.classList.contains("contain-btn")) {
    let li = event.target.parentNode;
    li.removeChild(event.target);

    let btn2 = document.createElement("button");
    btn2.setAttribute("class", "remove-btn");
    btn2.textContent = "삭제";

    li.appendChild(btn2);
    doneList.appendChild(li);
  }
});

doneList.addEventListener("click", function (event) {
  if (event.target.classList.contains("remove-btn")) {
    event.target.parentNode.remove();
  }
});
