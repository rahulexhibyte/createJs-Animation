import React, { useEffect } from "react";
import ReactDOM from "react-dom";

const createjs = window.createjs;

const TweenJs = () => {
  const canvasRef = React.createRef();
  let canvas, stage, ball;

  const initAnimation = () => {
    canvas = ReactDOM.findDOMNode(canvasRef.current);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    stage = new createjs.Stage(canvas);
    ball = new createjs.Shape();
    ball.graphics.setStrokeStyle(5, "round", "round");
    ball.graphics.beginStroke("#000000");
    ball.graphics.beginFill("#FF0000").drawCircle(0, 0, 100);
    ball.graphics.beginStroke("#000000");
    ball.graphics.setStrokeStyle(1, "round", "round");
    ball.graphics.moveTo(0, 0);
    ball.graphics.lineTo(-100, 0);
    ball.graphics.lineTo(0, -100);
    ball.graphics.lineTo(100, 0);
    ball.graphics.lineTo(0, 100);
    ball.graphics.lineTo(-100, 0);
    ball.graphics.endStroke();

    ball.x = window.innerWidth / 2;
    ball.y = window.innerHeight / 2;

    createjs.Tween.get(ball, { loop: -1 })
      .to(
        {
          x: window.innerWidth - 150,
          y: ball.y,
          rotation: 360,
        },
        5000,
        createjs.Ease.bounceOut
      )
      .wait(1000)
      .to(
        { x: window.innerWidth / 2, y: 150, rotation: 360 },
        5000,
        createjs.Ease.bounceOut
      )
      .wait(1000)
      .to(
        { x: 150, y: window.innerHeight / 2, rotation: 360 },
        5000,
        createjs.Ease.backInOut
      )
      .wait(1000)
      .to(
        {
          x: window.innerWidth / 2,
          y: window.innerHeight - 150,
          rotation: 360,
        },
        5000,
        createjs.Ease.backInOut
      )
      .wait(1000);

    stage.addChild(ball);

    createjs.Ticker.addEventListener("tick", stage);
  };
  useEffect(() => {
    initAnimation();
  }, []);
  return (
    <>
      <canvas ref={canvasRef}></canvas>
    </>
  );
};

export default TweenJs;
