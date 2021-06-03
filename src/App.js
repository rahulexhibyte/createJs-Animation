import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import "./App.css";
const createjs = window.createjs;
const examples = window.examples;

function App() {
  const canvasRef = React.createRef();
  let canvas,
    stage,
    update = true;

  const initAnimation = () => {
    examples.showDistractor();
    canvas = ReactDOM.findDOMNode(canvasRef.current);
    canvas.width = window.innerWidth / 2;
    canvas.height = window.innerHeight - 5;
    canvas.style.backgroundColor = "#000000";
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
    // image.src = "https://image.flaticon.com/icons/png/512/620/620744.png";
  };

  const getRandomPosition = (number, max, min) => {
    return Math.random() * (max - min) + min + number;
  };

  const OnLoadImageHandler = (event) => {
    console.log(30);

    let container = new createjs.Container();
    let circle = new createjs.Shape();

    circle.graphics
      .beginFill("#61dafb")
      .drawCircle(canvas.width / 2, canvas.height / 2, 250);
    container.addChild(circle);
    stage.addChild(container);

    for (let i = 0; i < 10; i++) {
      console.log("for loop", 36);

      let moleculeNax = getRandomPosition(canvas.width / 2, 150, -150);
      let moleculeNay = getRandomPosition(canvas.height / 2, 150, -150);

      let moleculeContainer = new createjs.Container();
      let moleculeNa = new createjs.Shape();
      moleculeNa.graphics
        .beginFill(i % 2 === 0 ? "#FF0000" : "#FFFF00")
        .drawCircle(moleculeNax, moleculeNay, 20);
      let textNa = new createjs.Text(
        i % 2 === 0 ? "Na+" : "Cl-",
        "8px",
        "#000000"
      );
      textNa.x = moleculeNax - 8;
      textNa.y = moleculeNay - 5;
      moleculeContainer.addChild(moleculeNa, textNa);
      moleculeContainer.cursor = "Pointer";
      moleculeContainer.on("mousedown", function (e) {
        console.log(e);
        this.parent.addChild(this);
        this.offset = { x: this.x - e.stageX, y: this.y - e.stageY };
      });

      moleculeContainer.on("pressmove", function (evt) {
        console.log(evt);
        this.x = evt.stageX + this.offset.x;
        this.y = evt.stageY + this.offset.y;
        // indicate that the stage should be updated on the next tick:
        update = true;
      });

      container.addChild(moleculeContainer);
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
