import React, { useState } from "react";

import { IonPicker } from "@ionic/react";
import { PickerColumn } from "@ionic/core";

import Toast from "../../Atoms/Toast";

import moment from 'moment'
import { socket } from "../../../services/sockets.service";

// import { socket } from "../../../services/sockets.service";

interface props {
  show: boolean;
  setShow: any;
  nums: number[];
  rooms: string[];
  product: string;
  save: any;
  _id: any;
  stock: any;
  type?: string
}

const columOne = (num: number[]) => {
  // { text: "Aaron", value: "Aaron" }
  return {
    name: "First",
    options: num.map((el) => ({ text: `${el}`, value: el })),
  } as PickerColumn;
};

const columnTwo = (param: string[]) => {
  const a = param.map((el) => ({ text: el, value: el }));

  return {
    name: "Second",
    options: [{ text: "ninguno", value: "" }, ...a],
  } as PickerColumn;
};

const Picker: React.FC<props> = ({
  show,
  setShow,
  nums,
  rooms,
  product,
  save,
  _id,
  stock,
}) => {
  const [showToast, setShowToast] = useState(false);

  const handleConfirm = (value: any) => {
    setShow(false);
    save(
      {
        product: product,
        quantity: value.First.value,
        room: value.Second.value,
        date: moment().format("DD/MM/yyyy")
      },
      {
        id: _id,
        newStock: stock - value.First.value,
      }
    );
    setShowToast(true);
    socket.emit("history products client");
    // console.log({product: product,  quantity: value.First.value, room: value.Second.value });
  };

  return (
    <>
      <IonPicker
        isOpen={show}
        columns={[columOne(nums), columnTwo(rooms)]}
        buttons={[
          {
            text: "Cancelar",
            role: "cancel",
            handler: () => setShow(false),
          },
          {
            text: "Confirmar",
            handler: handleConfirm,
          },
        ]}
      ></IonPicker>
      <Toast
        show={showToast}
        set={setShowToast}
        message="Producto vendido con exito"
        duration={700}
      />
    </>
  );
};

export default Picker;
