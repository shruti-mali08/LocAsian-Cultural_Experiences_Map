import {IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonIcon} from "@ionic/react";
import { arrowUndoCircleOutline} from "ionicons/icons";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { getLocations, Location} from "../services/eventsService";

import './Events.css';

const Events: React.FC = () => {
    const [Locations, setLocations] = useState<Location[]>([]);
    const[loading, setLoading] = useState<boolean>(true);

    const history = useHistory();

    useEffect(() => {
        const loadLocations = async () => {
            try {
                const data = await getLocations();
                setLocations(data);
            } catch {
                console.error("Failed to load locations");
            } finally {
                setLoading(false);
            }
        };

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
                        <IonTitle className="reggae-font">Explore Events</IonTitle>
                    </div>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen style={{ '--background': '#C5472A'}} className='reggae-font'>
                {loading ? (
                    <p style={{ padding: "20px", textAlign: "center" }}>Loading...</p>
                ) : Locations.length === 0 ? (
                    <p style={{ padding: "30px", textAlign: "center" }}>
                        No restaurants found!
                    </p>
                ) : (
                    Locations.map((location) => (
                        <IonCard key={location.id} className="location-card">
                            <IonCardHeader>
                                <IonCardTitle className="card-title">{location.name}</IonCardTitle>
                            </IonCardHeader>
                            <hr className="card-divider" />
                            <IonCardContent className="card-content">
                                <p><strong>Address:</strong> {location.address}</p>
                                <p><strong>Details:</strong> {location.details}</p>
                            </IonCardContent>
                        </IonCard>
                    ))
                )}
            </IonContent>
        </IonPage>
    );
};

export default Events;