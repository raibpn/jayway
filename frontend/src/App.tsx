import { stringify } from 'querystring';
import React from 'react';
import './App.css';

function App() {
  const n = 5;
  const commands = "RFLFFLRF";
  const inputX = 0;
  const inputY = 0;
  const inputD = "E";

  // backend
  const directions = ["N","E","S","W"]
  
  let robot = new Robot(inputX,inputY, directions.indexOf(inputD));

for (var i = 0; i < commands.length; i++) {
  const command = commands.charAt(i);
  if (command === "R") {
    robot.d = (robot.d + 1) % 4;
    
  }
  if (command === "L") {
    robot.d = (robot.d + 3) % 4;
    
  }
  if (command === "F") {
    if (directions[robot.d] === "N") {
      if (robot.y - 1 >= 0) {
        robot.y--
      }
    }

     if (directions[robot.d] === "W") {
      if (robot.x - 1 >= 0) {
        robot.x--
      }
     }
    
      if (directions[robot.d] === "E") {
      if (robot.x + 1 < n) {
        robot.x++
      }
    }
    
     if (directions[robot.d] === "S") {
      if (robot.y + 1 < n) {
        robot.y++
      }
    }

   }
 
}
  
  return (
    <div className="App">
      <h3>Robot is in direction</h3>
      {robot.x},{robot.y},{directions[robot.d]}
    </div>
  );
}

class Robot {
  x: number; //x-axis
  y: number; //y-axis
  d: number; //direection

  constructor(x:number, y:number, d:number) {
    this.x = x;
    this.y = y;
    this.d = d;
  }


}
export default App;
