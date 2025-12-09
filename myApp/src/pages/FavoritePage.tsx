import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonIcon,
} from "@ionic/react";
import {
  locationOutline,
  trashBinOutline,
  arrowUndoCircleOutline,
} from "ionicons/icons";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import {
  getFavorites,
  removeFavorite as removeFavoriteService,
  FavoriteMap,
} from "../services/favoriteService";

interface Favorite {
  id: string;
  name: string;
  city?: string;
  cuisine?: string;
  lat?: number;
  lng?: number;
}

const FavoritesPage: React.FC = () => {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const history = useHistory();

  // Load favorites from service (localStorage + backend sync)
  useEffect(() => {
    (async () => {
      const saved: FavoriteMap = await getFavorites();

      const favArray: Favorite[] = Object.keys(saved).map((id) => ({
        id,
        name: saved[id].name || `Restaurant ${id}`,
        city: saved[id].city,
        cuisine: saved[id].cuisine,
        lat: saved[id].lat,
        lng: saved[id].lng,
      }));

      setFavorites(favArray);
    })();
  }, []);

  const removeFavorite = async (id: string) => {
    const updatedMap = await removeFavoriteService(id);

    const favArray: Favorite[] = Object.keys(updatedMap).map((key) => ({
      id: key,
      name: updatedMap[key].name || `Restaurant ${key}`,
      city: updatedMap[key].city,
      cuisine: updatedMap[key].cuisine,
      lat: updatedMap[key].lat,
      lng: updatedMap[key].lng,
    }));

    setFavorites(favArray);
  };

  const showOnMap = (fav: Favorite) => {
    history.push(`/home?lat=${fav.lat}&lng=${fav.lng}`);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <div style={{ display: "flex" }}>
            <IonButton onClick={() => history.push("/home")}>
              <IonIcon icon={arrowUndoCircleOutline} />
            </IonButton>
            <IonTitle>Favorites</IonTitle>
          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {favorites.length === 0 ? (
          <p style={{ padding: "20px", textAlign: "center" }}>
            No favorites yet!
          </p>
        ) : (
          favorites.map((fav) => (
            <IonCard key={fav.id}>
              <IonCardHeader>
                <IonCardTitle>{fav.name}</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                {fav.city && <p>City: {fav.city}</p>}
                {fav.cuisine && <p>Cuisine: {fav.cuisine}</p>}

                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    marginTop: "10px",
                  }}
                >
                  <IonButton color="primary" onClick={() => showOnMap(fav)}>
                    <IonIcon icon={locationOutline} slot="start" />
                    Show on Map
                  </IonButton>
                  <IonButton
                    color="danger"
                    onClick={() => removeFavorite(fav.id)}
                  >
                    <IonIcon icon={trashBinOutline} slot="start" />
                    Remove
                  </IonButton>
                </div>
              </IonCardContent>
            </IonCard>
          ))
        )}
      </IonContent>
    </IonPage>
  );
};

export default FavoritesPage;
