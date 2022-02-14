import React, { useState } from "react";
import "./mainPage.css";
import Box from "../components/box";
import { ImCross } from "react-icons/im";
import { RiRecordCircleFill } from "react-icons/ri";
import { GrPowerReset } from "react-icons/gr";

const MainPage = () => {
  const [currentSign, setCurrentSign] = useState("cross");
  const [cells, setCells] = useState(Array(9).fill(""));
  const [winner, setWinner] = useState("");
  const [score, setScore] = useState(Array(3).fill(0));

  const checkForDraw = (squares) => {
    //for Draw
    console.log(squares.every((val) => val === ""));
    console.log(winner);
    if (squares.every((val) => val !== "" && winner === "")) {
      console.log("draw");
      console.log(squares);
      const tempScore = [...score];
      tempScore[1] = tempScore[1] + 1;
      setScore(tempScore);
    } else {
      console.log("no draw");
    }
  };
  const checkForWinner = (squares) => {
    // console.log("checking for winner");
    let combos = {
      across: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
      ],
      down: [
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
      ],
      diagonal: [
        [0, 4, 8],
        [2, 4, 6],
      ],
    };

    for (let combo in combos) {
      combos[combo].forEach((pattern) => {
        if (
          squares[pattern[0]] === "" ||
          squares[pattern[1]] === "" ||
          squares[pattern[2]] === ""
        ) {
          //nothing
        } else if (
          squares[pattern[0]] === squares[pattern[1]] &&
          squares[pattern[1]] === squares[pattern[2]]
        ) {
          const tempScore = [...score];
          if (squares[pattern[0]] === "cross") {
            setWinner("Player 1");
            console.log(winner);

            tempScore[0] = tempScore[0] + 1;
          } else if (squares[pattern[0]] === "circle") {
            setWinner("Player 2");
            tempScore[2] = tempScore[2] + 1;
          }
          setScore(tempScore);
          return;
        }
      });
    }
    // if (
    //   winner === "" &&
    //   squares[0] !== "" &&
    //   squares[1] !== "" &&
    //   squares[2] !== "" &&
    //   squares[3] !== "" &&
    //   squares[4] !== "" &&
    //   squares[5] !== "" &&
    //   squares[6] !== "" &&
    //   squares[7] !== "" &&
    //   squares[8] !== ""
    // ) {
    //   console.log("draw");
    //   console.log(winner);
    // }
  };

  const handleClick = (num) => {
    if (cells[num] !== "") {
      alert("already clicked");
      return;
    }
    let squares = [...cells];

    if (currentSign === "cross") {
      squares[num] = "cross";
      setCurrentSign("circle");
    }
    if (currentSign === "circle") {
      squares[num] = "circle";
      setCurrentSign("cross");
    }
    setCells(squares);
    checkForWinner(squares);
    checkForDraw(squares);
  };

  const resetHandler = () => {
    setCurrentSign("cross");
    setCells(Array(9).fill(""));
    setWinner("");
  };

  return (
    <div className="mainContainer">
      <div className="gameTitle">
        <p className="gameTitleText1">TIC</p>
        <p className="gameTitleText2">TAC</p>
        <p className="gameTitleText3">TOE</p>
      </div>
      <div className="gameBox">
        <div className="menuBar">
          <div className="logo">
            <ImCross className="cross" />
            <RiRecordCircleFill className="circle" />
          </div>
          <div className="turn">
            {currentSign === "cross" && <ImCross className="cross" />}
            {currentSign === "circle" && (
              <RiRecordCircleFill className="circle" />
            )}
            <p className="turnText">turn</p>
          </div>
          <GrPowerReset className="reset" onClick={resetHandler} />
        </div>
        <div className="gridBox">
          <Box num={0} onSign={handleClick} cells={cells} />
          <Box num={1} onSign={handleClick} cells={cells} />
          <Box num={2} onSign={handleClick} cells={cells} />
          <Box num={3} onSign={handleClick} cells={cells} />
          <Box num={4} onSign={handleClick} cells={cells} />
          <Box num={5} onSign={handleClick} cells={cells} />
          <Box num={6} onSign={handleClick} cells={cells} />
          <Box num={7} onSign={handleClick} cells={cells} />
          <Box num={8} onSign={handleClick} cells={cells} />
        </div>
        <div className="score">
          <div className="scoreBox player1ScoreBox">
            <p className="playerName">Player 1</p>
            <span className="player1Score">{score[0]}</span>
          </div>
          <div className="scoreBox tieScoreBox">
            <p className="playerName">Tie Score</p>
            <span className="TieScore">{score[1]}</span>
          </div>
          <div className="scoreBox player2ScoreBox">
            <p className="playerName">Player 2</p>
            <span className="player2Score">{score[2]}</span>
          </div>
        </div>
      </div>
      <div className="winnerName">
        {winner && <p>{`${winner} is the winner`}</p>}
      </div>
    </div>
  );
};

export default MainPage;
