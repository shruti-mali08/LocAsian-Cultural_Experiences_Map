import { IonContent, IonPage, IonButton, IonLabel, IonItem, IonInput} from '@ionic/react';
import './SignIn.css';
import { useHistory } from 'react-router';
import {useState} from 'react';
import AppLogo from '../assets/icons/AppLogo.svg';

const SignUp: React.FC = () => {
  const history = useHistory();
  const [usernameValue, setUsernameValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  const handleSignUp = async () => {
  // AI generated code snippit for handling sign up logic 
    try {
      const response = await fetch('http://localhost:8080/saveUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: 'testuser',
          password: 'password123'
        })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        // Success!
        history.push('/Home');
      } else {
        // Error
        console.error(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error(`Network error`);
    }
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
              onIonChange={e => setUsernameValue(e.detail.value!)}
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
            onIonChange={e => setPasswordValue(e.detail.value!)}
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