import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonInput, IonButton} from '@ionic/react';
import AppLogo from '../assets/icons/AppLogo.svg';

const SignIn: React.FC = () => {
  return (
    <IonPage>
      <IonContent className="ion-padding" style={{ '--background': '#C5472A' }}>
        <img src={AppLogo} alt="Logo" style={{ width: '150px', margin: '20px auto', display: 'block' }} />

        <IonItem>
          <IonLabel position="floating">Username</IonLabel>
          <IonInput type="text" placeholder="Enter username"></IonInput>
        </IonItem>

        <IonItem>
          <IonLabel position="floating">Password</IonLabel>
          <IonInput type="password" placeholder="Enter password"></IonInput>
        </IonItem>

        // random ah button
        <IonButton>Default</IonButton>
        <IonButton disabled={true}>Disabled</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default SignIn;