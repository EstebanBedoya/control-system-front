import React, { useState } from "react";
import {
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonItem,
  IonDatetime,
} from "@ionic/react";
import moment from "moment";

interface props {
  setSelectedDate: any;
}

const today = moment().format("DD/MM/YYYY");
// const mounth = moment().format("MM/YYYY");
const year = moment().format("YYYY");

const filter = (type: string, date = "") => {
  switch (type) {
    case "date":
      return date ? moment(date).format("DD/MM/yyyy") : "DD/MMM/YYYY";

    case "month":
      return date ? moment(date).format("MM/yyyy") : "MMM/YYYY";

    case "year":
      return date ? moment(date).format("yyyy") : "YYYY";
  }
};

const FilterDate: React.FC<props> = ({setSelectedDate }) => {
  const [typeFilter, setTypeFilter] = useState("date");

  const handleSelect = (e: any) => {
    const event = e.detail.value!;
    // console.log(filter(typeFilter, event))
    setSelectedDate(filter(typeFilter, event));
  };

  return (
    <>
      <IonItem >
        <IonLabel>
          <h1>Seleccion el filtro</h1>
        </IonLabel>
        <IonSelect
          value={typeFilter}
          interface="action-sheet"
          onIonChange={(e: any) => setTypeFilter(e.target.value)}
        >
          <IonSelectOption value="date">Por dia</IonSelectOption>
          <IonSelectOption value="month">Por mes</IonSelectOption>
          <IonSelectOption value="year">Por año</IonSelectOption>
        </IonSelect>
      </IonItem>
      <IonItem>
        <IonDatetime
          displayFormat={filter(typeFilter)}
          min="2020"
          max={year}
          doneText='Aceptar'
          cancelText='Cancelar'
          placeholder={today}
          onIonChange={handleSelect}
        />
      </IonItem>
    </>
  );
};

export default FilterDate
