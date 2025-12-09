import { IonButton, IonContent, IonHeader, IonIcon, IonPage, IonSearchbar, IonSegment, IonSegmentButton, IonToolbar } from '@ionic/react';
import { personCircle, heart, heartOutline } from 'ionicons/icons';
import { useRef, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { getFavorites, saveFavorite, removeFavorite } from '../services/favoriteService';

// importing icons
import appLogo from '../assets/icons/AppLogo.svg';
import favorite from '../assets/icons/favorite.svg'
import restaurant from '../assets/icons/restaurant.svg'
import cart from '../assets/icons/cart.svg'
import temple from '../assets/icons/temple.svg';
import events from '../assets/icons/event.svg'

import snazzyMapStyle from '../assets/mapStyle/snazzyMapStyle.json';
console.log("Loaded snazzy style");

import './Home.css';

const Home: React.FC = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  
  // Add geocoder ref
  const geocoderRef = useRef<google.maps.Geocoder | null>(null);
  // Add marker ref
  const markerRef = useRef<google.maps.Marker | null>(null);

  // --------------------------------
  // STATE
  // --------------------------------

  const [favoriteLocations, setFavoriteLocations] = useState<Record<string, any>>({});
  const [showLikeButton, setShowLikeButton] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [clickedPosition, setClickedPosition] = useState<{ lat: number, lng: number } | null>(null);
  const [currentPositionKey, setCurrentPositionKey] = useState<string>('');
  
  // Add selected place info state
  const [selectedPlace, setSelectedPlace] = useState<{
    name: string;
    address: string;
    lat: number;
    lng: number;
  } | null>(null);
  
  // Add error state
  const [geocodeError, setGeocodeError] = useState<string | null>(null);

  const history = useHistory();

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
    return !!favoriteLocations[posKey];
  };

  // Simplified place name fetching function
  const getPlaceNameFromCoordinates = async (lat: number, lng: number): Promise<{
    name: string;
    address: string;
  }> => {
    // If no geocoder, return default value
    if (!geocoderRef.current) {
      return {
        name: `Location (${lat.toFixed(4)}, ${lng.toFixed(4)})`,
        address: ""
      };
    }

    try {
      // Try using Google Geocoder
      const response = await geocoderRef.current.geocode({
        location: { lat, lng }
      });

      if (response.results && response.results.length > 0) {
        const result = response.results[0];
        
        // Try to extract better name
        let bestName = result.formatted_address;
        
        // Check for establishment name
        if (result.address_components) {
          for (const comp of result.address_components) {
            if (comp.types.includes('establishment') || 
                comp.types.includes('point_of_interest') ||
                comp.types.includes('park') ||
                comp.types.includes('natural_feature')) {
              bestName = comp.long_name;
              break;
            }
          }
        }
        
        return {
          name: bestName,
          address: result.formatted_address
        };
      }
      
      // If no results, return coordinates
      return {
        name: `Location (${lat.toFixed(4)}, ${lng.toFixed(4)})`,
        address: ""
      };
      
    } catch (error) {
      console.error("❌ Geocoder failed:", error);
      
      // Try using free open-source service as fallback
      try {
        const osmResponse = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`,
          {
            headers: {
              'Accept-Language': 'en-US',
              'User-Agent': 'YourApp/1.0'
            }
          }
        );
        
        const osmData = await osmResponse.json();
        if (osmData.display_name) {
          return {
            name: osmData.display_name.split(',')[0], // Take first part as name
            address: osmData.display_name
          };
        }
      } catch (osmError) {
        console.error("OpenStreetMap also failed:", osmError);
      }
      
      // All methods failed, return coordinates
      return {
        name: `Location (${lat.toFixed(4)}, ${lng.toFixed(4)})`,
        address: ""
      };
    }
  };

  // Check current state
  const checkStorage = () => {
    console.log('='.repeat(40));
    console.log('🔍 Checking state');
    console.log('React state:', favoriteLocations);
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

    const newMap = new google.maps.Map(mapRef.current, {
      center: {
        lat: 40.43717459124654,
        lng: -79.95690639142943
      },
      zoom: 15,
      styles: snazzyMapStyle,
    });

    // Initialize geocoder
    geocoderRef.current = new google.maps.Geocoder();

    // Map click listener - modified for more reliable way
    newMap.addListener("click", async (event: google.maps.MapMouseEvent) => {
      if (!event.latLng) return;
      
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      const posKey = generatePositionKey(lat, lng);
      
      // Immediately show favorite panel, don't wait for geocoding
      setClickedPosition({ lat, lng });
      setCurrentPositionKey(posKey);
      const isSaved = isLocationFavorited(lat, lng);
      setIsLiked(isSaved);
      setShowLikeButton(true);
      
      // Immediately set default name (coordinates)
      setSelectedPlace({
        name: `Location (${lat.toFixed(4)}, ${lng.toFixed(4)})`,
        address: "",
        lat: lat,
        lng: lng
      });

      // Clear previous marker
      if (markerRef.current) {
        markerRef.current.setMap(null);
      }

      // Add new marker (show immediately)
      markerRef.current = new google.maps.Marker({
        position: { lat, lng },
        map: newMap,
        title: "Clicked location",
        animation: google.maps.Animation.DROP
      });

      console.log("📍 Clicked position:", lat, lng);
      console.log("🔄 Fetching place name...");

      // Asynchronously get place name (in background)
      setTimeout(async () => {
        try {
          const placeInfo = await getPlaceNameFromCoordinates(lat, lng);
          
          console.log("✅ Got place name:", placeInfo.name);
          
          // Update place info
          setSelectedPlace({
            name: placeInfo.name,
            address: placeInfo.address,
            lat: lat,
            lng: lng
          });
          
          // Update marker title
          if (markerRef.current) {
            markerRef.current.setTitle(placeInfo.name);
          }
          
          setGeocodeError(null);
          
        } catch (error) {
          console.error("❌ Failed to get place name:", error);
          setGeocodeError("Unable to get place name, please check network connection or API key");
          
          // Keep default coordinate name
          setSelectedPlace({
            name: `Location (${lat.toFixed(4)}, ${lng.toFixed(4)})`,
            address: "",
            lat: lat,
            lng: lng
          });
        }
      }, 100); // Delay 100ms to let UI respond first
    });

    mapInstanceRef.current = newMap;
  };

  useEffect(() => {
    if(mapRef.current) {
      createMap();
    }
  }, []);

  // --------------------------------
  // LIKE - UNLIKE HANDLER
  // --------------------------------

  const handleLikeClick = async () => {
  if (!clickedPosition) return;

  const poskey = `${clickedPosition.lat.toFixed(6)}_${clickedPosition.lng.toFixed(6)}`;

  if (isLiked) {
    // UNLIKE → uses backend service
    const updated = await removeFavorite(poskey);
    setFavoriteLocations(updated);
    setIsLiked(false);
    console.log('🗑️ Removed from favorites');
  } else {
    // LIKE use saveFavorite so it talks to backend + localStorage
    const name =
      selectedPlace?.name ||
      `Location (${clickedPosition.lat.toFixed(4)}, ${clickedPosition.lng.toFixed(4)})`;

    const favoriteData = {
      name,
      city: "",         
      cuisine: "",       
      lat: clickedPosition.lat,
      lng: clickedPosition.lng,
    };

    console.log('💾 Saved to favorites (via service):', favoriteData.name);

    const updated = await saveFavorite(poskey, favoriteData);
    setFavoriteLocations(updated);
    setIsLiked(true);
  }
};

  const handleCloseButton = () => {
    // Clear marker
    if (markerRef.current) {
      markerRef.current.setMap(null);
    }
    setShowLikeButton(false);
  };

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
          <div
            ref={mapRef}
            style={{ width: "100%", height: "100%" }}
          ></div>

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

          {/* Error message */}
          {geocodeError && (
            <div style={{
              position: 'fixed',
              top: '150px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 10000,
              background: '#ffebee',
              color: '#c62828',
              padding: '10px 20px',
              borderRadius: '8px',
              fontSize: '14px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <span>⚠️</span>
              <span>{geocodeError}</span>
              <button 
                onClick={() => setGeocodeError(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#c62828',
                  fontSize: '16px',
                  cursor: 'pointer'
                }}
              >
                ×
              </button>
            </div>
          )}

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
              minWidth: '280px',
              maxWidth: '350px'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '12px',
                paddingBottom: '8px',
                borderBottom: '1px solid #eee'
              }}>
                <div style={{ flex: 1 }}>
                  {/* Display place name */}
                  <div style={{ 
                    fontSize: '16px', 
                    fontWeight: '600', 
                    color: '#333', 
                    marginBottom: '4px',
                    wordBreak: 'break-word'
                  }}>
                    {selectedPlace?.name || `Location (${clickedPosition.lat.toFixed(4)}, ${clickedPosition.lng.toFixed(4)})`}
                  </div>
                  
                  {/* Display detailed address */}
                  {selectedPlace?.address && selectedPlace.address !== selectedPlace.name && (
                    <div style={{ 
                      fontSize: '12px', 
                      color: '#666', 
                      marginTop: '4px',
                      wordBreak: 'break-word'
                    }}>
                      {selectedPlace.address}
                    </div>
                  )}
                  
                  {/* Coordinate info */}
                  <div style={{
                    fontSize: '10px',
                    color: '#888',
                    marginTop: '6px',
                    fontFamily: 'monospace'
                  }}>
                    {currentPositionKey}
                  </div>
                  
                  {/* Display loading status */}
                  {!selectedPlace?.address && (
                    <div style={{
                      fontSize: '11px',
                      color: '#999',
                      marginTop: '6px',
                      fontStyle: 'italic'
                    }}>
                      Fetching place information...
                    </div>
                  )}
                </div>
                
                {/* Close button for favorite button panel */}
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
                    height: '24px',
                    flexShrink: 0,
                    marginLeft: '10px'
                  }}
                >
                  ×
                </button>
              </div>

              {/* Like / Unlike button */} 
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
                {isLiked ? 'Remove Favorite' : 'Add to Favorites'}
              </IonButton>
            </div>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;