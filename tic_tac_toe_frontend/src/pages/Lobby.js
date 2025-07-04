import React from "react";
import { useNavigate } from 'react-router-dom';

// Dummy session list
const DUMMY_GAMES = [
  { id: "1", players: ["Alice", "Bob"], status: "In Progress" },
  { id: "2", players: ["You", "CPU"], status: "Waiting" }
];

// PUBLIC_INTERFACE
function Lobby() {
  /** Lobby to create and join game sessions */
  const navigate = useNavigate();

  return (
    <div style={{maxWidth:600, margin:"auto"}}>
      <h2>Game Lobby</h2>
      <button
        style={{
          background: "var(--primary)", color: "#fff",
          padding: "10px 24px", border: "none", borderRadius: 6, marginBottom: 24, fontWeight: 600, fontSize: 17
        }}
        onClick={() => navigate(`/games/new`)}
      >Start New Game</button>

      <h3>Active Games</h3>
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
          {DUMMY_GAMES.map(game => (
            <tr key={game.id}>
              <td>{game.id}</td>
              <td>{game.players.join(' vs. ')}</td>
              <td>{game.status}</td>
              <td>
                <button
                  style={{
                    background: "var(--accent)", color: "#333",
                    padding: "4px 16px", border: "none", borderRadius: 5, fontWeight: 600
                  }}
                  onClick={() => navigate(`/games/${game.id}`)}
                >Join</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Lobby;
