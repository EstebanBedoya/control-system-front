import React, { FC, useState } from "react";
import { IonItem, IonToast } from "@ionic/react";
import Modal from "../../Atoms/Modal";
import RoomContentItem from "../../templates/RoomContentItem";
import RoomContentModal from "../../templates/RoomContentModal";
import ServiceContentItem from "../../templates/ServiceContentItem";
import ServiceContentModal from "../../templates/ServiceContentModal";

interface Props {
  item: any;
  type: string;
}

const renderContentItem = (item: any) => (
  <RoomContentItem item={item} />
);
const renderContentModal = (
  item: any,
  modal: any,
  toast: any,
  changeTypeService: any,
  typeService: any
) => (
  <RoomContentModal
    item={item}
    closeModal={modal}
    openToast={toast}
    changeTypeService={changeTypeService}
    typeService={typeService}
  />
);
const renderServiceItem = (item: any) => <ServiceContentItem item={item} />;
const renderServiceModal = (item: any, modal: any) => <ServiceContentModal item={item} closeModal={modal} />;

const Item: FC<Props> = ({ item, type }) => {
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [typeService, setTypeService] = useState({ type: "", idRoom: "" });

  const renderContent = () => {
    switch (type) {
      case "room":
        return {
          item: renderContentItem(item),
          modal: renderContentModal(
            item,
            () => setShowModal(false),
            () => setShowToast(true),
            setTypeService,
            typeService
          ),
        };

      case "service":
        return {
          item: renderServiceItem(item),
          modal: renderServiceModal(item, () => setShowModal(false)),
        };
    }
  };

  const handleClick = () => {
    setShowModal(true);
  };

  return (
    <>
      <Modal
        title={`Id: ${type === "service" ? item._id.toString() : item.id.toString()}`}
        isOpen={showModal}
        handleCahnge={() => setShowModal(false)}
      >
        {renderContent()?.modal}
      </Modal>

      <IonToast
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        message="Operacion realizada con exito"
        duration={700}
      />

      <IonItem onClick={handleClick} button lines="inset">
        {renderContent()?.item}
      </IonItem>
    </>
  );
};

export default Item;
