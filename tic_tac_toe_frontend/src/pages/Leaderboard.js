import React from "react";

// Dummy leaderboard data for stub
const LEADERBOARD = [
  { user: "Alice", wins: 5, games: 7 },
  { user: "Bob", wins: 3, games: 6 },
  { user: "You", wins: 2, games: 4 }
];

// PUBLIC_INTERFACE
function Leaderboard() {
  /** Displays top-ranked players and their wins. */
  return (
    <div style={{maxWidth:430, margin:"40px auto"}}>
      <h2>Leaderboard</h2>
      <table style={{width:"100%", borderCollapse:"collapse", marginTop:18}}>
        <thead>
          <tr>
            <th style={{textAlign:"left", borderBottom:"1px solid var(--border-color)"}}>Player</th>
            <th style={{textAlign:"left", borderBottom:"1px solid var(--border-color)"}}>Wins</th>
            <th style={{textAlign:"left", borderBottom:"1px solid var(--border-color)"}}>Games</th>
          </tr>
        </thead>
        <tbody>
        {LEADERBOARD.map((row, i) => (
          <tr key={row.user}>
            <td style={{padding:"6px 0"}}>{row.user}{i===2 && <span style={{color:"var(--accent)", fontWeight:700, marginLeft:8}}>(You)</span>}</td>
            <td>{row.wins}</td>
            <td>{row.games}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard;
