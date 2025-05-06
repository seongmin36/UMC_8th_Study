"use strict";
// Html 요소 선택
const inputBox = document.querySelector("input");
const todoForm = document.querySelector("#todo_form");
const doList = document.querySelector(".do_list");
const doneList = document.querySelector(".done_list");
let todos = [];
let doneTasks = [];
// 할 일 렌더링 하는 함수를 정의
const renderTasks = () => {
    doList.innerHTML = "";
    doneList.innerHTML = ""; // html요소 초기화
    todos.forEach((todo) => {
        const li = createTodoElement(todo, false);
        doList.appendChild(li);
    });
    doneTasks.forEach((todo) => {
        const li = createTodoElement(todo, true);
        doneList.appendChild(li);
    });
};
// 할 일 텍스트 입력 처리 함수. (공백 자르기)
const noEmpty = () => {
    return inputBox.value.trim();
};
// 할 일 추가 함수
const addTodo = (text) => {
    todos.push({ id: Date.now(), text });
    inputBox.value = "";
    renderTasks();
};
// 할 일 상태 변경
const compleTodo = (todo) => {
    todos = todos.filter((t) => t.id !== todo.id);
    doneTasks.push(todo);
    renderTasks();
};
// 완료된 할 일 삭제 함수
const deleteTodo = (todo) => {
    doneTasks = doneTasks.filter((t) => t.id !== todo.id);
    renderTasks();
};
// 할 일 아이템 생성 함수 (완료 여부에 따라 버튼 텍스트나 색상 설정)
const createTodoElement = (todo, isDone) => {
    const li = document.createElement("li");
    li.textContent = todo.text;
    li.setAttribute("id", "do_list");
    // doList.appendChild(li);
    li.classList.add("do_list");
    const button = document.createElement("button");
    button.classList.add("comple_button");
    button.setAttribute("id", "done_list");
    if (isDone) {
        button.textContent = "삭제";
        button.style.backgroundColor = "#dc3545";
    }
    else {
        button.textContent = "완료";
        button.style.backgroundColor = "#28a745";
    }
    button.addEventListener("click", () => {
        if (isDone) {
            deleteTodo(todo);
        }
        else {
            compleTodo(todo);
        }
    });
    li.appendChild(button);
    return li;
};
// 폼 제출 이벤트 리스너
todoForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const text = noEmpty();
    if (text) {
        addTodo(text);
    }
});
renderTasks();
