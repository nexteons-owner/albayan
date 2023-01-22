import PropTypes from "prop-types";
import { Container, Alert, AlertTitle } from "@mui/material";
import useAuth from "../../auth/useAuth";
import { getOperationalRole, isExistInDir } from "../../utils/permission";

// ----------------------------------------------------------------------

interface RoleBasedGuard {
  children: React.ReactNode;
  accessibleRoles: string[];
}
const RoleBasedGuard: React.FC<RoleBasedGuard> = ({
  children,
  accessibleRoles,
}) => {
  const { user } = useAuth();
  const permission = user != null ? user?.permission : [];

  if (!isPermitted(accessibleRoles, permission)) {
    return (
      <Container>
        <Alert severity="error">
          <AlertTitle>Permission Denied</AlertTitle>
          You do not have permission to access this page
        </Alert>
      </Container>
    );
  }

  return <>{children}</>;
};
export default RoleBasedGuard;

RoleBasedGuard.propTypes = {
  accessibleRoles: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired, // Example ['admin', 'leader']
  children: PropTypes.node,
};

export const isPermitted = (
  accessibleRoles: string[],
  permission: string[] = [],
  locationOfCall?: string
) =>
  !accessibleRoles
    ? true
    : accessibleRoles?.length <= 0
    ? true
    : accessibleRoles
        .map((aRole: string) => {
          if (permission?.length <= 0) {
            return false;
          }
          const aRoleData = getOperationalRole(aRole);
          const aRoleParent: string = aRoleData.parent;
          let aRoleoperation: string = "";
          if (aRoleData.isOperationalInclude) {
            aRoleoperation = aRoleData.operations.at(0)!;
          }

          if (
            permission
              ?.map((permissionItem: string) => {
                const { parent, isOperationalInclude, operations } =
                  getOperationalRole(permissionItem);
                if (aRoleData.isOperationalInclude) {
                  if (aRoleParent === parent) {
                    if (isOperationalInclude) {
                      if (operations.includes(aRoleoperation)) {
                        return true;
                      }
                      return false;
                    }
                    return false;
                  }
                  return false;
                }
                const isSubDir = isExistInDir(aRoleParent, parent);

                if (isSubDir) {
                  return true;
                }
                return false;
              })
              .includes(true)
          ) {
            return true;
          }
          return false;
        })
        .includes(true);
