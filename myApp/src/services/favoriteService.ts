const BASE_URL = "http://localhost:8080"; 
const USER_ID = "test-user";              
const STORAGE_KEY = "favoriteLocations";


export interface StoredFavorite {
  name?: string;
  city?: string;
  cuisine?: string;
  lat?: number;
  lng?: number;
}

export type FavoriteMap = Record<string, StoredFavorite>;

// ---------- Backend helpers ----------

type BackendFavorite = {
  id: number;
  userId: string;
  restaurantName: string; // we'll store the position key here
  createdAt: string;
};

async function fetchBackendFavorites(): Promise<BackendFavorite[]> {
  const res = await fetch(`${BASE_URL}/users/${USER_ID}/favorites`);
  if (!res.ok) {
    throw new Error(`Failed to fetch backend favourites: ${res.status}`);
  }
  return res.json();
}

async function addBackendFavorite(id: string): Promise<void> {
  const body = { restaurantName: id };

  const res = await fetch(`${BASE_URL}/users/${USER_ID}/favorites`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error(`Failed to add backend favourite: ${res.status}`);
  }
}

async function removeBackendFavorite(id: string): Promise<void> {
  const res = await fetch(
    `${BASE_URL}/users/${USER_ID}/favorites/${encodeURIComponent(id)}`,
    { method: "DELETE" }
  );

  if (!res.ok) {
    throw new Error(`Failed to remove backend favourite: ${res.status}`);
  }
}

// ---------- LocalStorage helpers ----------

function loadLocalFavorites(): FavoriteMap {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as FavoriteMap;
  } catch {
    return {};
  }
}

function saveLocalFavorites(map: FavoriteMap) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
}

// ---------- Public API used by Home + FavoritesPage ----------

// Get favourites (sync backend → localStorage → return map)
export async function getFavorites(): Promise<FavoriteMap> {
  const local = loadLocalFavorites();

  try {
    const backend = await fetchBackendFavorites();

    backend.forEach((fav) => {
      const key = fav.restaurantName; // our position key
      if (!local[key]) {
        // create stub if we don't have details yet
        local[key] = { name: `Location ${key}` };
      }
    });

    saveLocalFavorites(local);
  } catch (e) {
    console.error("Failed to sync favourites with backend", e);
    // if backend fails we just use local
  }

  return local;
}

// Save/like a location (id is the posKey string)
export async function saveFavorite(
  id: string,
  dataOverrides?: StoredFavorite
): Promise<FavoriteMap> {
  const local = loadLocalFavorites();
  const existing = local[id] || {};
  local[id] = { ...existing, ...dataOverrides };
  saveLocalFavorites(local);

  try {
    await addBackendFavorite(id);
  } catch (e) {
    console.error("Failed to add favourite in backend", e);
  }

  return local;
}

// Remove/unlike a location
export async function removeFavorite(id: string): Promise<FavoriteMap> {
  const local = loadLocalFavorites();
  delete local[id];
  saveLocalFavorites(local);

  try {
    await removeBackendFavorite(id);
    console.log("Removed favourite from backend:", id);
  } catch (e) {
    console.error("Failed to remove favourite in backend", e);
  }

  return local;
}