import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import "./App.css";

import TeddyBear from "./assets/teddybear.png";
import Cartoon from "./assets/neil.png";

const createjs = window.createjs;
const examples = window.examples;

function App() {
  const canvasRef = React.createRef();
  const images = [TeddyBear, Cartoon];
  let canvas,
    stage,
    update = true;

  const initAnimation = () => {
    examples.showDistractor();
    canvas = ReactDOM.findDOMNode(canvasRef.current);
    canvas.width = window.innerWidth - 5;
    canvas.height = window.innerHeight - 5;
    stage = new createjs.Stage(canvas);
    createjs.Touch.enable(stage);

    stage.enableMouseOver(10);
    stage.mouseMoveOutside = true;
    console.log(21);
    //load the Image Source

    var image = new Image();

    image.onload = OnLoadImageHandler;
    image.onerror = (error) => {
      console.log("error", error);
    };
    image.src = TeddyBear;
    // image.src = "https://image.flaticon.com/icons/png/512/620/620744.png";
  };

  const OnLoadImageHandler = (event) => {
    console.log(30);

    let image = event.target,
      bitmap;
    let container = new createjs.Container();
    stage.addChild(container);

    for (let i = 0; i < 100; i++) {
      console.log("for loop", 36);

      let randomImage = images[Math.floor(Math.random() * 2)];
      bitmap = new createjs.Bitmap(randomImage);

      bitmap.x = (canvas.width * Math.random()) | 0;
      bitmap.y = (canvas.height * Math.random()) | 0;
      bitmap.rotation = (360 * Math.random()) | 0;
      bitmap.regX = (bitmap.image.width / 2) | 0;
      bitmap.regY = (bitmap.image.height / 2) | 0;
      bitmap.scale = bitmap.originalScale = Math.random() * 0.4;
      bitmap.name = "bmp_" + i;
      bitmap.cursor = "pointer";

      bitmap.on("mousedown", function (e) {
        console.log(e);
        console.log(this.x, this.y);
        this.parent.addChild(this);
        this.offset = { x: this.x - e.stageX, y: this.y - e.stageY };
      });

      bitmap.on("pressmove", function (evt) {
        this.x = evt.stageX + this.offset.x;
        this.y = evt.stageY + this.offset.y;
        // indicate that the stage should be updated on the next tick:
        update = true;
      });

      bitmap.on("rollover", function (e) {
        this.scale = this.originalScale * 1.1;
        update = true;
      });
      bitmap.on("rollout", function (e) {
        this.scale = this.originalScale;
        update = true;
      });
      container.addChild(bitmap);
    }

    examples.hideDistractor();
    createjs.Ticker.addEventListener("tick", tick);
  };

  function tick(event) {
    // this set makes it so the stage only re-renders when an event handler indicates a change has happened.
    if (update) {
      update = false; // only update once
      stage.update(event);
    }
  }

  useEffect(() => {
    initAnimation();
  }, []);

  return (
    <>
      <canvas ref={canvasRef}></canvas>
    </>
  );
}

export default App;
