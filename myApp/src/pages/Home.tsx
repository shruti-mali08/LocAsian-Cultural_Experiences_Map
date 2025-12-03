import { IonButton, IonContent, IonHeader, IonIcon, IonPage, IonSearchbar, IonSegment, IonSegmentButton, IonToolbar } from '@ionic/react';
import appLogo from '../assets/icons/AppLogo.svg';
import { personCircle } from 'ionicons/icons';
import { GoogleMap } from '@capacitor/google-maps';
import { useRef, useState, useEffect } from 'react';
import { heart, heartOutline } from 'ionicons/icons';

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
  
  const [showLikeButton, setShowLikeButton] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [clickedPosition, setClickedPosition] = useState<{lat: number, lng: number} | null>(null);
  const [currentPositionKey, setCurrentPositionKey] = useState<string>('');
  
  // Favorite locations state
  const [favoriteLocations, setFavoriteLocations] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('favoriteLocations');
      return saved ? JSON.parse(saved) : {};
    } catch (error) {
      return {};
    }
  });

  // Use ref to store latest state
  const favoriteLocationsRef = useRef(favoriteLocations);

  // Sync ref with state
  useEffect(() => {
    favoriteLocationsRef.current = favoriteLocations;
    console.log('Ref updated:', favoriteLocations);
  }, [favoriteLocations]);

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('favoriteLocations', JSON.stringify(favoriteLocations));
      console.log(' Saved to localStorage:', Object.keys(favoriteLocations).length, 'locations');
    } catch (error) {
      console.error('Save failed:', error);
    }
  }, [favoriteLocations]);

  // Detect Google popup
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

  // Generate position key
  const generatePositionKey = (lat: number, lng: number): string => {
    return `${lat.toFixed(6)}_${lng.toFixed(6)}`;
  };

  // Find saved location - use ref to get latest state
  const findSavedLocation = (lat: number, lng: number): boolean => {
    const posKey = generatePositionKey(lat, lng);
    const currentFavorites = favoriteLocationsRef.current;
    
    console.log(' Searching:', posKey);
    console.log('Current data:', currentFavorites);
    
    // Exact match
    if (currentFavorites[posKey] === true) {
      console.log(' Exact match found');
      return true;
    }
    
    // Search nearby
    for (const [savedKey, savedValue] of Object.entries(currentFavorites)) {
      if (savedValue === true) {
        const [savedLatStr, savedLngStr] = savedKey.split('_');
        const savedLat = parseFloat(savedLatStr);
        const savedLng = parseFloat(savedLngStr);
        
        const latDiff = Math.abs(savedLat - lat);
        const lngDiff = Math.abs(savedLng - lng);
        
        if (latDiff < 0.00001 && lngDiff < 0.00001) {
          console.log(` Nearby location found: ${savedKey}`);
          setCurrentPositionKey(savedKey);
          return true;
        }
      }
    }
    
    console.log(' Not found');
    return false;
  };

  const createMap = async () => {
    if (!mapRef.current) return;

    const newMap = await GoogleMap.create({
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

    mapInstanceRef.current = newMap;

    // Map click listener
    newMap.setOnMapClickListener(async (event) => {
      const posKey = generatePositionKey(event.latitude, event.longitude);
      
      console.log('='.repeat(40));
      console.log(' Clicked:', posKey);
      
      setClickedPosition({
        lat: event.latitude,
        lng: event.longitude
      });
      
      setCurrentPositionKey(posKey);
      
      // Check favorite status
      const isSaved = findSavedLocation(event.latitude, event.longitude);
      setIsLiked(isSaved);
      
      console.log(`Favorite status: ${isSaved ? ' Favorited' : ' Not favorited'}`);
      console.log('='.repeat(40));
      
      setShowLikeButton(true);
    });
  }

  // Like/Unlike - use functional update for consistency
  const handleLikeClick = () => {
    if (!clickedPosition) return;
    
    const saveKey = `${clickedPosition.lat.toFixed(6)}_${clickedPosition.lng.toFixed(6)}`;
    
    console.log('='.repeat(40));
    console.log(' Action:', saveKey);
    console.log('Current state:', isLiked);
    
    // Use functional update to ensure consistency
    setFavoriteLocations(prev => {
      const newLikedState = !isLiked;
      let updatedFavorites;
      
      if (newLikedState) {
        // Add to favorites
        updatedFavorites = {
          ...prev,
          [saveKey]: true
        };
        console.log('💾 Saved to favorites');
      } else {
        // Remove from favorites
        updatedFavorites = { ...prev };
        delete updatedFavorites[saveKey];
        console.log('🗑️ Removed from favorites');
      }
      
      console.log('Updated data:', updatedFavorites);
      
      // Update UI state immediately
      setIsLiked(newLikedState);
      
      return updatedFavorites;
    });
    
    console.log('='.repeat(40));
  };

  const handleCloseButton = () => {
    setShowLikeButton(false);
  };

  // Check current state
  const checkStorage = () => {
    console.log('='.repeat(40));
    console.log('🔍 Checking state');
    console.log('React state:', favoriteLocations);
    console.log('Ref state:', favoriteLocationsRef.current);
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

  useEffect(() => {
    setTimeout(() => {
      createMap();
    }, 300);
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonIcon icon={appLogo} size="large" color="primary"></IonIcon>
          <IonSearchbar></IonSearchbar>
          <IonIcon icon={personCircle} size="large" color="primary"></IonIcon>
          <IonSegment scrollable={true}>
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