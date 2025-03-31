// import "./App.css";
// // import List from "./components/List.tsx";
// import { useState } from "react";

// function App() {
//   const [count, setCount] = useState(0);

//   const decreaseNum = (): void => {
//     setCount((prev): number => prev - 1);
//   };

//   const increaseNum = (): void => {
//     setCount((prev): number => prev + 1);
//   };

//   return (
//     <>
//       <h3>{count}</h3>
//       <button onClick={decreaseNum}>-1</button>
//       <button onClick={increaseNum}>+1</button>
//     </>
//   );
// }

// export default App;

// import { useState } from "react";
// import ButtonGroup from "./components/ButtonGroup.tsx";

// function App() {
//   const [count, setCount] = useState(0);
//   const handleIncrement = () => {
//     setCount(count + 1);
//   };

//   const handleDecrement = () => {
//     setCount(count - 1);
//   };

//   return (
//     <>
//       <h1>{count}</h1>
//       <ButtonGroup
//         handleIncrement={handleIncrement}
//         handleDecrement={handleDecrement}
//       />
//     </>
//   );
// }

// export default App;

import ButtonGroup from "./components/ButtonGroup";
import { useCount } from "./context/CounterProvider";

function App() {
  // const context = useContext(CounterContext);
  const { count } = useCount();

  return (
    <>
      <h1>{count}</h1>
      <ButtonGroup />
    </>
  );
}

export default App;
