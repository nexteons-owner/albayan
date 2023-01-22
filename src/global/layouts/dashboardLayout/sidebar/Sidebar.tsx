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
import { useLocation, useNavigate } from "react-router";
import { NavLink } from "react-router-dom";

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
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const pathDirect = pathname;
  const pathWithoutLastPart = pathname.includes("/update")
    ? pathname.slice(0, pathname.lastIndexOf("/update"))
    : pathname.slice(0, pathname.lastIndexOf("/"));
  const scrollBarRef = useRef<HTMLLIElement>(null);
  const [expandedNode, setExpandedNode] = useState<any>([]);

  const handleNestedArray = (items: string[], filterKeys: string[] = []) => {
    let nestedFilterKeys = [...filterKeys];
    items.forEach((childItem: any, index) => {
      nestedFilterKeys.push(childItem.code);
      if (childItem.children) {
        nestedFilterKeys = [
          ...nestedFilterKeys,
          ...handleNestedArray(childItem.children, nestedFilterKeys),
        ];
      }
    });
    return nestedFilterKeys;
  };

  const handleNodeClick = (event: any, node: any) => {
    event.stopPropagation();
    if (!node.children) {
      if (node?.href) {
        navigate(node?.href);
      }
      console.log("action");
      return;
    }
    let newExpandedNode = node?.isParent ? [] : [...expandedNode];

    const filterKeys: string[] = node.children
      ? [...handleNestedArray(node.children)]
      : [node.code];

    if (
      node.isParent
        ? expandedNode.includes(node.code)
        : expandedNode
            .map((expandItem: any) => filterKeys.includes(expandItem))
            .filter((item: boolean) => item).length > 0
    ) {
      newExpandedNode = newExpandedNode.filter(
        (code) => !filterKeys.includes(code)
      );
      console.log("removing");
    } else {
      newExpandedNode.push(node.code);
      if (node.children) {
        node.children.forEach((child: any) => {
          newExpandedNode.push(child.code);
        });
      }
      console.log("adding");
    }

    setExpandedNode(newExpandedNode);
  };

  const isCollapse = (node: any) => {
    const filterKeys: string[] = [...handleNestedArray(node.children)];

    return (
      filterKeys
        .map((item) => expandedNode.includes(item))
        .filter((item) => item).length > 0
    );
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
          <ListItemButton
            sx={{
              mb: 1,
              borderRadius: 2,
              ...((node?.isParent && node.children
                ? pathWithoutLastPart === node.href
                : pathDirect === node.href) && {
                color: "white",
                backgroundColor: (theme) =>
                  `${theme.palette.primary.main}!important`,
              }),
            }}
          >
            <ListItem onClick={(event) => handleNodeClick(event, node)}>
              <ListItemIcon>{node?.icon}</ListItemIcon>
              <ListItemText primary={node.title} />
              {node.children &&
                (isCollapse(node) ? <MinusSquare /> : <PlusSquare />)}
            </ListItem>
          </ListItemButton>
          {node.children && (
            <Collapse
              in={
                node.children
                  ? node.children
                      .map((item: any) => expandedNode.includes(item.code))
                      .includes(true)
                  : expandedNode.includes(node.code)
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
