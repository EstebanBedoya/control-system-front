import React, { FC } from 'react'
import { IonLabel } from '@ionic/react'

interface Props {
    item: any
}

const ServiceContentItem: FC<Props> = ({ item }) => {
    return (
        <>
            <IonLabel>
                <h2>Hora</h2>
                <h2>{item.hour}</h2>
            </IonLabel>

            <IonLabel>
                <h2>Habitación</h2>
                <h2>{item.room}</h2>
            </IonLabel>

            <IonLabel>
                <h2>Precio: {item.price}</h2>
            </IonLabel>
        </>
    )
}

export default ServiceContentItem
