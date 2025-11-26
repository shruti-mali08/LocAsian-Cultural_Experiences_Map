import { IonContent, IonPage, IonButton, IonLabel, IonItem, IonInput} from '@ionic/react';
import './SignIn.css';
import {useState} from 'react';
import AppLogo from '../assets/icons/AppLogo.svg';

const SignUp: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignUp = () => {
    //sign up logic fill in later
    
  }

  return (
    <IonPage>
      <IonContent className="ion-padding reggae-font" style={{ '--background': '#C5472A' }}>
        
        <img src={AppLogo} alt="Logo" style={{ width: '141px', margin: '20px auto', display: 'block' }} />

        <div style = {{ marginTop: '40px'}}>
          <h1>Sign Up</h1>
        </div>

        {/* Username field */}
        <IonLabel position="floating" >Enter valid username (9-12 characters):</IonLabel>
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
          <IonLabel position="floating" >Enter password (at least one special character):</IonLabel>
        <IonItem style = {{ marginTop: '10px' }}>
          <IonInput 
            type="password" 
            fill = "solid"
            placeholder="Enter password"
            clearInput = {true}
          ></IonInput>
        </IonItem>

        {/* Sign up button */}
        <IonButton 
          expand = "block" 
          style = {{marginTop: '50px'}} 
          shape = "round" 
          fill = "outline" 
          color = 'light'
          onClick=  {handleSignUp}
        >Log In</IonButton>

      </IonContent>
    </IonPage>
  );
};

export default SignUp;