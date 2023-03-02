import { useCallback, useEffect, useState } from 'react';

function App() {
  const [count, setCount] = useState(0);
  const [result, setResult] = useState('');
  const [disableButton, setDisableButton] = useState(false);

  const increment = () => {
    if (!disableButton) setCount(count + 1);
  };

  const apiRequest = useCallback(async (): Promise<string> => {
    const API_URL = process.env.REACT_APP_API_URL;

    setDisableButton(true);

    const response = await fetch(`${API_URL}/fizzbuzz/${count}`, {
      method: 'GET',
      // cors headers,
    });

    setDisableButton(false);

    if (response.status === 200) {
      const { result } = await response.json();
      return result;
    } else {
      throw new Error(`Request failed with status code ${response.status}`);
    }
  }, [count]);

  useEffect(() => {
    apiRequest()
      .then((data) => {
        setResult(data);
      })
      .catch((error) => {
        console.error(error);
        setResult('');
      });
  }, [apiRequest, count]);

  return (
    <div className="w-screen h-screen">
      <div className="flex items-center justify-center w-full h-full">
        <div className="flex flex-col text-lg text-center">
          <div className="mb-2">Your count</div>
          <div>{count}</div>

          <button
            onClick={increment}
            className={`rounded-md  py-3 px-8 mt-16 select-none text-white ${
              disableButton
                ? 'bg-gray-300 cursor-default text-gray-400'
                : 'bg-primary-blue active:border-2 active:border-primary-blue'
            }`}
          >
            Push me!
          </button>

          <div className="text-5xl font-bold mt-14">{result}</div>
        </div>
      </div>
    </div>
  );
}

export default App;
