import { stringify } from 'querystring';
import React, { useState } from 'react';
import './styles/App.css';

function App() {
  // defining the initial state for the form
  const initialState = {
    n: 0, //area
    x: 0, //x-axis
    y: 0, //y-axis
    d: "", //direction 
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


  const onChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
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
      <div className='heading'><h1>Mr. Robot</h1></div>
      <form onSubmit={onSubmit}>
        <div className="form">
          <div className='left'>
            <h4>Enter Inputs for Robot</h4>
            <label className="Area">Area:</label>
            <input className='input_box'
              name='n'
              placeholder='size'
              onChange={onChangeInt}
              type="number"
              required
            />

            <label className="X">X-axis:</label>
            <input
              name='x'
              placeholder='x-axis'
              onChange={onChangeInt}
              type="number"
              required
              className='input_box'
            />

            <label className="Y">Y-axis:</label>
            <input
              name='y'
              placeholder='y-axis'
              onChange={onChangeInt}
              type="number"
              required
              className='input_box'
            />

            <label>
              Direction:
              <select name='d' className='input_box' onChange={onChangeHandler}>
                <option value=""></option>
                <option value="N" >North</option>
                <option value="E">East</option>
                <option value="S">South</option>
                <option value="W">West</option>
              </select>
            </label>

            <label className="Commands">Commands:</label>
            <input
              name='commands'
              placeholder='commands'
              onChange={onChange}
              required
              className='input_box'
            />

          </div>
          {result && <div className='result'><h4>Final Position of Robot</h4>
            <p>{`Robot is in (${result.x}, ${result.y}, ${result.d}) position`}</p>
          </div>}
          <button className='btn' type='submit'>Enter</button>
        </div>
      </form>

    </>
  );
}

class Robot {
  x: number; //x-axis
  y: number; //y-axis
  d: string; //direction

  constructor(x: number, y: number, d: string) {
    this.x = x;
    this.y = y;
    this.d = d;
  }


}

export default App;
