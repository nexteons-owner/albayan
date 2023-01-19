interface StatusDetails {
  CODE: number;
  NAME: string;
}
interface Status {
  [key: string]: StatusDetails;
}

export const claimStatusLocal: Status = {
  PENDING: { CODE: 0, NAME: "PENDING" },
  PROCESSED: { CODE: 1, NAME: "PROCESSED" },
};

export const getStatusText = (status: number, ob: Status): string => {
  let statusText = "Status Not Defined";
  if (ob) {
    Object.keys(ob).forEach((key) => {
      if (ob[key]?.CODE === status) {
        statusText = ob[key]?.NAME;
      }
    });
  } else {
    statusText = "Object have some error";
  }
  return statusText;
};