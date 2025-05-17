import { FormEvent, useState } from "react";
import { TTodo } from "../types/todo";

const Todo = (): Element => {
  const [todos, setTodos] = useState<TTodo[]>([]);
  const [doneTodos, setdoneTodos] = useState<TTodo[]>([]);
  const [input, setInput] = useState<string>("");

  console.log("Input", input);

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log("동작함");
    const text = input.trim();
    if (text) {
      const newTodo: TTodo = { id: Date.now(), text };
      setTodos((prevTodos): TTodo[] => [...prevTodos, newTodo]);
      setInput("");
    }
  };

  const completeTodo = (todo: TTodo): void => {
    setTodos((prevTodos): TTodo[] =>
      prevTodos.filter((t): boolean => t.id !== todo.id)
    );
    setdoneTodos((prevDoneTodos): TTodo[] => [...prevDoneTodos, todo]);
  };

  const deleteTodo = (todo: TTodo): void => {
    setdoneTodos((prevDoneTodos): TTodo[] =>
      prevDoneTodos.filter((td): boolean => td.id !== todo.id)
    );
  };
  return (
    <div className="todo-container">
      <h1 className="todo-container_header">KRONG TODO</h1>
      <form onSubmit={handleSubmit} className="todo-container_form">
        <input
          value={input}
          onChange={(e): void => setInput(e.target.value)}
          type="text"
          className="todo-container_input"
          placeholder="할 일 입력"
          autoFocus
          required
        />
        <button type="submit" className="todo-container_button">
          할 일 추가
        </button>
      </form>
      <div className="render-container">
        <div className="render-container_section">
          <h2 className="render-container_title">할 일</h2>
          <ul className="render-container_list">
            {todos.map((todo) => (
              <li key={todo.id} className="render-container_item">
                <span className="render-container_text">{todo.text}</span>
                <button
                  onClick={(): void => completeTodo(todo)}
                  className="render-container_button"
                  style={{ backgroundColor: "rgb(1, 147, 1)" }}
                >
                  완료
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="render-container_section">
          <h2 className="render-container_title">완료</h2>
          <ul className="render-container_list">
            {doneTodos.map((todo) => (
              <li key={todo.id} className="render-container_item">
                <span className="render-container_text">{todo.text}</span>
                <button
                  className="render-container_button"
                  onClick={(): void => deleteTodo(todo)}
                >
                  삭제
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Todo;
