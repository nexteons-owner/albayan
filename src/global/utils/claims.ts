export interface StatusDetails {
  code: number;
  name: string;
}
interface Status {
  [key: string]: StatusDetails;
}

export const claimStatusLocal: Status = {
  PENDING: { code: 0, name: "PENDING" },
  PROCESSED: { code: 1, name: "PROCESSED" },
};

export const activityStatus: Status = {
  PENDING: { code: -1, name: "PENDING" },
  APPROVED: { code: 1, name: "APPROVED" },
  PARTIALLY_REJECTED: { code: 2, name: "PARTIALLY REJECTED" },
  REJECTED: { code: 3, name: "REJECTED" },
};

export const getStatusText = (status: number, ob: Status): string => {
  let statusText = "Status Not Defined";
  if (ob) {
    Object.keys(ob).forEach((key) => {
      if (ob[key]?.code === status) {
        statusText = ob[key]?.name;
      }
    });
  } else {
    statusText = "Object have some error";
  }
  return statusText;
};

export const getActivityStatus = (
  isProcessed: boolean,
  activityApproved: number,
  denialCode: string,
  activityNet: number
): StatusDetails => {
  if (!isProcessed) {
    return activityStatus.PENDING;
  }

  if (denialCode === "" && activityApproved === activityNet) {
    return activityStatus.APPROVED;
  }

  if (denialCode !== "" && activityApproved === 0) {
    return activityStatus.REJECTED;
  }
  return activityStatus.PARTIALLY_REJECTED;
};
