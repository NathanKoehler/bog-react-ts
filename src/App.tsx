import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [gridArray, setGridArray] = useState<any>(Array(100).fill(true));
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  // const elemBackgroundChange = (index:number) => {
  //   const opp = !gridArray[index];
  //   setGridArray((currGridArray:any) => {
  //     currGridArray[index] = opp;
  //     return [...currGridArray];
  //   });
  // }

  const elemStartDrag = (e:React.MouseEvent, index: number) => {
    e.preventDefault();
    const pos = { x: Math.floor(index / 10), y: index % 10 };
    setStartPos(pos);
    console.log(index);
    console.log(pos);
  };

  const elemEndDrag = (e:React.MouseEvent, index: number) => {
    e.preventDefault();
    const endPos = { x: Math.floor(index / 10), y: index % 10 };
    let positions = { startX: startPos.x, endX: endPos.x, startY: startPos.y, endY: endPos.y };
    if (endPos.x < startPos.x) {
      positions.startX =  endPos.x;
      positions.endX = startPos.x;
    }
    if (endPos.y < startPos.y) {
      positions.startY =  endPos.y;
      positions.endY = startPos.y;
    }
    for (let y = positions.startY; y <= positions.endY; y++) {
      for (let x = positions.startX; x <= positions.endX; x++) {
        console.log(x + " " + y);
        const opp = !gridArray[x * 10 + y];
        setGridArray((currGridArray: any) => {
          currGridArray[x * 10 + y] = opp;
          return [...currGridArray];
        });
      }
    }
  };

  return (
    <div className="App">
      <section className="grid">
        {gridArray.map((elem: any, index: number) => (
          <div
            key={index}
            draggable="false"
            onMouseDown={(e) => {
              elemStartDrag(e, index);
            }}
            onMouseUp={(e) => elemEndDrag(e, index)}
            /* onClick={() => elemBackgroundChange(index)} */
          >
            <div className={elem ? "grid-elem active" : "grid-elem"}></div>
          </div>
        ))}
      </section>
    </div>
  );
}

export default App;
