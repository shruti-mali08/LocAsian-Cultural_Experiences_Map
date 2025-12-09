const BASE_URL = "http://localhost:8080"; 


export interface Location {
    id: number;
    name?: string;
    details?: string;
    address?: string;
    createdAt?: string;
}

export const getLocations = async (): Promise<Location[]> => {
    const res = await fetch(`${BASE_URL}/locations`);
    return res.json();
};