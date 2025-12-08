import {IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonIcon} from "@ionic/react";
import { locationOutline, trashBinOutline, arrowUndoCircleOutline} from "ionicons/icons";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { getLocations, Location} from "../services/eventsService";

const Events: React.FC = () => {
    const [Locations, setLocations] = useState<Location[]>([]);
    const[loading, setLoading] = useState<boolean>(true);

    const history = useHistory();

    // Load events from service
    useEffect(() => {
        const loadLocations = async () => {
            try {
                const data = await getLocations();
                setLocations(data);
            } catch {
                console.error("Failed to load locations");
            }
        };

    //call on 
    loadLocations();
    }, []);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <div style={{ display: "flex" }}>
                    <IonButton onClick={() => history.push("/home")}>
                        <IonIcon icon={arrowUndoCircleOutline} />
                    </IonButton>
                    <IonTitle>Events</IonTitle>
                    </div>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
                {loading ? (
                    <p style={{ padding: "20px", textAlign: "center" }}>Loading...</p>
                ) : Locations.length === 0 ? (
                <p style={{ padding: "20px", textAlign: "center" }}>
                    No restaurants found!
                </p>
                ) : (
                    Locations.map((location) => (
                        <IonCard key={location.id}>
                        <IonCardHeader>
                            <IonCardTitle>{location.name}</IonCardTitle>
                        </IonCardHeader>
                        <IonCardContent>
                            {location.details && <p>Address: {location.address}</p>}
                        </IonCardContent>
                        </IonCard>
                    ))
                )}
            </IonContent>
        </IonPage>
    );
};

export default Events;