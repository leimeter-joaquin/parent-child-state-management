import { useEffect, useState } from "react";
import Child from "./child";

function Parent() {
  console.log("parent render");
  const [array, setArray] = useState<Array<() => Promise<unknown>>>([]);

  useEffect(() => {
    console.log("array in parent", array);
  }, [array]);

  const runPromises = () => {
    // Invoke each function to get the promise
    const promises = array.map((func) => func());

    // Execute the all promises concurrently
    Promise.all(promises)
      .then((values) => {
        console.log(values);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <div>Hello Parent</div>
      <Child array={array} setArray={setArray} />
      <button onClick={runPromises}>Run promises</button>
    </>
  );
}

export default Parent;
