import { v4 as uuidv4 } from "uuid";
import { Dashboard, Payments, Google } from "@mui/icons-material";
import { PATH_DASHBOARD } from "../../../../routes/paths";

export const Menuitems: any[] = [
  {
    title: "DASHBOARDS",
    icon: <Dashboard width="15" height="15" />,
    href: PATH_DASHBOARD.dashboard.main,
    code: `${uuidv4()}`,
    isParent: true,
  },
  {
    title: "PAYERS",
    icon: <Payments width="15" height="15" />,
    href: PATH_DASHBOARD.dashboard.payers,
    code: `${uuidv4()}`,
    isParent: true,
  },

  // {
  //   title: "Customers",
  //   icon: <Google htmlColor={"#1d1d1d"} width="20" height="20" />,
  //   href: "/dashboard",
  //   isParent: true,
  //   code: `${uuidv4()}`,
  //   children: [
  //     {
  //       title: "Customers Lists",
  //       icon: <Google htmlColor={"#1d1d1d"} width="20" height="20" />,
  //       href: "/dashboard/main3",
  //       code: `${uuidv4()}`,
  //       isParent: false,
  //     },
  //     {
  //       title: "Customers Edit",
  //       icon: <Google htmlColor={"#1d1d1d"} width="20" height="20" />,
  //       href: "/dashboard/main",
  //       code: `${uuidv4()}`,
  //       isParent: false,
  //     },
  //   ],
  // },
  // {
  //   title: "PAGES",
  //   icon: <Google htmlColor={"#1d1d1d"} width="20" height="20" />,
  //   href: "Pages",
  //   code: `${uuidv4()}`,
  //   isParent: true,
  // },
  // {
  //   title: "parent",
  //   icon: <Google htmlColor={"#1d1d1d"} width="20" height="20" />,
  //   href: "/dashboard/main",
  //   code: `${uuidv4()}`,
  //   isParent: true,
  //   children: [
  //     {
  //       title: "child1",
  //       icon: <Google htmlColor={"#1d1d1d"} width="20" height="20" />,
  //       href: "/dashboard/main2",
  //       code: `${uuidv4()}`,
  //     },
  //     {
  //       title: "child2",
  //       icon: <Google htmlColor={"#1d1d1d"} width="20" height="20" />,
  //       href: "/shop/shop-detail",
  //       code: `${uuidv4()}`,
  //       children: [
  //         {
  //           title: "child21",
  //           icon: <Google htmlColor={"#1d1d1d"} width="20" height="20" />,
  //           href: "/shop/lists",
  //           code: `${uuidv4()}`,
  //         },
  //         {
  //           title: "child22",
  //           icon: <Google htmlColor={"#1d1d1d"} width="20" height="20" />,
  //           href: "/shop/shop-detail",
  //           code: `${uuidv4()}`,
  //           children: [
  //             {
  //               title: "child221",
  //               icon: <Google htmlColor={"#1d1d1d"} width="20" height="20" />,
  //               href: "/shop/lists",
  //               code: `${uuidv4()}`,
  //             },
  //             {
  //               title: "child222",
  //               icon: <Google htmlColor={"#1d1d1d"} width="20" height="20" />,
  //               href: "/shop/shop-detail",
  //               code: `${uuidv4()}`,
  //               children: [
  //                 {
  //                   title: "child2221",
  //                   icon: (
  //                     <Google htmlColor={"#1d1d1d"} width="20" height="20" />
  //                   ),
  //                   href: "/shop/lists",
  //                   code: `${uuidv4()}`,
  //                 },
  //                 {
  //                   title: "child2222",
  //                   icon: (
  //                     <Google htmlColor={"#1d1d1d"} width="20" height="20" />
  //                   ),
  //                   href: "/shop/shop-detail",
  //                   code: `${uuidv4()}`,
  //                 },
  //               ],
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //   ],
  // },
];

export default Menuitems;
