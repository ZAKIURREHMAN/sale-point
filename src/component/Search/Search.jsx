import { useState, useContext } from "react";
import { Box } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Suggestions from "../Suggestions/Suggestions";
import { counterContext } from "../../context/AuthContext";

function Search() {
  const [searching, setSearching] = useState("");
  const { handelSuggestions, setData, setHandelSuggestions, handelItem } =
    useContext(counterContext);

  const deBouncing = (callback, delay) => {
    let timer;
    return function (...arg) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        callback(...arg);
      }, delay);
    };
  };

  const searchingHandler = deBouncing(function (e) {
    setHandelSuggestions(handelSuggestions === true ? false : false);
    let val = e.target.value;
    setSearching(val);
  }, 2000);
  const showResult = () => {
    setData(handelItem);
    setHandelSuggestions(true);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "15px",
        }}
      >
        <InputBase
          sx={{
            border: "1px solid black",
            width: "400px",
            borderTopLeftRadius: "10PX",
            borderBottomLeftRadius: "10PX",
            outline: "none",
          }}
          onChange={searchingHandler}
        />
        <SearchIcon
          sx={{
            width: "40px",
            height: "32px",
            borderTopRightRadius: "10PX",
            borderBottomRightRadius: "10PX",
            border: "1px solid black",
            cursor: "pointer",
            "&:hover": { backgroundColor: "#F9F5F6" },
          }}
          onClick={showResult}
        />
      </Box>
      {searching !== "" ? <Suggestions searching={searching} /> : ""}
    </>
  );
}

export default Search;
