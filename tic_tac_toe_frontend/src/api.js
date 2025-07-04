//
// PUBLIC_INTERFACE
// Simple API utility for backend communication and token handling for TicTacToeHub.
//
const API_BASE = process.env.REACT_APP_API_BASE || "https://vscode-internal-5548-beta.beta01.cloud.kavia.ai:3001/api";

/** Helper to get auth token from storage */
export function getToken() {
  return localStorage.getItem("token");
}

/** Helper to set auth token */
export function setToken(token) {
  localStorage.setItem("token", token);
}

/** Helper to clear auth token */
export function clearToken() {
  localStorage.removeItem("token");
}

/** Wrapper for fetch with auth */
async function apiFetch(url, opts = {}) {
  const headers = opts.headers || {};
  if (getToken()) {
    headers["Authorization"] = `Bearer ${getToken()}`;
  }
  return fetch(`${API_BASE}${url}`, { ...opts, headers });
}

// PUBLIC_INTERFACE
export async function apiRegister(username, password) {
  /** Register a new user. Returns true on success, throws on error. */
  const res = await fetch(`${API_BASE}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });
  if (res.ok) return true;
  const data = await res.json().catch(() => ({}));
  throw new Error(data.detail || "Registration failed.");
}

// PUBLIC_INTERFACE
export async function apiLogin(username, password) {
  /** Login and retrieve JWT access token. Returns token string on success. */
  const res = await fetch(`${API_BASE}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.detail || "Login failed.");
  }
  const data = await res.json();
  if (!data.access_token) throw new Error("No access token in response");
  setToken(data.access_token);
  return data.access_token;
}

// PUBLIC_INTERFACE
export async function apiGetGames() {
  /** Get the current user's accessible games (lobby) */
  const res = await apiFetch("/games");
  if (!res.ok) throw new Error("Failed to load games.");
  return res.json();
}

// PUBLIC_INTERFACE
export async function apiCreateGame() {
  /** Create a new game and return its metadata */
  const res = await apiFetch("/games", { method: "POST" });
  if (!res.ok) throw new Error("Failed to create game.");
  return res.json();
}

// PUBLIC_INTERFACE
export async function apiJoinGame(gameId) {
  /** Join a game (optional, depending on backend). Could be a POST /games/{gameId}/join or just fetching the game. */
  // Adjust to backend definition if POST required.
  const res = await apiFetch(`/games/${gameId}/join`, { method: "POST" });
  if (!res.ok) throw new Error("Failed to join game.");
  return res.json();
}

// PUBLIC_INTERFACE
export async function apiGetGame(gameId) {
  /** Fetch full game state for a given gameId */
  const res = await apiFetch(`/games/${gameId}`);
  if (!res.ok) throw new Error("Failed to load game.");
  return res.json();
}

// PUBLIC_INTERFACE
export async function apiMakeMove(gameId, cellIdx) {
  /** Play a move (PUT /games/{game_id}/move) */
  const res = await apiFetch(`/games/${gameId}/move`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cell: cellIdx })
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.detail || "Failed to make move.");
  }
  return res.json();
}

// PUBLIC_INTERFACE
export async function apiGetLeaderboard() {
  /** Fetch leaderboard state */
  const res = await apiFetch("/leaderboard");
  if (!res.ok) throw new Error("Failed to load leaderboard.");
  return res.json();
}
