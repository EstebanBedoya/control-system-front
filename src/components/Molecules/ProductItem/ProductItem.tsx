import React, { FC, useState } from "react";
import {
  IonButton,
  IonCol,
  IonGrid,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonRow,
  IonText,
} from "@ionic/react";
import { checkmarkOutline } from "ionicons/icons";

import Picker from "../Picker";
import { useDispatch, useSelector } from "react-redux";
import { updateProductStockAction } from "../../../redux/barDucks";
// import { updateProductStockAction } from "../../../redux/barDucks";

import { socket } from "../../../services/sockets.service";

import states from "../../../utils/states";

interface props {
  name: string;
  price: number;
  stock: number;
  save: any;
  _id: any;
  isChange: boolean;
  token: string;
}

const { ocupado } = states;

const ProductItem: FC<props> = ({
  _id,
  name,
  price,
  stock,
  save,
  isChange,
  token,
}) => {
  const rooms = useSelector((state: any) =>
    state.rooms
      .filter((item: any) => item.state === ocupado)
      .map((item: any) => item.id)
  );

  const [openPicker, setOpenPicker] = useState<boolean>(false);
  const [numList, setNumList] = useState<number[]>([]);
  const [stockAdd, setStockAdd] = useState<number>(0);

  const dispatch = useDispatch();

  const handleClick = () => {
    let list: any = [];
    stock > 0 && setOpenPicker(true);

    for (let i = 1; i <= stock; i++) {
      list.push(i);
    }

    setNumList(list);
  };

  const handleChangeStock = () => {
    let newStock: number = stock + stockAdd;
    socket.emit("products client");
    dispatch(updateProductStockAction(token, _id, newStock));
    setStockAdd(0);
  };

  const handleUpdate = (e: any) => {
    setStockAdd(Number(e.target.value));
  };

  return (
    <>
      <IonItem onClick={handleClick}>
        <IonLabel>
          <h2>{name}</h2>
        </IonLabel>

        <IonLabel>
          <h2>Precio</h2>
          <p>{price}$</p>
        </IonLabel>

        <IonLabel>
          <h2>stock</h2>
          <p>{stock}</p>
        </IonLabel>
      </IonItem>

      {isChange && (
        <IonItem>
          <IonLabel>
            <IonInput
              name="updateStock"
              placeholder="ingresar el stock a agregar"
              type="number"
              onIonChange={handleUpdate}
            ></IonInput>
          </IonLabel>

          <IonLabel>
            <IonButton onClick={handleChangeStock} color="secondary">
              <IonIcon icon={checkmarkOutline} />
            </IonButton>
          </IonLabel>
        </IonItem>
      )}

      <Picker
        show={isChange ? false : openPicker}
        setShow={setOpenPicker}
        nums={numList}
        rooms={rooms}
        product={name}
        save={save}
        _id={_id}
        stock={stock}
      />
    </>
  );
};

export default ProductItem;
