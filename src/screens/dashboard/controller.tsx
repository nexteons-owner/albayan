import { toFixedAmount } from "../../global/utils/number";
import { claimStatusLocal } from "../../global/utils/claims";
import {
  ClaimSummary,
  DenialCodes,
  DenialCodeSummary,
  ActivityTypes,
  ActivityTypeSummary,
  ActivityCodeSummary,
  ActivityCodes,
} from "./modals";
import { TopListModel } from "../../components/screen/dashboard/modals";

export function PayersWiseClaims(claims: ClaimSummary[]): TopListModel[] {
  const colors = ["success", "primary", "error", "warning"];
  const payersList: TopListModel[] = [
    ...new Set(claims.map(({ payerCode }) => payerCode)),
  ].map((payerCodeMain, index) => {
    let Mainpayer = "";
    const payerWiseDocument = claims.filter(({ payerCode, payer }) => {
      if (payerCodeMain === payerCode) {
        Mainpayer = payer;
        return true;
      } else {
        return false;
      }
    });
    const totalClaimedAmount = toFixedAmount(
      payerWiseDocument?.reduce(
        (partialSum, { netAmount }) => partialSum + netAmount,
        0
      )
    );
    const totalApprovedAmount = toFixedAmount(
      payerWiseDocument?.reduce(
        (partialSum, { approvedAmount }) => partialSum + approvedAmount,
        0
      )
    );
    const totalPendingAmount = toFixedAmount(
      totalClaimedAmount - totalApprovedAmount
    );
    const totalRejectedAmount = toFixedAmount(
      payerWiseDocument
        .filter(
          ({ netAmount, approvedAmount, claimStatus }) =>
            claimStatus === claimStatusLocal.PROCESSED.code &&
            netAmount !== approvedAmount
        )
        .reduce(
          (partialSum, { netAmount, approvedAmount }) =>
            partialSum + (netAmount - approvedAmount),
          0
        )
    );

    const totalClaimedCount = payerWiseDocument.length;
    const totalApprovedCount = payerWiseDocument.filter(
      ({ claimStatus }) => claimStatus === claimStatusLocal.PROCESSED.code
    ).length;
    const totalPendingCount = totalClaimedCount - totalApprovedCount;
    const totalRejectedCount = payerWiseDocument.filter(
      ({ netAmount, approvedAmount, claimStatus }) =>
        claimStatus === claimStatusLocal.PROCESSED.code &&
        netAmount !== approvedAmount
    ).length;

    const totalApprovePerc = toFixedAmount(
      (totalApprovedAmount / totalClaimedAmount) * 100
    );
    const totalPendingPerc = toFixedAmount(
      (totalPendingAmount / totalClaimedAmount) * 100
    );
    const totalRejectedPerc = toFixedAmount(
      (totalRejectedAmount / totalClaimedAmount) * 100
    );
    return {
      payerName: Mainpayer,
      payerCode: payerCodeMain,
      totalClaimedCount,
      totalClaimedAmount,
      totalApprovedCount,
      totalApprovedAmount,
      totalRejectedCount,
      totalRejectedAmount,
      totalPendingCount,
      totalPendingAmount,
      totalApprovePerc,
      totalPendingPerc,
      totalRejectedPerc,
      color: colors[Math.floor(Math.random() * colors.length)],
    };
  });
  return payersList;
}

export function TotalClaimSummary(claims: ClaimSummary[]) {
  const cypClaims: ClaimSummary[] = [...claims];
  const totalClaimedAmount = toFixedAmount(
    claims?.reduce((partialSum, { netAmount }) => partialSum + netAmount, 0)
  );
  const totalApprovedAmount = toFixedAmount(
    claims?.reduce(
      (partialSum, { approvedAmount }) => partialSum + approvedAmount,
      0
    )
  );
  const totalPendingAmount = toFixedAmount(
    totalClaimedAmount - totalApprovedAmount
  );
  const totalRejectedAmount = toFixedAmount(
    claims
      .filter(
        ({ netAmount, approvedAmount, claimStatus }) =>
          claimStatus === claimStatusLocal.PROCESSED.code &&
          netAmount !== approvedAmount
      )
      .reduce(
        (partialSum, { netAmount, approvedAmount }) =>
          partialSum + (netAmount - approvedAmount),
        0
      )
  );

  const totalClaimedCount = claims.length;
  const totalApprovedCount = cypClaims.filter(
    ({ claimStatus }) => claimStatus === claimStatusLocal.PROCESSED.code
  ).length;
  const totalPendingCount = totalClaimedCount - totalApprovedCount;
  const totalRejectedCount = cypClaims.filter(
    ({ netAmount, approvedAmount, claimStatus }) =>
      claimStatus === claimStatusLocal.PROCESSED.code &&
      netAmount !== approvedAmount
  ).length;

  const totalApprovePerc = toFixedAmount(
    (totalApprovedAmount / totalClaimedAmount) * 100
  );
  const totalPendingPerc = toFixedAmount(
    (totalPendingAmount / totalClaimedAmount) * 100
  );
  const totalRejectedPerc = toFixedAmount(
    (totalRejectedAmount / totalClaimedAmount) * 100
  );

  return {
    totalApprovePerc,
    totalClaimedAmount,
    totalApprovedAmount,
    totalRejectedPerc,
    totalPendingPerc,
    totalRejectedCount,
    totalPendingCount,
    totalClaimedCount,
    totalApprovedCount,
    totalPendingAmount,
    totalRejectedAmount,
  };
}

