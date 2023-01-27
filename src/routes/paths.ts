function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}
export const KEYUPDATE = "update";
export const KEYVIEW = "view";
export const noRefreshKey = "noRefresh";

// ROOT PATH
export const ROOTS_AUTH = "/auth";
export const ROOTS_DASHBOARD = "/dashboard";

// MAIN PATH
export const PMROOT = "/";
export const PMDASHBOARD = "dashboard";

// FUNCTION BASED PATH NAME
export const PFNOLINK = "*";
export const PFNOTFOUND = "404";
export const PFMAIN = "main";
export const PFPAYERS = "payers";

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  login: path(ROOTS_AUTH, "/login"),
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  dashboard: {
    main: path(ROOTS_DASHBOARD, "/" + PFMAIN),
    payers: path(ROOTS_DASHBOARD, "/" + PFPAYERS),
  },
};
// ----------------------------------------------------------------------
