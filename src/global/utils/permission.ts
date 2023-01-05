// MAIN MODULES
const MASTER = "1";

// SUB MODULES MASTER
const AGENT = "A";

const MASTER_AGENT_CODE = `${MASTER}!${AGENT}`;
const OP_CREATE = "1";
const OP_UPDATE = "2";
const OP_DELETE = "3";
const OP_VIEW = "4";

export const PERMISSION_TREE = {
  MASTER: {
    code: MASTER,
    // don't forget to put ! while creating childerens path
    AGENT: {
      code: MASTER_AGENT_CODE,
      isEnd: true,
      CREATE: { code: `${MASTER_AGENT_CODE}#${OP_CREATE}` },
      UPDATE: { code: `${MASTER_AGENT_CODE}#${OP_UPDATE}` },
      DELETE: { code: `${MASTER_AGENT_CODE}#${OP_DELETE}` },
      VIEW: { code: `${MASTER_AGENT_CODE}#${OP_VIEW}` },
    },
  },
};

export function getParentDir(value: string) {
  // split with first occurance .split(/[,?!\s]/);
  const isOperationalInclude = value.split("#").length > 1;
  const parent = value.split("#").at(0);
  return { parent, isOperationalInclude };
}
export function getOperationalRole(value: string) {
  const isOperationalInclude: boolean = value.split("#").length > 1;
  const parent: string = value.split("#").at(0)!;
  let operations: string[] = [];
  if (isOperationalInclude) {
    operations = value
      .split("#")
      .at(1)!
      .split("?")
      .filter((item) => (item === "" ? false : true));
  }
  return { isOperationalInclude, operations, parent };
}
export function isExistInDir(role: string, parent: string) {
  const roleDirLength = role.split("!").length;
  const parentSubDir = parent
    .split("!")
    .filter((item) => (item === "" ? false : true));
  let parentSubDirRoot = "";
  parentSubDir.forEach((item, index) => {
    if (index < roleDirLength) {
      parentSubDirRoot += index !== 0 ? `!${item}` : item;
    }
  });
  if (role === parentSubDirRoot) {
    return true;
  }
  return false;
}
export function isFirst(value: string, operationCode: string) {
  const operationPartSplit = value.split("#");
  if (operationPartSplit.length > 0) {
    const operations = operationPartSplit.at(1)!.split("?");
    if (operations.length > 0) {
      if (operationCode === operations.at(0)) {
        return true;
      }
      return false;
    }
    return false;
  }
  return false;
}
