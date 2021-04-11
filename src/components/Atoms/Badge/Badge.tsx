import React, { FC } from 'react'
import { IonBadge } from '@ionic/react'

interface Props {
    text: string,
    color: any,
}

const Badge: FC<Props> = ({ text, color }) => {

    return (
        <>
            <IonBadge color={color} slot='end'> {text} </IonBadge>
        </>
    )
}

export default Badge
