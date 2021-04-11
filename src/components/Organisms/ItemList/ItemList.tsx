import React, { FC } from "react";
import { IonList } from "@ionic/react";
import Item from "../../Molecules/Item";

const renderItem = (type: string, item: any, index: number) => {
  // const key = type === 'room'? item.id: `${item.date}-${item.hour}`
  return <Item key={index} type={type} item={item} />;
};

interface Props {
  array: any;
  type: string;
}

const ItemList: FC<Props> = ({ array, type }) => {
  return (
    <IonList>
      {array.map((item: any, index: number) => renderItem(type, item, index))}
    </IonList>
  );
};

export default ItemList;
