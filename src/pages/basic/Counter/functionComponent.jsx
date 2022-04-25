import { useState, useEffect } from "react";

function App() {
  //  const name = "Bagus";
  const [count, setCount] = useState(0);
  const [name, setName] = useState("Bagus");
  //  index 0 = digunakan untuk pemanggilan nilai di jsx / fungsi
  //  index 1 = digunakan untuk memanipulasi nilai

  // Component Did Mount
  useEffect(() => {
    console.log("COMPONENT DID MOUNT IS RUNNING");
  }, []);

  // Component Did Update
  useEffect(() => {
    console.log("COMPONENT DID UPDATE IS RUNNING");
  }, [count, name]);

  //   Component Will Un Mount
  useEffect(() => {
    return () => {
      console.log("COMPONENT WILL UNMOUNT IS RUNNING");
    };
  }, []);

  const increaseCounter = () => {
    console.log("Increase Counter");
    setCount(count + 1);
    setName(count < 3 ? name + " Tri" : name);
  };

  const decreaseCounter = () => {
    console.log("Decrease Counter");
    setCount(count - 1);
  };

  const resetCounter = () => {
    console.log("Reset Counter");
    setCount(0);
  };

  console.log("JSX IS RUNNING");
  return (
    <div>
      <h1>Hello {name}</h1>
      <h1>{count}</h1>
      <button onClick={decreaseCounter}>-</button>
      <button onClick={resetCounter}>reset</button>
      <button onClick={increaseCounter}>+</button>
    </div>
  );
}

export default App;
