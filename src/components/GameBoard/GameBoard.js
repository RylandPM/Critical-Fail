import React, { Component } from "react";
import Square from "./Squares/Squares";
import Peg from "./Pegs/Pegs";
import io from "socket.io-client";
import { connect } from "react-redux";
import { setPegs } from "../../dux/pegReducer";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import "./GameBoard.css";
const socket = io();

const mapStateToProps = reduxState => {
  const { pegs, game, user } = reduxState;
  return {
    user: user,
    game: game.game_name,
    pegs: pegs.pegs
  };
};

const mapDispatchToProps = {
  setPegs
};

function renderSquare(i, [xpos, ypos], peg_name, monster, counter, game) {
  const x = i % 10;
  const y = Math.floor(i / 10);
  const isPieceHere = xpos === x && ypos === y;
  const piece = isPieceHere ? <Peg peg_name={peg_name} /> : null;
  const placed = (piece !== null).toString();
  // console.log(game);

  return (
    <div key={i} style={{ width: "10%", height: "10%" }}>
      <Square monster={monster} x={x} y={y} placed={placed} game_name={game}>
        {piece}
      </Square>
    </div>
  );
}

function renderSquareDummy(i) {
  const x = i % 10;
  const y = Math.floor(i / 10);

  return (
    <div key={i} style={{ width: "10%", height: "10%" }}>
      <Square />
    </div>
  );
}

class GameBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      background: ""
    };
    socket.on("rebuild", change => {
      this.props.setPegs(this.props.game);
    });
  }

  render() {
    let squares = [];
    let counter = 0;
    console.log(this.props.game);
    if (this.props.pegs[0]) {
      for (let i = 0; i < 100; i++) {
        const { game } = this.props;
        // console.log(game);
        const { xpos, ypos, peg_name, monster } = this.props.pegs[counter];
        squares.push(
          renderSquare(i, [xpos, ypos], peg_name, monster, counter, game)
        );
        // console.log(squares[squares.length - 1].props.children.props.placed);
        if (
          squares[squares.length - 1].props.children.props.placed === "true" &&
          counter <= this.props.pegs.length - 2
        ) {
          counter++;
        }
      }
    } else {
      for (let i = 0; i < 100; i++) {
        squares.push(renderSquareDummy(i));
      }
    }
    return <div className="gameboard">{squares}</div>;
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DragDropContext(HTML5Backend)(GameBoard));
