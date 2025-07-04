import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { apiGetGames, apiCreateGame } from "../api";

// PUBLIC_INTERFACE
function Lobby() {
  /** Lobby to create and join game sessions */
  const navigate = useNavigate();
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [startGameLoading, setStartGameLoading] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      setErr("");
      setLoading(true);
      try {
        const res = await apiGetGames();
        setGames(res.games || []);
      } catch (e) {
        setErr("Failed to load games. You may need to login.");
      }
      setLoading(false);
    })();
  }, []);

  const handleCreateGame = async () => {
    setStartGameLoading(true);
    try {
      const game = await apiCreateGame();
      navigate(`/games/${game.id || game.game_id || game.gameId}`);
    } catch (e) {
      setErr("Failed to start new game.");
    }
    setStartGameLoading(false);
  };

  return (
    <div style={{maxWidth:600, margin:"auto"}}>
      <h2>Game Lobby</h2>
      <button
        style={{
          background: "var(--primary)", color: "#fff",
          padding: "10px 24px", border: "none", borderRadius: 6, marginBottom: 24, fontWeight: 600, fontSize: 17
        }}
        onClick={handleCreateGame}
        disabled={startGameLoading}
      >{startGameLoading ? "Starting..." : "Start New Game"}</button>
      {err && <div style={{color:"red", marginBottom:8}}>{err}</div>}

      <h3>Active Games</h3>
      {loading ? <div>Loading games...</div> : (
        <table style={{width:"100%", borderCollapse:"collapse"}}>
          <thead>
            <tr>
              <th style={{borderBottom:'1px solid var(--border-color)', textAlign:'left'}}>ID</th>
              <th style={{borderBottom:'1px solid var(--border-color)', textAlign:'left'}}>Players</th>
              <th style={{borderBottom:'1px solid var(--border-color)', textAlign:'left'}}>Status</th>
              <th style={{borderBottom:'1px solid var(--border-color)'}}></th>
            </tr>
          </thead>
          <tbody>
            {games.map(game => (
              <tr key={game.id || game.game_id || game.gameId}>
                <td>{game.id || game.game_id || game.gameId}</td>
                <td>{game.players ? game.players.join(' vs. ') : ""}</td>
                <td>{game.status}</td>
                <td>
                  <button
                    style={{
                      background: "var(--accent)", color: "#333",
                      padding: "4px 16px", border: "none", borderRadius: 5, fontWeight: 600
                    }}
                    onClick={() => navigate(`/games/${game.id || game.game_id || game.gameId}`)}
                  >Join</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Lobby;
