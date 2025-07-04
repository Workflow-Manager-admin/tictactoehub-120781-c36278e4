import React, { useEffect, useState } from "react";
import { apiGetLeaderboard } from "../api";

// PUBLIC_INTERFACE
function Leaderboard() {
  /** Displays top-ranked players and their wins. */
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      setLoading(true);
      setErr("");
      try {
        const data = await apiGetLeaderboard();
        setRows(data.leaderboard || data.rows || []);
      } catch (e) {
        setErr("Failed to load leaderboard.");
      }
      setLoading(false);
    })();
  }, []);

  return (
    <div style={{maxWidth:430, margin:"40px auto"}}>
      <h2>Leaderboard</h2>
      {err && <div style={{color:"red", marginBottom:10}}>{err}</div>}
      {loading ? <div>Loading...</div> : (
      <table style={{width:"100%", borderCollapse:"collapse", marginTop:18}}>
        <thead>
          <tr>
            <th style={{textAlign:"left", borderBottom:"1px solid var(--border-color)"}}>Player</th>
            <th style={{textAlign:"left", borderBottom:"1px solid var(--border-color)"}}>Wins</th>
            <th style={{textAlign:"left", borderBottom:"1px solid var(--border-color)"}}>Games</th>
          </tr>
        </thead>
        <tbody>
        {rows.map((row, i) => (
          <tr key={row.user || row.username || i}>
            <td style={{padding:"6px 0"}}>{row.user || row.username}</td>
            <td>{row.wins}</td>
            <td>{row.games}</td>
          </tr>
        ))}
        </tbody>
      </table>
      )}
    </div>
  );
}

export default Leaderboard;
