import { stringify } from 'querystring';
import React from 'react';
import './App.css';
import { useState } from "react";

function App() {
  // defining the initial state for the form
  const initialState = {
    n: 0,
    x: 0,
    y: 0,
    d: "",
    commands: "",
  };
  const [values, setValues] = useState(initialState);

  const [result, setResult] = useState<Robot>()

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values, [event.target.name]:
        event.target.value
    });
  };

  const onChangeInt = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values, [event.target.name]:
        parseInt(event.target.value)
    });
  };


  // a submit function that will execute upon form submission
  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    console.log(values)
    // send "values" to backend
    fetch('http://localhost:5000/handle', {
      method: 'POST',
      body: JSON.stringify({ ...values }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => res.json())
      .then(json => setResult(new Robot(json.x, json.y, json.d)))
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <div>
          <input
            name='n'
            placeholder='n'
            onChange={onChangeInt}
            type="number"
            required
          />
          <input
            name='x'
            placeholder='x-axis'
            onChange={onChangeInt}
            type="number"
            required
          />

          <input
            name='y'
            placeholder='y-axis'
            onChange={onChangeInt}
            type="number"
            required
          />
          <input
            name='d'
            placeholder='direction'
            onChange={onChange}
            required
          />
          <input
            name='commands'
            placeholder='commands'
            onChange={onChange}
            required
          />
          <button type='submit'>Enter</button>
        </div>
      </form>
      {result && <div>
        <p>{`(${result.x}, ${result.y}, ${result.d})`}</p>
      </div>}
    </>
  );


}

class Robot {
  x: number; //x-axis
  y: number; //y-axis
  d: string; //direection

  constructor(x: number, y: number, d: string) {
    this.x = x;
    this.y = y;
    this.d = d;
  }


}

export default App;
