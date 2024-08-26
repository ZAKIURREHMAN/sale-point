import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Tabs,
  Tab,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import DrawerComp from "../Drawer/DrawerComp";
import NavbarText from "../../constant/NavbarText";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { counterContext } from "../../context/AuthContext";

function Navbar() {
  const { cartItems } = useContext(counterContext);
  const [value, setValue] = useState(0);
  const [openDower, setOpenDower] = useState(false);
  const changeLine = (e, val) => {
    setValue(val);
  };
  const them = useTheme();
  const isMatch = useMediaQuery(them.breakpoints.down("md"));
  return (
    <div>
      <AppBar sx={{ backgroundColor: "#102C57", position: "static" }}>
        <Toolbar>
          {isMatch === true ? (
            <>
              <Box onClick={() => setOpenDower(true)}>
                <MenuIcon />
              </Box>{" "}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Box sx={{ height: "50px", width: "50px", cursor: "pointer" }}>
                <img
                  src="./NavbarImages/salepoint.webp"
                  alt="Sale Point"
                  style={{ height: "100%", width: "100%" }}
                />
              </Box>
              <Box
                sx={{
                  marginLeft: "auto",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <img
                  src="./NavbarImages/userlogo.jpeg"
                  alt="user Profile"
                  style={{
                    height: "35px",
                    width: "35px",
                    borderRadius: "20px",
                    cursor: "pointer",
                  }}
                />
              </Box>
              <DrawerComp openDower={openDower} setOpenDower={setOpenDower} />
            </>
          ) : (
            <>
              <Box sx={{ height: "50px", width: "50px", cursor: "pointer" }}>
                <img
                  src="./NavbarImages/salepoint.webp"
                  alt="Sale Point"
                  style={{ height: "100%", width: "100%" }}
                />
              </Box>
              <Typography sx={{ marginLeft: "auto" }}>
                <Box>
                  <Tabs
                    textColor="inherit"
                    onChange={(e, value) => changeLine(e, value)}
                    value={value}
                    indicatorColor="secondary"
                  >
                    {NavbarText.map((item) => (
                      <Tab
                        key={item.id}
                        label={
                          <Link
                            to={item.path}
                            style={{ textDecoration: "none", color: "inherit" }}
                          >
                            {item.name}
                          </Link>
                        }
                        sx={{ fontFamily: "Anton", color: "#FDF4F5" }}
                      />
                    ))}
                  </Tabs>
                </Box>
              </Typography>
              <Box
                sx={{
                  marginLeft: "auto",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <img
                  src="./NavbarImages/userlogo.jpeg"
                  alt="user Profile"
                  style={{
                    height: "35px",
                    width: "35px",
                    borderRadius: "20px",
                    cursor: "pointer",
                  }}
                />{" "}
                &nbsp;
                <Link to="/cart" style={{ color: "black" }}>
                  {" "}
                  <ShoppingCartIcon />
                </Link>
                <span style={{ marginTop: "-30px", marginLeft: "-10px" }}>
                  {cartItems.length / 2}
                </span>
              </Box>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
