import { Dashboard } from "@mui/icons-material";
import { PATH_DASHBOARD } from "../../../../routes/paths";
export const Menuitems: any[] = [
  {
    title: "DASHBOARDS",
    icon: <Dashboard width="15" height="15" />,
    href: PATH_DASHBOARD.dashboard.main,
    code: `${crypto.randomUUID()}`,
    isParent: true,
  },
  {
    title: "PAYERS",
    icon: <Dashboard width="15" height="15" />,
    href: PATH_DASHBOARD.dashboard.payers,
    code: `${crypto.randomUUID()}`,
    isParent: true,
  },

  // {
  //   title: "Customers",
  //   icon: <Google htmlColor={"#1d1d1d"} width="20" height="20" />,
  //   href: "/dashboard",
  //   isParent: true,
  //   code: `${crypto.randomUUID()}`,
  //   children: [
  //     {
  //       title: "Customers Lists",
  //       icon: <Google htmlColor={"#1d1d1d"} width="20" height="20" />,
  //       href: "/dashboard/main3",
  //       code: `${crypto.randomUUID()}`,
  //       isParent: false,
  //     },
  //     {
  //       title: "Customers Edit",
  //       icon: <Google htmlColor={"#1d1d1d"} width="20" height="20" />,
  //       href: "/dashboard/main",
  //       code: `${crypto.randomUUID()}`,
  //       isParent: false,
  //     },
  //   ],
  // },
  // {
  //   title: "PAGES",
  //   icon: <Google htmlColor={"#1d1d1d"} width="20" height="20" />,
  //   href: "Pages",
  //   code: `${crypto.randomUUID()}`,
  //   isParent: true,
  // },
  // {
  //   title: "parent",
  //   icon: <Google htmlColor={"#1d1d1d"} width="20" height="20" />,
  //   href: "/dashboard/main",
  //   code: `${crypto.randomUUID()}`,
  //   isParent: true,
  //   children: [
  //     {
  //       title: "child1",
  //       icon: <Google htmlColor={"#1d1d1d"} width="20" height="20" />,
  //       href: "/dashboard/main2",
  //       code: `${crypto.randomUUID()}`,
  //     },
  //     {
  //       title: "child2",
  //       icon: <Google htmlColor={"#1d1d1d"} width="20" height="20" />,
  //       href: "/shop/shop-detail",
  //       code: `${crypto.randomUUID()}`,
  //       children: [
  //         {
  //           title: "child21",
  //           icon: <Google htmlColor={"#1d1d1d"} width="20" height="20" />,
  //           href: "/shop/lists",
  //           code: `${crypto.randomUUID()}`,
  //         },
  //         {
  //           title: "child22",
  //           icon: <Google htmlColor={"#1d1d1d"} width="20" height="20" />,
  //           href: "/shop/shop-detail",
  //           code: `${crypto.randomUUID()}`,
  //           children: [
  //             {
  //               title: "child221",
  //               icon: <Google htmlColor={"#1d1d1d"} width="20" height="20" />,
  //               href: "/shop/lists",
  //               code: `${crypto.randomUUID()}`,
  //             },
  //             {
  //               title: "child222",
  //               icon: <Google htmlColor={"#1d1d1d"} width="20" height="20" />,
  //               href: "/shop/shop-detail",
  //               code: `${crypto.randomUUID()}`,
  //               children: [
  //                 {
  //                   title: "child2221",
  //                   icon: (
  //                     <Google htmlColor={"#1d1d1d"} width="20" height="20" />
  //                   ),
  //                   href: "/shop/lists",
  //                   code: `${crypto.randomUUID()}`,
  //                 },
  //                 {
  //                   title: "child2222",
  //                   icon: (
  //                     <Google htmlColor={"#1d1d1d"} width="20" height="20" />
  //                   ),
  //                   href: "/shop/shop-detail",
  //                   code: `${crypto.randomUUID()}`,
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
