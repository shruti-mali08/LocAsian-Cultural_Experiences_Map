import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

const SignUp: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Sign Up</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <h1>Sign Up Page</h1>
        <p>Sign up form will go here</p>
      </IonContent>
    </IonPage>
  );
};

export default SignUp;