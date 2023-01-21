import React, { useState, useRef, useEffect } from "react";

import PropTypes from "prop-types";
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

import { MinusSquare, PlusSquare, CloseSquare } from "./index";
import { Menuitems } from "./Menuitems";
import Scrollbar from "../../../../components/customScrollBar";
import { SidebarWidth } from "../../../theme";
import useAuth from "../../../auth/useAuth";
interface Props {
  isMobileSidebarOpen: boolean;
  onSidebarClose(): void;
  isSidebarOpen: boolean;
}
const Sidebar = ({
  isMobileSidebarOpen,
  onSidebarClose,
  isSidebarOpen,
}: Props) => {
  const { user } = useAuth();
  const scrollBarRef = useRef<HTMLLIElement>(null);
  const [expandedNode, setExpandedNode] = useState<any>([]);

  const handleNodeClick = (event: any, node: any) => {
    event.stopPropagation();
    if (!node.children) {
      console.log("navigate to link");
      return;
    }
    let newExpandedNode = [...expandedNode];
    if (expandedNode.includes(node.code)) {
      newExpandedNode = newExpandedNode.filter((code) => code !== node.code);
      if (node.children) {
        node.children.forEach((child: any) => {
          newExpandedNode = newExpandedNode.filter(
            (code) => code !== child.code
          );
        });
      }
    } else {
      if (node.children) {
        newExpandedNode = newExpandedNode.filter(
          (code) =>
            !Menuitems.find((item) => item.code === code && item.children)
        );
        newExpandedNode.push(node.code);
        node.children.forEach((child: any) => {
          newExpandedNode.push(child.code);
        });
      }
    }
    if (newExpandedNode.length > 0) {
      setExpandedNode(newExpandedNode);
    }
  };

  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"));
  const [menuItems, setMenuItems] = useState<any[]>([]);
  useEffect(() => {
    setMenuItems(Menuitems);
  }, []);
  const renderTreeNodes = (nodes: any[], parentCode: string | null) => {
    return nodes.map((node) => {
      return (
        <React.Fragment key={node.code}>
          <ListItem button onClick={(event) => handleNodeClick(event, node)}>
            <ListItemText
              primary={
                node.code +
                "----" +
                (node?.children ? node?.children?.length : "No children")
              }
            />
          </ListItem>
          {node.children && (
            <Collapse
              in={
                expandedNode.includes(node.code) ||
                (parentCode && expandedNode.includes(parentCode))
              }
              timeout="auto"
              unmountOnExit
            >
              <List component="div" disablePadding>
                {renderTreeNodes(node.children, node.code)}
              </List>
            </Collapse>
          )}
        </React.Fragment>
      );
    });
  };
  const SidebarContent = (
    <Scrollbar ref={scrollBarRef} style={{ height: "calc(100vh - 5px)" }}>
      <Box sx={{ p: 2 }}>
        <Box>
          {expandedNode}
          <List>{renderTreeNodes(menuItems, null)}</List>
        </Box>
      </Box>
    </Scrollbar>
  );
  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open={isSidebarOpen}
        onClose={onSidebarClose}
        variant="persistent"
        PaperProps={{
          sx: {
            width: SidebarWidth,
            border: "0 !important",
            boxShadow: "0px 7px 30px 0px rgb(113 122 131 / 11%)",
          },
        }}
      >
        {SidebarContent}
      </Drawer>
    );
  }
  return (
    <Drawer
      anchor="left"
      open={isMobileSidebarOpen}
      onClose={onSidebarClose}
      PaperProps={{
        sx: {
          width: SidebarWidth,
          border: "0 !important",
        },
      }}
      variant="temporary"
    >
      {SidebarContent}
    </Drawer>
  );
};

Sidebar.propTypes = {
  isMobileSidebarOpen: PropTypes.bool,
  onSidebarClose: PropTypes.func,
  isSidebarOpen: PropTypes.bool,
};

export default Sidebar;
