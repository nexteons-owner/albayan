import { alpha, styled } from "@mui/material/styles";
import TreeItem, { treeItemClasses } from "@mui/lab/TreeItem";
import {
  Box,
  Drawer,
  useMediaQuery,
  List,
  ListItem,
  Collapse,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Typography,
} from "@mui/material";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import { TransitionComponent } from "./index";

const StyledTreeItem = styled((props: any) => {
  const { item } = props;
  const { pathname } = useLocation();
  const pathDirect = pathname;
  const pathWithoutLastPart = pathname.includes("/update")
    ? pathname.slice(0, pathname.lastIndexOf("/update"))
    : pathname.slice(0, pathname.lastIndexOf("/"));

  return (
    <TreeItem
      {...props}
      sx={{
        mb: 1,
        backgroundColor: "transparent",
      }}
      label={
        <List
          sx={{
            mb: 1,
            ...((item.isParent
              ? pathWithoutLastPart === item.href
              : pathDirect === item.href) && {
              color: "white",
              backgroundColor: (theme) =>
                `${theme.palette.primary.main}!important`,
            }),
          }}
        >
          {/* <ListItem component={NavLink} to={item.href}> */}
          <ListItem>
            <ListItemIcon>{item?.icon}</ListItemIcon>
            <ListItemText>{item.title}</ListItemText>
          </ListItem>
        </List>
      }
      TransitionComponent={TransitionComponent}
    />
  );
})(({ theme }) => ({
  [`& .${treeItemClasses.iconContainer}`]: {
    "& .close": {
      opacity: 0.3,
    },
  },
  [`& .${treeItemClasses.group}`]: {
    margin: 0,
    padding: 0,
  },
  [`& .${treeItemClasses.content}`]: {
    flexDirection: "row-reverse",
    margin: 0,
    padding: 0,
  },
}));
export default StyledTreeItem;
