import React, { FC } from 'react'
import {
    IonModal, IonButton,
    IonContent, IonTitle,
    IonHeader, IonToolbar,
    IonButtons
} from '@ionic/react'

interface Props {
    isOpen: boolean,
    handleCahnge: any,
    title: string
}

const Modal: FC<Props> = ({ isOpen, handleCahnge, title, children }) => {
    return (
        <IonModal isOpen={isOpen} backdropDismiss>
            <IonHeader translucent>
                <IonToolbar color='secondary'>
                    <IonTitle>{title}</IonTitle>
                    <IonButtons slot="end">
                        <IonButton onClick={handleCahnge}>X</IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>

                {children}
                {/* <IonButton onClick={handleCahnge} expand="full" color='danger'>cerrar</IonButton> */}
            </IonContent>
            {/* <IonButton onClick={handleCahnge} color='primary'>Dar servicio</IonButton> */}
            
        </IonModal>
    )
}

export default Modal
