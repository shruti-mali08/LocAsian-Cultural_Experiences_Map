import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonInput, IonButton} from '@ionic/react';
import { useHistory } from 'react-router';
import { useState } from 'react';
import AppLogo from '../assets/icons/AppLogo.svg';
import './SignIn.css';

const SignIn: React.FC = () => {
  const history = useHistory();
  
  const [errorMessage, setErrorMessage] = useState('');
  const [usernameValue, setUsernameValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  const handleSignIn = async () => {
  // AI generated code snippit for handling sign up logic 
    const response = await fetch('http://localhost:8080/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: usernameValue,
        password: passwordValue
      })
    });

    console.log('Response status:', response.status);

    if (response.ok) {
      // SUCCESS! User was saved
      console.log('User login successful!');
      history.replace('/home');
    } else {
      // ERROR from backend
      const errorText = await response.text();
      setErrorMessage(errorText || 'Sign in failed');
    }
  }


  return (
    <IonPage>
      <IonContent className="ion-padding reggae-font" style={{ '--background': '#C5472A' }}>
        {/* Display the app logo at the top */}
        <img src={AppLogo} alt="Logo" style={{ width: '258px', margin: '20px auto', display: 'block' }} />

        <div style = {{ marginTop: '20px'}}>
          <IonLabel className="title-font"> Sign In</IonLabel> 
        </div>
        <br></br>

        {/* Username field */}
        <IonLabel position="floating" >Username</IonLabel>
        <IonItem style = {{ marginTop: '10px' }}>
          <IonInput 
              type="text"
              fill = "solid"
              labelPlacement='stacked'
              clearInput = {true}
              placeholder="Enter username"
              onIonChange={e => setUsernameValue(e.detail.value!)}
              ></IonInput>
        </IonItem>

        <br></br>

        {/* Password field */}
          <IonLabel position="floating" >Password</IonLabel>
        <IonItem style = {{ marginTop: '10px' }}>
          <IonInput 
            type="password" 
            fill = "solid"
            placeholder="Enter password"
            clearInput = {true}
            onIonChange={e => setPasswordValue(e.detail.value!)}
          ></IonInput>
        </IonItem>

        {/* Log in button **add logic** */} 
        <IonButton 
          expand = "block" 
          style = {{marginTop: '50px'}} 
          shape = "round" 
          fill = "outline" 
          color = 'light'
          onClick={handleSignIn}
        >Log In</IonButton> {
          errorMessage && (
            <div style={{ color: 'red', marginTop: '10px', textAlign: 'center' }}>
              {errorMessage}
            </div>
          )
        }

        {/* Sign up button */}
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <span style={{ color: '#000' }}>Don't have an account? </span>
          <span 
            style={{ 
              color: '#007bff', 
              cursor: 'pointer', 
              fontWeight: 'bold',
              textDecoration: 'underline'
            }}
            onClick={() => history.push('/SignUp')}
          >
            Sign Up
          </span>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SignIn;