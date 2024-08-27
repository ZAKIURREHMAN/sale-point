import { createContext, useState, useEffect } from "react";

export const counterContext = createContext();

export const ContextProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [handelSuggestions, setHandelSuggestions] = useState(false);
  const [handelValue, setHandelValue] = useState();
  const [handelItem, setHandelItem] = useState([]);
  const [quantityNumber, setQuantityNumber] = useState(0);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        let response = await fetch(import.meta.env.VITE_DATA_URL);
        if (!response.ok) {
          throw new Error("Response are not correct");
        }
        let result = await response.json();
        setData(result);
      } catch (err) {
        console.log("Error", err);
      }
    };
    getData();
  }, []);

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
    </counterContext.Provider>
  );
};
