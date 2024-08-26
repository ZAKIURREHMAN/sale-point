import { createContext, useState } from "react";
import FetchData from "../component/FetchData/FetchData";

export const counterContext = createContext();

export const ContextProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [handelSuggestions, setHandelSuggestions] = useState(false);
  const [handelValue, setHandelValue] = useState();
  const [handelItem, setHandelItem] = useState([]);
  const [quantityNumber, setQuantityNumber] = useState(0);
  const [cartItems, setCartItems] = useState([]);

  return (
    <counterContext.Provider
      value={{
        data: data,
        setData: setData,
        handelSuggestions: handelSuggestions,
        setHandelSuggestions: setHandelSuggestions,
        handelValue: handelValue,
        setHandelValue: setHandelValue,
        handelItem: handelItem,
        setHandelItem: setHandelItem,
        cartItems: cartItems,
        setCartItems: setCartItems,
        quantityNumber: quantityNumber,
        setQuantityNumber: setQuantityNumber,
      }}
    >
      {children}
      <FetchData setData={setData} data={data} />
    </counterContext.Provider>
  );
};
