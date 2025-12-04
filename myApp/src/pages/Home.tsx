import { IonButton, IonContent, IonHeader, IonIcon, IonPage, IonSearchbar, IonSegment, IonSegmentButton, IonToolbar } from '@ionic/react';
import { personCircle, heart, heartOutline } from 'ionicons/icons';
import { GoogleMap } from '@capacitor/google-maps';
import { useRef, useState, useEffect, use } from 'react';
import { useHistory } from 'react-router-dom';

import { getFavorites, saveFavorite, removeFavorite } from '../services/favoriteService';

// importing icons
import appLogo from '../assets/icons/AppLogo.svg';
import favorite from '../assets/icons/favorite.svg'
import restaurant from '../assets/icons/restaurant.svg'
import cart from '../assets/icons/cart.svg'
import temple from '../assets/icons/temple.svg';
import events from '../assets/icons/event.svg'

import './Home.css';

const Home: React.FC = () => {
  const key = "AIzaSyCP8EsvZJGXQoJhkD5P9Sukkrp4ypF4KEU";
  const mapRef = useRef<HTMLElement | null>(null);
  const mapInstanceRef = useRef<GoogleMap | null>(null);

  // --------------------------------
  // STATE
  // --------------------------------

  const [favoriteLocations, setFavoriteLocations] = useState<Record<string, boolean>>({});
  const [showLikeButton, setShowLikeButton] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [clickedPosition, setClickedPosition] = useState<{ lat: number, lng: number } | null>(null);
  const [currentPositionKey, setCurrentPositionKey] = useState<string>('');

  const history = useHistory();       // Used elsewhere in the file to navigate when an IonSegment button is clicked.

  // --------------------------------
  // FETCH FAVORITES ON LOAD
  // --------------------------------

  useEffect(() => {
    let mounted = true;
    getFavorites().then((data: {}) => {
      if (mounted) {
        setFavoriteLocations(data);
        console.log(' Loaded from localStorage:', Object.keys(data).length, 'locations');
      }
    });
    return () => { mounted = false; };
  }, [])

  // --------------------------------
  // HELPER FUNCTIONS
  // --------------------------------

  const generatePositionKey = (lat: number, lng: number) => {
    return `${lat.toFixed(6)}_${lng.toFixed(6)}`;
  };

  const isLocationFavorited = (lat: number, lng: number): boolean => {
    const posKey = generatePositionKey(lat, lng);
    return !!favoriteLocations[posKey]; // true if saved, false otherwise
  };

  // Check current state
  const checkStorage = () => {
    console.log('='.repeat(40));
    console.log('🔍 Checking state');
    console.log('React state:', favoriteLocations);
    // console.log('Ref state:', favoriteLocationsRef.current);
    console.log('localStorage:', localStorage.getItem('favoriteLocations'));
    console.log('Current key:', currentPositionKey);
    console.log('Current favorite:', isLiked);
    console.log('='.repeat(40));
  };

  // Clear all data
  const clearAllData = () => {
    if (window.confirm('Clear all favorites?')) {
      setFavoriteLocations({});
      setIsLiked(false);
      console.log('All data cleared');
    }
  };

  // --------------------------------
  // MAP CREATION
  // --------------------------------

  const createMap = async () => {
    if (!mapRef.current) return;

    const newMap = await GoogleMap.create({
      id: "google-map",
      element: mapRef.current,
      apiKey: key,
      config: {
        center: {
          lat: 40.43717459124654,
          lng: -79.95690639142943
        },
        zoom: 15.3
      }
    });

    mapInstanceRef.current = newMap;

    // Map click listener
    newMap.setOnMapClickListener(async (event) => {
      const posKey = generatePositionKey(event.latitude, event.longitude);

      console.log('='.repeat(40));
      console.log(' Clicked:', posKey);

      setClickedPosition({ lat: event.latitude, lng: event.longitude });

      setCurrentPositionKey(posKey);

      // Check favorite status
      const isSaved = isLocationFavorited(event.latitude, event.longitude);
      setIsLiked(isSaved);

      console.log(`Favorite status: ${isSaved ? ' Favorited' : ' Not favorited'}`);
      console.log('='.repeat(40));

      setShowLikeButton(true);
    });
  };

  useEffect(() => {
    setTimeout(() => {
      createMap();
    }, 300);
  }, []);


  // --------------------------------
  // LIKE - UNLIKE HANDLER
  // --------------------------------

  const handleLikeClick = async () => {
    if (!clickedPosition) return;

    const poskey = `${clickedPosition.lat.toFixed(6)}_${clickedPosition.lng.toFixed(6)}`;
    console.log('='.repeat(40));

    if (isLiked) {
      const updated = await removeFavorite(poskey);
      setFavoriteLocations(updated);
      setIsLiked(false);

      console.log('🗑️ Removed from favorites');
    }
    else {
      const updated = await saveFavorite(poskey);
      setFavoriteLocations(updated);
      setIsLiked(true);

      console.log('💾 Saved to favorites');
    }
  };

  const handleCloseButton = () => setShowLikeButton(false);

  // --------------------------------
  // GOOGLE POPUP DETECTION
  // --------------------------------

  useEffect(() => {
    if (!showLikeButton) return;

    const checkForGooglePopup = () => {
      const selectors = [
        '.gm-style-iw',
        '.gm-ui-hover-effect',
        '[role="dialog"]'
      ];

      const googlePopup = document.querySelector(selectors.join(', '));

      if (!googlePopup) {
        setShowLikeButton(false);
      }
    };

    checkForGooglePopup();
    const interval = setInterval(checkForGooglePopup, 500);

    return () => clearInterval(interval);
  }, [showLikeButton]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <div style={{ display: "flex", gap: "10px", margin: "15px", alignItems: "center" }}>
          <IonIcon icon={appLogo} size="large" color="primary"></IonIcon>
          <IonSearchbar></IonSearchbar>
          <IonIcon icon={personCircle} size="large" color="primary"></IonIcon>
          </div>
          <IonSegment scrollable={true}>
            <IonSegmentButton value="favorite" onClick={() => history.push('/favorites')}>
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
        <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
          <capacitor-google-map
            ref={mapRef}
            style={{
              display: 'inline-block',
              width: "100%",
              height: "100%"
            }}
          ></capacitor-google-map>

          {/* Debug buttons */}
          <div style={{
            position: 'fixed',
            top: '100px',
            left: '10px',
            zIndex: 10000,
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}>
            <button
              onClick={checkStorage}
              style={{
                background: '#3880ff',
                color: 'white',
                padding: '8px 12px',
                border: 'none',
                borderRadius: '6px',
                fontSize: '12px',
                cursor: 'pointer'
              }}
            >
              Check ({Object.keys(favoriteLocations).length})
            </button>

            <button
              onClick={clearAllData}
              style={{
                background: '#ff3d3d',
                color: 'white',
                padding: '8px 12px',
                border: 'none',
                borderRadius: '6px',
                fontSize: '12px',
                cursor: 'pointer'
              }}
            >
              Clear All
            </button>
          </div>

          {/* Favorite button panel */}
          {showLikeButton && clickedPosition && (
            <div style={{
              position: 'fixed',
              bottom: '120px',
              right: '20px',
              zIndex: 1000,
              background: 'white',
              borderRadius: '12px',
              padding: '15px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
              minWidth: '180px'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '12px',
                paddingBottom: '8px',
                borderBottom: '1px solid #eee'
              }}>
                <div style={{ fontSize: '14px', fontWeight: '600', color: '#333' }}>
                  {isLiked ? '✓ Favorited' : 'Save Location'}
                </div>
                <button
                  onClick={handleCloseButton}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '20px',
                    cursor: 'pointer',
                    color: '#666',
                    padding: '0',
                    width: '24px',
                    height: '24px'
                  }}
                >
                  ×
                </button>
              </div>

              <div style={{
                fontSize: '11px',
                color: '#666',
                marginBottom: '12px',
                fontFamily: 'monospace',
                backgroundColor: '#f8f9fa',
                padding: '6px 8px',
                borderRadius: '4px'
              }}>
                {currentPositionKey}
              </div>

              <IonButton
                fill="solid"
                color={isLiked ? "danger" : "medium"}
                onClick={handleLikeClick}
                expand="block"
                style={{
                  '--border-radius': '8px'
                }}
              >
                <IonIcon
                  icon={isLiked ? heart : heartOutline}
                  slot="start"
                />
                {isLiked ? 'Remove' : 'Save'}
              </IonButton>
            </div>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;