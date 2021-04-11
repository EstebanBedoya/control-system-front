import React, { FC} from "react";
import { IonLabel, IonSegment, IonSegmentButton } from "@ionic/react";

interface props {
  handleChange: any;
  segments: any
}

const RenderSegmentButton = ({text, value }: any, i: number) => {
  return (
    <IonSegmentButton value={value} key={i}>
        <IonLabel>{text}</IonLabel>
      </IonSegmentButton>
  )
}

const Segments: FC<props> = ({ handleChange, segments }) => {

  return (
    <IonSegment scrollable onIonChange={handleChange}>
      {
        segments?.map((value: string, i: number) => RenderSegmentButton(value, i))
      }
    </IonSegment>
  );
};

export default Segments;
