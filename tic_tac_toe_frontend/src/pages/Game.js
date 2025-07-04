import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiGetGame, apiMakeMove } from "../api";

// PUBLIC_INTERFACE
function Game() {
  /** Interactive Tic Tac Toe game session page with 3x3 board, move logic, and player indicator. */
  const { gameId } = useParams();
  const [board, setBoard] = useState(Array(9).fill(null));
  const [playerSymbol, setPlayerSymbol] = useState();
  const [statusMsg, setStatusMsg] = useState("");
  const [winner, setWinner] = useState();
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [currentTurn, setCurrentTurn] = useState();
  const [gameOver, setGameOver] = useState(false);

  async function reloadGameState() {
    setLoading(true);
    setErr("");
    try {
      // The backend game object may have: {board: [...], current_turn: "X"/"O", winner, ...} etc.
      const data = await apiGetGame(gameId);
      setBoard(data.board || Array(9).fill(null));
      setPlayerSymbol(data.your_symbol);
      setCurrentTurn(data.current_turn);
      setWinner(data.winner);
      setGameOver(data.winner !== null || data.is_draw);
      setStatusMsg(data.is_draw ? "Draw!" : (data.winner ? `Winner: ${data.winner}` : ""));
    } catch (e) {
      setErr("Failed to load game.");
    }
    setLoading(false);
  }

  useEffect(() => { reloadGameState(); /* eslint-disable-next-line */ }, [gameId]);

  const handleSquareClick = async (i) => {
    if (gameOver || board[i]) return;
    setErr(""); setStatusMsg("");
    try {
      await apiMakeMove(gameId, i);
      await reloadGameState(); // updates board and status
    } catch (e) {
      setErr(e.message || "Move failed.");
    }
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
          cursor: board[i] || gameOver ? "not-allowed" : "pointer",
          transition: "background 0.2s"
        }}
        onClick={() => handleSquareClick(i)}
        disabled={!!board[i] || !!gameOver || loading}
        aria-label={`Square ${i}`}
      >
        {board[i]}
      </button>
    );
  }

  function resetGameLocal() {
    // Just reload game state (could enable restart endpoint if backend supports)
    reloadGameState();
    setErr(""); setStatusMsg(""); setWinner(null);
  }

  return (
    <div style={{maxWidth:420, margin:"30px auto", textAlign:'center'}}>
      <h2>Game #{gameId}</h2>
      {loading ? <div>Loading...</div> :
      <>
      {err && <div style={{color:"red", marginBottom:10}}>{err}</div>}
      <div style={{fontSize:16, marginBottom:10}}>
        {playerSymbol && <b style={{marginRight:10}}>You: {playerSymbol}</b>}
        {currentTurn && <span>Turn: <b style={{color: currentTurn === "X" ? "var(--primary)" : "var(--secondary)"}}>{currentTurn}</b></span>}
      </div>
      {(statusMsg || winner) ? (
        <div style={{fontSize:20, fontWeight:"bold", color: winner ? "green" : "orange", marginBottom:16}}>
          {statusMsg || (winner && `Winner: ${winner}`)}
        </div>
      ) : null}
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
        onClick={resetGameLocal}
        style={{
          background: "var(--accent)", color:"#222",
          padding: "8px 32px",
          border:"none", borderRadius: 5,
          fontWeight: 700
        }}
        disabled={loading}
      >Reload</button>
      {gameOver && <div style={{color:"#888", marginTop:8}}>Game Over</div>}
      </>
      }
    </div>
  );
}

export default Game;
