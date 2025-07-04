import React, { useState } from "react";
import { useParams } from "react-router-dom";

// PUBLIC_INTERFACE
function Game() {
  /** Interactive Tic Tac Toe game session page with 3x3 board, move logic, and player indicator. */
  const { gameId } = useParams();
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXisNext] = useState(true);
  const winner = calculateWinner(board);

  const handleSquareClick = (i) => {
    if (board[i] || winner) return;
    const newBoard = [...board];
    newBoard[i] = xIsNext ? "X" : "O";
    setBoard(newBoard);
    setXisNext(!xIsNext);
    // Here, API call to backend to record move & sync state should go
  };

  function renderSquare(i) {
    return (
      <button
        className="ttt-square"
        style={{
          width: 70, height: 70,
          fontSize: 36,
          border: "1px solid var(--border-color)",
          color: board[i] === "X" ? "var(--primary)" : "var(--secondary)",
          background: "#fff",
          fontWeight: "bold",
          cursor: board[i] || winner ? "not-allowed" : "pointer",
          transition: "background 0.2s"
        }}
        onClick={() => handleSquareClick(i)}
        disabled={!!board[i] || !!winner}
        aria-label={`Square ${i}`}
      >
        {board[i]}
      </button>
    );
  }

  function resetGame() {
    setBoard(Array(9).fill(null));
    setXisNext(true);
  }

  return (
    <div style={{maxWidth:420, margin:"30px auto", textAlign:'center'}}>
      <h2>Game #{gameId}</h2>
      {winner ? (
        <div style={{fontSize:20, fontWeight:"bold", color:"green", marginBottom:16}}>Winner: {winner}</div>
      ) : (
        <div style={{fontSize:18, marginBottom:14}}>Next: <b style={{color: xIsNext ? "var(--primary)" : "var(--secondary)"}}>{xIsNext ? "X" : "O"}</b></div>
      )}
      <div className="ttt-board" style={{
        display:"grid",
        gridTemplateColumns: "repeat(3, 70px)",
        gridGap: "5px",
        margin:"auto",
        marginBottom: 12
      }}>
        {[...Array(9)].map((_, i) => renderSquare(i))}
      </div>
      <button
        onClick={resetGame}
        style={{
          background: "var(--accent)", color:"#222",
          padding: "8px 32px",
          border:"none", borderRadius: 5,
          fontWeight: 700
        }}
      >Reset</button>
      <div style={{marginTop:18, fontSize:15, color: "#888"}}>Moves and state should sync with backend API.</div>
    </div>
  );
}

/** Winner calc logic */
function calculateWinner(squares) {
  // Returns "X", "O", or null
  const lines = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6],
  ];
  for(const [a,b,c] of lines) {
    if(squares[a] && squares[a] === squares[b] && squares[b] === squares[c]){
      return squares[a];
    }
  }
  return null;
}

export default Game;
