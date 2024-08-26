import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Drawer from "@mui/material/Drawer";
import NavbarText from "../../constant/NavbarText";

function DrawerComp({ openDower, setOpenDower }) {
  console.log("See the value of Drawer", openDower);
  return (
    <div>
      <Drawer open={openDower} onClose={() => setOpenDower(false)}>
        <List>
          {NavbarText.map((item) => (
            <ListItemButton key={item.id} onClick={() => setOpenDower(false)}>
              <ListItemIcon>
                <ListItemText>{item.name}</ListItemText> <br />
              </ListItemIcon>
            </ListItemButton>
          ))}
        </List>
      </Drawer>
    </div>
  );
}

export default DrawerComp;
