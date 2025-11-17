import { IonButton, IonCol, IonContent, IonHeader, IonIcon, IonPage, IonRow, IonSearchbar, IonSegment, IonSegmentButton, IonTitle, IonToolbar, useIonViewWillEnter } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import appLogo from '../assets/icons/AppLogo.svg';
import { personCircle } from 'ionicons/icons';
import { GoogleMap } from '@capacitor/google-maps';
import { useRef, useState, useEffect } from 'react';

//emojis from https://openmoji.org/library/
import favorite from '../assets/icons/favorite.svg'
import restaurant from '../assets/icons/restaurant.svg'
import cart from '../assets/icons/cart.svg'
import temple from '../assets/icons/temple.svg';
import events from '../assets/icons/event.svg'

import './Home.css';

const Home: React.FC = () => {

  const key = "AIzaSyCP8EsvZJGXQoJhkD5P9Sukkrp4ypF4KEU";
  let newMap: GoogleMap;
  const mapRef = useRef<HTMLElement | null>(null);

  // const mapConfig = useState({
  //   center: {
  //     lat: 40.44465230171622, 
  //     lng: -79.9531550909362
  //   },
  //   zoom: 12
  // });

  const createMap = async () => {

    if (!mapRef.current) return;

    newMap = await GoogleMap.create({
      id: "google-map",
      element: mapRef.current,
      apiKey: key,
      config: {
        center: {
          lat: 40.44465230171622,
          lng: -79.9531550909362
        },
        zoom: 12
      }
    });
  }

  useEffect(() => {
    setTimeout(() => {
      createMap();
    }, 300); // wait 300ms for DOM to mount
  }, []);


  return (
    <IonPage>

      <IonHeader>
        <IonToolbar>
          <IonIcon icon={appLogo} size="large" color="primary"></IonIcon>
          <IonSearchbar></IonSearchbar>
          <IonIcon icon={personCircle} size="large" color="primary"></IonIcon>
          <IonSegment scrollable={true}> {/* Setting size in css file */}
            <IonSegmentButton value="favorite">
              <IonIcon icon={favorite}></IonIcon>
              Favorite
            </IonSegmentButton>
            <IonSegmentButton value="restaurant">
              <IonIcon icon={restaurant}></IonIcon>
              Restaurant
            </IonSegmentButton>
            <IonSegmentButton value="cart">
              <IonIcon icon={cart}></IonIcon>
              Grocery Stores
            </IonSegmentButton>
            <IonSegmentButton value="cultural">
              <IonIcon icon={temple}></IonIcon>
              Cultural Spots
            </IonSegmentButton>
            <IonSegmentButton value="events">
              <IonIcon icon={events}></IonIcon>
              Events
            </IonSegmentButton>
          </IonSegment>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {/* <IonButton routerLink="/search">Navigate</IonButton> */}
        {/* <ExploreContainer /> */}

        <div>
            <capacitor-google-map ref={mapRef} style={{
              display: 'inline-block',
              width: "100%",
              height: "100vh"
            }}></capacitor-google-map>
        </div>
      </IonContent>

    </IonPage>
  );
};

export default Home;
