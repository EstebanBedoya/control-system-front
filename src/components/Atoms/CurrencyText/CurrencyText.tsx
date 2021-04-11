import { IonText } from "@ionic/react";
import React from "react";

interface props {
  value: number;
}

const currencyFormat = (number: number) =>
  Intl.NumberFormat("es-CO", { style: "currency", currency: "COL" }).format(
    number
  );

const CurrencyText: React.FC<props> = ({ value }) => {
    const newValue = currencyFormat(value)
    const removeComma = newValue.toString().replace(/\D00(?=\D*$)/, '')
    
  return (
    <>
      <IonText color="secondary">{removeComma}</IonText>
    </>
  );
};

export default CurrencyText;
