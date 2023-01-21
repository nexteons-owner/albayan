import { Google } from "@mui/icons-material";
export const Menuitems: any[] = [
  {
    title: "DASHBOARDS",
    icon: <Google htmlColor={"#1d1d1d"} width="20" height="20" />,
    href: "Dashboard",
    code: "code1",
  },

  {
    title: "Customers",
    icon: <Google htmlColor={"#1d1d1d"} width="20" height="20" />,
    href: "/dashboard",
    isParent: true,
    code: "code2",
    children: [
      {
        title: "Customers Lists",
        icon: <Google htmlColor={"#1d1d1d"} width="20" height="20" />,
        href: "/dashboard/main3",
        code: "code3",
        isParent: false,
      },
      {
        title: "Customers Edit",
        icon: <Google htmlColor={"#1d1d1d"} width="20" height="20" />,
        href: "/dashboard/main",
        code: "code5",
        isParent: false,
      },
    ],
  },
  {
    title: "PAGES",
    icon: <Google htmlColor={"#1d1d1d"} width="20" height="20" />,
    href: "Pages",
    code: "code6",
    isParent: false,
  },
  {
    title: "parent",
    icon: <Google htmlColor={"#1d1d1d"} width="20" height="20" />,
    href: "/dashboard/main",
    code: "code7",
    isParent: true,
    children: [
      {
        title: "child1",
        icon: <Google htmlColor={"#1d1d1d"} width="20" height="20" />,
        href: "/dashboard/main2",
        code: "code8",
        isParent: false,
      },
      {
        title: "child2",
        icon: <Google htmlColor={"#1d1d1d"} width="20" height="20" />,
        href: "/shop/shop-detail",
        code: "code9",
        isParent: true,
        children: [
          {
            title: "child21",
            icon: <Google htmlColor={"#1d1d1d"} width="20" height="20" />,
            href: "/shop/lists",
            code: "code10",
            isParent: false,
          },
          {
            title: "child22",
            icon: <Google htmlColor={"#1d1d1d"} width="20" height="20" />,
            href: "/shop/shop-detail",
            code: "code11",
            isParent: true,
            children: [
              {
                title: "child221",
                icon: <Google htmlColor={"#1d1d1d"} width="20" height="20" />,
                href: "/shop/lists",
                code: "code12",
                isParent: false,
              },
              {
                title: "child222",
                icon: <Google htmlColor={"#1d1d1d"} width="20" height="20" />,
                href: "/shop/shop-detail",
                code: "code13",
                isParent: true,
                children: [
                  {
                    title: "child2221",
                    icon: (
                      <Google htmlColor={"#1d1d1d"} width="20" height="20" />
                    ),
                    href: "/shop/lists",
                    code: "code14",
                    isParent: false,
                  },
                  {
                    title: "child2222",
                    icon: (
                      <Google htmlColor={"#1d1d1d"} width="20" height="20" />
                    ),
                    href: "/shop/shop-detail",
                    code: "code15",
                    isParent: false,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

export default Menuitems;
