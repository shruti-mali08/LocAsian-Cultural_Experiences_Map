
// loads all favorites from the local storage
export async function getFavorites(): Promise<Record<string, boolean>> 
{
    try {
      const saved = localStorage.getItem('favoriteLocations');
      return saved ? JSON.parse(saved) : {};
    } catch (error) {
      console.error('Load failed:', error);
      return {};
    }
}

// add a favorite location to local storage
export async function saveFavorite(key: string): Promise<Record<string, boolean>>
{
    try {
        const saved = localStorage.getItem('favoriteLocations');
        const data = saved ? JSON.parse(saved) : {};
        data[key] = true;
        localStorage.setItem('favoriteLocations', JSON.stringify(data));
        return data;
    } catch (error) {
        console.error('Save failed:', error);
        return {};
    }
}


// remove a favorite location from local storage
export async function removeFavorite(key: string): Promise<Record<string, boolean>>
{
    try {
        const saved = localStorage.getItem('favoriteLocations');
        const data = saved ? JSON.parse(saved) : {};
        delete data[key];
        localStorage.setItem('favoriteLocations', JSON.stringify(data));
        return data;
    } catch (error) {
        console.error('Remove failed:', error);
        return {};
    }
}