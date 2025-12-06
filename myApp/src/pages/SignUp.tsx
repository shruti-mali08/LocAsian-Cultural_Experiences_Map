import { IonContent, IonPage, IonButton, IonLabel, IonItem, IonInput} from '@ionic/react';
import './SignIn.css';
import { useHistory } from 'react-router';
import {useState} from 'react';
import AppLogo from '../assets/icons/AppLogo.svg';

const SignUp: React.FC = () => {
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState('');
  const [usernameValue, setUsernameValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  
  const handleSignUp = async () => {
    // AI generated code snippit for handling sign up logic 

    //return a boolean for whether the username is unique
    const uniqueUser = await fetch(`http://localhost:8080/auth/checkUsername?username=${usernameValue}`);
    
    const isUnique = await uniqueUser.json(); 
  
    if(!isUnique){
      setErrorMessage('Username is already taken. Please choose another one.');
      return;
    }
    const response = await fetch('http://localhost:8080/saveUser', {
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
      console.log('User saved successfully!');
      history.replace('/home');
    } else {
      // ERROR from backend
      const errorText = await response.text();
      setErrorMessage(errorText || 'Sign up failed');
    }
  }


  return (
    <IonPage>
      {errorMessage && (
       <div style={{ 
        color: 'red', 
        marginTop: '20px', 
        textAlign: 'center',
        padding: '10px',
        backgroundColor: '#ffe6e6',
        borderRadius: '5px'
        }}>
          {errorMessage}
      </div>
      )}

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
        >Sign Up</IonButton> {
          errorMessage && (
            <div style={{ color: 'red', marginTop: '10px', textAlign: 'center' }}>
              {errorMessage}
            </div>
          )
        }

      </IonContent>
    </IonPage>
  );
};

export default SignUp;