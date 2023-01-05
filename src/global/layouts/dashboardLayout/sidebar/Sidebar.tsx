import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
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
} from "@mui/material";
import FeatherIcon from "feather-icons-react";
import LogoIcon from "../logo/LogoIcon";
import Menuitems from "./Menuitems";
import Scrollbar from "../../../components/custom_scroll/Scrollbar";
import { SidebarWidth } from "../../../utils/constants/ui/index";
import useAuth from "../../../hooks/useAuth";

const Sidebar = ({ isMobileSidebarOpen, onSidebarClose, isSidebarOpen }) => {
  const { user } = useAuth();
  const [open, setOpen] = React.useState(true);
  const parentItemRef = useRef();
  const scrollBarRef = useRef();
  const [openChild, setOpenChild] = React.useState(true);
  const { pathname } = useLocation();
  const pathDirect = pathname;
  const pathWithoutLastPart = pathname.includes("/update")
    ? pathname.slice(0, pathname.lastIndexOf("/update"))
    : pathname.slice(0, pathname.lastIndexOf("/"));
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const [menuItems, setMenuItems] = useState([]);
  useEffect(() => {
    const permission = user?.permission || [];
    setMenuItems(Menuitems(permission));
  }, []);
  const handleClick = (index) => {
    if (open === index) {
      setOpen((prevopen) => !prevopen);
    } else {
      setOpen(index);
      setOpenChild(false);
      setOpenChild(-1);
    }
  };

  const handleClickChild = (index) => {
    if (openChild === index) {
      setOpenChild((prevopen) => !prevopen);
    } else {
      setOpenChild(index);
    }
  };

  const SidebarContent = (
    <Scrollbar ref={scrollBarRef} style={{ height: "calc(100vh - 5px)" }}>
      <Box sx={{ p: 2 }}>
        <LogoIcon />
        <Box>
          <List>
            {menuItems.map((item, index) => {
              if (item.children) {
                return (
                  <React.Fragment key={item.title + index}>
                    <ListItem
                      ref={index === open ? parentItemRef : null}
                      onClick={() => handleClick(index)}
                      sx={{
                        mb: 1,
                        ...(pathWithoutLastPart === item.href && {
                          color: "white",
                          backgroundColor: (theme) =>
                            `${theme.palette.primary.main}!important`,
                        }),
                      }}
                    >
                      <ListItemButton sx={{ p: 0, m: 0 }}>
                        <ListItemIcon
                          sx={{
                            ...(index === open && {
                              color: "white",
                            }),
                          }}
                        >
                          <FeatherIcon
                            icon={item.icon}
                            color={item?.iconColor || "#1d1d1d"}
                            width="20"
                            height="20"
                          />
                        </ListItemIcon>
                        <ListItemText>{item.title}</ListItemText>
                        {index === open || pathWithoutLastPart === item.href ? (
                          <FeatherIcon
                            icon="chevron-down"
                            size="16"
                            color={item?.iconColor || "#1d1d1d"}
                          />
                        ) : (
                          <FeatherIcon
                            icon="chevron-right"
                            size="16"
                            color={item?.iconColor || "#1d1d1d"}
                          />
                        )}
                      </ListItemButton>
                    </ListItem>
                    <Collapse
                      in={index === open}
                      timeout="auto"
                      key={`${index}collapse`}
                      unmountOnExit
                      addEndListener={() => {
                        scrollBarRef?.current?.scrollTo(
                          0,
                          parentItemRef?.current?.getBoundingClientRect()?.x ||
                            0
                        );
                      }}
                    >
                      <List component="li" disablePadding>
                        {item.children.map((child, indexx) => {
                          // {/********SubHeader**********/}
                          if (child.children) {
                            return (
                              <React.Fragment key={child.title}>
                                <ListItem
                                  button
                                  component="li"
                                  onClick={() => handleClickChild(indexx)}
                                  selected={pathWithoutLastPart === child.href}
                                  sx={{
                                    mb: 1,
                                    ...(pathWithoutLastPart === child.href && {
                                      color: "white",
                                      backgroundColor: (theme) =>
                                        `${theme.palette.primary.main}!important`,
                                    }),
                                  }}
                                >
                                  <ListItemIcon
                                    sx={{
                                      svg: { width: "16px", marginLeft: "4px" },
                                      ...(pathWithoutLastPart ===
                                        child.href && {
                                        color: "white",
                                      }),
                                    }}
                                  >
                                    <FeatherIcon
                                      icon={child.icon}
                                      width="16px"
                                      height="20"
                                      color={item?.iconColor || "#1d1d1d"}
                                    />
                                  </ListItemIcon>
                                  <ListItemText>{child.title}</ListItemText>
                                  {indexx === openChild ||
                                  pathWithoutLastPart === child.href ? (
                                    <FeatherIcon
                                      icon="chevron-down"
                                      size="16"
                                      color={item?.iconColor || "#1d1d1d"}
                                    />
                                  ) : (
                                    <FeatherIcon
                                      icon="chevron-right"
                                      size="16"
                                      color={item?.iconColor || "#1d1d1d"}
                                    />
                                  )}
                                </ListItem>
                                <Collapse
                                  in={indexx === openChild}
                                  timeout="auto"
                                  unmountOnExit
                                >
                                  <List component="li" disablePadding>
                                    {child.children.map((NestedChild) => (
                                      <ListItem
                                        key={NestedChild.title}
                                        button
                                        component={NavLink}
                                        to={NestedChild.href}
                                        onClick={onSidebarClose}
                                        selected={
                                          pathDirect === NestedChild.href
                                        }
                                        sx={{
                                          mb: 1,
                                          ...(pathDirect ===
                                            NestedChild.href && {
                                            color: "primary.main",
                                            backgroundColor:
                                              "transparent!important",
                                          }),
                                        }}
                                      >
                                        <ListItemIcon
                                          sx={{
                                            svg: {
                                              width: "14px",
                                              marginLeft: "6px",
                                            },
                                            ...(pathDirect ===
                                              NestedChild.href && {
                                              color: "primary.main",
                                            }),
                                          }}
                                        >
                                          <FeatherIcon
                                            icon={NestedChild.icon}
                                            width="20"
                                            height="20"
                                            color={item?.iconColor || "#1d1d1d"}
                                          />
                                        </ListItemIcon>
                                        <ListItemText>
                                          {NestedChild.title}
                                        </ListItemText>
                                      </ListItem>
                                    ))}
                                  </List>
                                </Collapse>
                              </React.Fragment>
                            );
                            // {/********If Sub No Menu**********/}
                          }
                          return (
                            <List
                              component="li"
                              disablePadding
                              key={child.title}
                            >
                              <ListItem
                                onClick={() => handleClickChild(indexx)}
                                button
                                component={NavLink}
                                to={child.href}
                                selected={pathDirect === child.href}
                                sx={{
                                  mb: 1,
                                  ...(pathDirect === child.href && {
                                    color: "white",
                                    backgroundColor: (theme) =>
                                      `${theme.palette.primary.main}!important`,
                                  }),
                                }}
                              >
                                <ListItemIcon
                                  sx={{
                                    ...(pathDirect === child.href && {
                                      color: "white",
                                    }),
                                  }}
                                >
                                  <FeatherIcon
                                    icon={child.icon}
                                    width="20"
                                    height="20"
                                    color={item?.iconColor || "#1d1d1d"}
                                  />
                                </ListItemIcon>
                                <ListItemText onClick={onSidebarClose}>
                                  {child.title}
                                </ListItemText>
                              </ListItem>
                            </List>
                          );
                        })}
                      </List>
                    </Collapse>
                  </React.Fragment>
                );
                // {/********If Sub No Menu**********/}
              }
              return (
                <List component="li" disablePadding key={item.title}>
                  <ListItem
                    onClick={() => handleClick(index)}
                    button
                    component={NavLink}
                    to={item.href}
                    selected={pathDirect === item.href}
                    sx={{
                      mb: 1,
                      ...(pathDirect === item.href && {
                        color: "white",
                        backgroundColor: (theme) =>
                          `${theme.palette.secondary.main}!important`,
                      }),
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        ...(pathDirect === item.href && { color: "white" }),
                      }}
                    >
                      <FeatherIcon
                        icon={item.icon}
                        color={item?.iconColor || "#1d1d1d"}
                        width="20"
                        height="20"
                      />
                    </ListItemIcon>
                    <ListItemText onClick={onSidebarClose}>
                      {item.title}
                    </ListItemText>
                  </ListItem>
                </List>
              );
            })}
          </List>
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
