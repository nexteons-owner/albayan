import { getClaims as getClaimsService } from "../../repository/user";
import {
  ClaimSummary,
  ClaimSummaryApi,
  ActivityDetailsApi,
  ActivityDetails,
  DenialCodes,
  DenialCodesApi,
  ActivityTypes,
  ActivityTypesApi,
  ActivityCodes,
} from "../../screens/dashboard/modals";
import { getActivityStatus } from "../../global/utils/claims";

interface GetClaims {
  status: boolean;
  data: GetClaimsSucces | any;
  msg: string;
}
interface GetClaimsSucces {
  claims: ClaimSummary[];
}

export async function getClaims(): Promise<GetClaims> {
  const dashBoardResp = await getClaimsService();

  if (dashBoardResp.status) {
    const claimsList = dashBoardResp?.data?.data?.dashBoardData || [];
    const activityDetailsList =
      dashBoardResp?.data?.data?.activityDetails || [];
    const denialCodesList = dashBoardResp?.data?.data?.denialCodes || [];
    const activityTypesList = dashBoardResp?.data?.data?.activityTypes || [];
    const activityCodesList: ActivityCodes[] = [];

    const formatedActivityDetails: ActivityDetails[] = activityDetailsList?.map(
      ({
        _activityCode: activityCode,
        _activityDescription: activityDescription,
        _activityNet: activityNet,
        _activityApproved: activityApproved,
        _denialCode: denialCode,
        _clinicianCode: clinicianCode,
        _clinicianDescription: clinicianName,
        _linkId: linkId,
        _activityType: activityType,
      }: ActivityDetailsApi) => {
        const isProcessed = denialCode !== "" || activityApproved > 0;
        const item: ActivityDetails = {
          activityCode,
          activityDescription,
          activityNet,
          activityApproved,
          denialCode,
          clinicianCode,
          clinicianName,
          linkId,
          isProcessed,
          status: getActivityStatus(
            isProcessed,
            activityApproved,
            denialCode,
            activityNet
          ),
          activityType,
        };
        activityCodesList.push({ activityCode, activityDescription });
        return item;
      }
    );
    const formatedClaims: ClaimSummary[] = claimsList?.map(
      ({
        _submittedDate: submittedDate,
        _approvedAmount: approvedAmount,
        _approvedDate: approvedDate,
        _claimStatus: claimStatus,
        _grossAmount: grossAmount,
        _netAmount: netAmount,
        _patientShare: patientShare,
        _payer: payer,
        _payerCode: payerCode,
        _receiver: receiver,
        _receiverCode: receiverCode,
        _submissionType: submissionType,
        _linkId: linkId,
      }: ClaimSummaryApi) => {
        const item: ClaimSummary = {
          submittedDate,
          receiver,
          receiverCode,
          payer,
          payerCode,
          grossAmount,
          patientShare,
          netAmount,
          approvedAmount,
          approvedDate,
          submissionType,
          claimStatus,
          linkId,
          activityArray: formatedActivityDetails.filter(
            (activity) => activity.linkId === linkId
          ),
        };
        return item;
      }
    );
    const formatedDenailCodesList: DenialCodes[] = denialCodesList?.map(
      ({
        _denialCode: denialCode,
        _denialCodeDescription: denialCodeDescription,
      }: DenialCodesApi) => ({
        denialCode,
        denialCodeDescription,
      })
    );
    const formatedActivityTypesList: ActivityTypes[] = activityTypesList?.map(
      ({
        _activityType: activityType,
        _activityTypeDescription: activityTypeDescription,
      }: ActivityTypesApi) => ({
        activityType,
        activityTypeDescription,
      })
    );
    const response: GetClaims = {
      status: true,
      data: {
        claims: formatedClaims,
        denailList: formatedDenailCodesList,
        activityTypeList: formatedActivityTypesList,
        activityCodesList: [
          ...new Map(
            activityCodesList.map((item) => [item.activityCode, item])
          ).values(),
        ],
      },
      msg: "",
    };
    return response;
  }
  return dashBoardResp;
}
