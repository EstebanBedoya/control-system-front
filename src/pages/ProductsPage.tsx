import React, { useEffect, useState } from "react";

// ion components
import {
  IonFab,
  IonFabButton,
  IonIcon,
  IonList,
  IonInput,
  IonGrid,
  IonCol,
  IonRow,
} from "@ionic/react";
import { pencilOutline, checkmarkOutline } from "ionicons/icons";

// custom components
import StandardPage from "../components/templates/StandardPage";
import ProductItem from "../components/Molecules/ProductItem";
import Segments from "../components/Organisms/Segments";
// import Picker from "../components/Molecules/Picker";

// redux imports
import { useSelector, useDispatch } from "react-redux";
import { getProdcutsAction, updateProductStockAction } from "../redux/barDucks";
// import { getAllRoomsActions } from "../redux/roomDucks";
import { createBarHistory } from "../redux/historyDukcs";

// interface
import product from "../models/product.interface";

import { cookieGet } from "../services/cookies.service";
import { filterProduct } from "../services/products.service";

import { socket } from "../services/sockets.service";

import debounce from "../services/debounce.service";

const segments = [
  {
    text: "todos",
    value: "todos",
  },
  {
    text: "con stock",
    value: "withStock",
  },
  {
    text: "sin stock",
    value: "noStock",
  },
];

const RenderItem = (
  { _id, name, price, stock }: any,
  index: number,
  save: any,
  isChange: boolean,
  token: string
) => {
  return (
    <ProductItem
      key={index}
      _id={_id}
      name={name}
      price={price}
      stock={stock}
      save={save}
      isChange={isChange}
      token={token}
    />
  );
};

const ProductsPage: React.FC = () => {
  const products = useSelector((state: any) => state.bar);
  const [isChangeStock, setIsChangeStock] = useState(false);
  const [searchProduct, setSearchProduct] = useState<string>("");
  const dispatch = useDispatch();

  const [segment, setSegment] = useState<string>("withStock");

  const token = cookieGet("token");
  const roles = cookieGet("role");

  const role = roles?.find(
    (role: any) => role === "admin" || role === "moderator"
  );

  useEffect(() => {
    if (products.length === 0) {
      socket.emit("products client");
    }

    socket.on("products server", () => {
      if (products.length === 0) {
        debounce((t: string) => dispatch(getProdcutsAction(t)), 1000)(token);
      }
    });
  }, []);

  const handleSave = (arr: any, changeStock: any) => {
    dispatch(createBarHistory(token, arr));
    socket.emit("history products client");
    dispatch(
      updateProductStockAction(token, changeStock.id, changeStock.newStock)
    );
    socket.emit("products client");
  };

  const changeSegment = (e: any) => {
    setSegment(e.detail.value);
  };

  const handleChangeStock = () => {
    setIsChangeStock(isChangeStock ? false : true);
  };

  const productsList = () => {
    const productsBySearch = products.filter(({ name }: any) =>
      name.toLocaleLowerCase().includes(searchProduct)
    );
    const productsBySegment = filterProduct(segment, products);

    if (searchProduct) return productsBySearch;
    else return productsBySegment;
  };

  return (
    <StandardPage title="Productos">
      <IonGrid>
        <IonRow>
          <IonCol>
            <Segments handleChange={changeSegment} segments={segments} />
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonInput
              value={searchProduct}
              placeholder="Buscar producto"
              onIonChange={(e) => setSearchProduct(e.detail.value!)}
            />
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonList>
              {productsList().map((item: product, index: number) =>
                RenderItem(item, index, handleSave, isChangeStock, token)
              )}
            </IonList>
          </IonCol>
        </IonRow>
      </IonGrid>

      {role === "admin" && (
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={handleChangeStock} color="secondary">
            <IonIcon icon={isChangeStock ? checkmarkOutline : pencilOutline} />
          </IonFabButton>
        </IonFab>
      )}
    </StandardPage>
  );
};

export default ProductsPage;
