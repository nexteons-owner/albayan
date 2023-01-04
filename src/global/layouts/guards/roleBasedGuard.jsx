import PropTypes from 'prop-types';
import { Container, Alert, AlertTitle } from '@mui/material';
import { STORE_OWNER, SUPER_ADMIN } from './constants';
import useAuth from '../hooks/useAuth';
import { getOperationalRole, isExistInDir } from '../utils/constants/ui/permissionTree';

export const adminAndOwnerOnly = [SUPER_ADMIN, STORE_OWNER];
// ----------------------------------------------------------------------

RoleBasedGuard.propTypes = {
  accessibleRoles: PropTypes.array, // Example ['admin', 'leader']
  children: PropTypes.node
};

export default function RoleBasedGuard({ accessibleRoles, children }) {
  const { user } = useAuth();
  const permission = user?.permission || [];

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
}

export const isPermitted = (accessibleRoles, permission, locationOfCall) =>
  !accessibleRoles
    ? true
    : accessibleRoles?.length <= 0
    ? true
    : accessibleRoles
        .map((aRole) => {
          if (permission?.length <= 0) {
            return false;
          }
          const aRoleData = getOperationalRole(aRole);
          const aRoleParent = aRoleData.parent;
          let aRoleoperation = '';
          if (aRoleData.isOperationalInclude) {
            aRoleoperation = aRoleData.operations.at(0);
          }

          if (
            permission
              ?.map((permissionItem) => {
                const { parent, isOperationalInclude, operations } = getOperationalRole(permissionItem);
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