export function DenialWiseClaimSummary(
  claims: ClaimSummary[],
  denailCodeList: DenialCodes[],
  payersList: string[] = [],
  clinicianList: string[] = []
): DenialCodeSummary[] {
  let cpyClaims = [...claims];
  if (payersList?.length > 0) {
    cpyClaims = cpyClaims.filter(({ payerCode }) =>
      payersList.includes(payerCode)
    );
  }
  if (clinicianList?.length > 0) {
    cpyClaims = cpyClaims.filter(({ activityArray }) => {
      const clinicianCodes = activityArray.map(
        ({ clinicianCode }) => clinicianCode
      );
      return clinicianCodes.some((r) => clinicianList.indexOf(r) >= 0);
    });
  }
  return denailCodeList.map(
    ({ denialCode: denialCode, denialCodeDescription }): DenialCodeSummary => {
      let count = 0;
      let totalClaimAmount = 0;
      let totalRejectAmount = 0;
      cpyClaims.forEach(({ activityArray }) => {
        activityArray.forEach(
          ({
            denialCode: childDenialCode,
            activityNet,
            activityApproved,
            isProcessed,
          }) => {
            if (childDenialCode === denialCode) {
              if (isProcessed) {
                count++;
                totalClaimAmount += activityNet;
                totalRejectAmount += activityNet - activityApproved;
              }
            }
          }
        );
      });
      return {
        denialCode,
        denialCodeDescription,
        count,
        totalClaimAmount: toFixedAmount(totalClaimAmount),
        totalRejectAmount: toFixedAmount(totalRejectAmount),
      };
    }
  );
}

export function ActivityTypeClaimSummary(
  claims: ClaimSummary[],
  activityTypeList: ActivityTypes[]
): ActivityTypeSummary[] {
  return activityTypeList.map(({ activityType, activityTypeDescription }) => {
    let count = 0;
    let totalClaimAmount = 0;
    let totalRejectAmount = 0;
    claims.forEach(({ activityArray }) => {
      activityArray.forEach(
        ({
          activityType: childActivityType,
          isProcessed,
          activityNet,
          activityApproved,
        }) => {
          if (childActivityType === activityType) {
            if (isProcessed) {
              count++;
              totalClaimAmount += activityNet;
              totalRejectAmount += activityNet - activityApproved;
            }
          }
        }
      );
    });
    return {
      activityType,
      activityTypeDescription,
      count,
      totalClaimAmount: toFixedAmount(totalClaimAmount),
      totalRejectAmount: toFixedAmount(totalRejectAmount),
    };
  });
}

export function ActivityCodeClaimSummary(
  claims: ClaimSummary[],
  activityCodesList: ActivityCodes[]
): ActivityCodeSummary[] {
  return activityCodesList.map(({ activityCode, activityDescription }) => {
    let count = 0;
    let totalClaimAmount = 0;
    let totalRejectAmount = 0;
    claims.forEach(({ activityArray }) => {
      activityArray.forEach(
        ({
          activityCode: childActivityCode,
          isProcessed,
          activityNet,
          activityApproved,
        }) => {
          if (childActivityCode === activityCode) {
            if (isProcessed) {
              count++;
              totalClaimAmount += activityNet;
              totalRejectAmount += activityNet - activityApproved;
            }
          }
        }
      );
    });
    return {
      activityCode,
      activityDescription,
      count,
      totalClaimAmount: toFixedAmount(totalClaimAmount),
      totalRejectAmount: toFixedAmount(totalRejectAmount),
    };
  });
}
