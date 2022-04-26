import React, { useState, useCallback } from 'react';
import { getRandom } from './apis';
import { COUNT_LIMIT } from './config';
import './App.css';


function App() {
  const [limit] = useState(100000);
  const [errorMessage, setErrorMessage] = useState('')
  const [randNumbers, setRandNumbers] = useState([])
  const [callCount, setCallCount] = useState(0);
  const [startedAt, setStartedAt] = useState('');
  const [endedAt, setEndedAt] = useState('');
  const [calculating, setCalculating] = useState(false)

  const handleGenerateClick = useCallback(async () => {
    setRandNumbers([]);
    setCallCount(0)
    setStartedAt(new Date().toString())
    setCalculating(true)
    setErrorMessage("")
    let newNumbers = [];
    let count = 0;
    while (newNumbers.length < COUNT_LIMIT) {
      count++;
      try {
        const { data } = await getRandom()
        if (data.error) {
          setErrorMessage(data.error?.message || "something went wrong. please try again");
          break;
        } else {
          const randNums = data.result.random.data.slice();
          // check duplicated
          let tmp = randNums.filter((value) => !newNumbers.includes(value));
          // check it's duplication
          tmp = tmp.filter((value, index) => !tmp.includes(value, index + 1));
          // console.log("randNums: ", randNums)
          // console.log("tmp: ", tmp)
          // console.log("newNumbers: ", newNumbers)
          newNumbers.push(...tmp);
          setCallCount(count)
        }
      } catch (error) {
        setErrorMessage(error)
        break;
      }
    }
    setRandNumbers(newNumbers);
    setCallCount(count)
    setEndedAt(new Date().toString())
    setCalculating(false)
  }, [])

  return (
    <div>
      <div>
        <label>Limit: </label>
        <input type="number" placeholder='Limit' value={limit} readOnly />
        <button onClick={handleGenerateClick} >Generate</button>
      </div>
      <div>
        {
          calculating ? <p>Calculating...</p> : null
        }
        {
          errorMessage ? <p style={{ color: "red" }}>{errorMessage}</p> : null
        }
      </div >
      {
        !calculating ? <div>
          <p>Call Count: {callCount}</p>
          <div style={{ backgroundColor: "green", padding: '2px 0' }}>
            <p>Duration:</p>
            <p>Start: {startedAt}</p>
            <p>End: {endedAt}</p>
          </div>
        </div> : null
      }
      <div>
        Result: <div>{randNumbers.join(", ")}</div>
      </div>
    </div >
  );
}

export default App;
