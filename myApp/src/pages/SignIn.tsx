import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonInput, IonButton} from '@ionic/react';
import { useHistory } from 'react-router';
import { useState } from 'react';
import AppLogo from '../assets/icons/AppLogo.svg';
import './SignIn.css';

const SignIn: React.FC = () => {
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignIn = () => {
    //sign in logic fill in later
    setErrorMessage('Invalid username or password');

    //if (authSuccess) {navigate to home screen}
    //else {set error message}
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
          ></IonInput>
        </IonItem>

        {/* Log in button **add logic** */} 
        <IonButton 
          expand = "block" 
          style = {{marginTop: '50px'}} 
          shape = "round" 
          fill = "outline" 
          color = 'light'
          onClick={() => history.push('/Home')}
        >Log In</IonButton>

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