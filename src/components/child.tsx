import { Dispatch, useEffect, useState } from "react";

type Props = {
  array: Array<unknown>;
  setArray: Dispatch<React.SetStateAction<unknown>>;
};

function Child({ array, setArray }: Props) {
  console.log("child render");
  const [count, setCount] = useState(0);
  count;

  useEffect(() => {
    console.log("array in child", array);
  }, [array]);

  const addToPromiseArray = () => {
    setCount((oldValue) => oldValue + 1);

    // Function that returns a promise when executed. This is done because fetching is eager when handled inside a new Promise constructor.
    const newPromise = () =>
      // new Promise created to fetch an API.
      new Promise((resolve, reject) => {
        fetch("https://picsum.photos/200/300")
          .then((response) => {
            if (response.ok) {
              resolve(response); // Resolving the Promise with the response
            } else {
              reject("Error fetching data"); // Reject the Promise in case of an error
            }
          })
          .catch((error) => {
            reject(error); // Reject the Promise in case of an error
          });
      });

    // Push the new Promise to the promises array to execute them in the parent component.
    setArray((oldValue) => [
      ...oldValue,
      newPromise, // Adding the resolved promise to the array
    ]);
  };

  return (
    <>
      <div>Hello Child</div>
      <button onClick={addToPromiseArray}>Push to array</button>
    </>
  );
}

export default Child;
