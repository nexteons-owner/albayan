import { StatusDetails } from "../../global/utils/claims";

export interface ClaimSummary {
  submittedDate: number;
  receiver: string;
  receiverCode: string;
  payer: string;
  payerCode: string;
  grossAmount: number;
  patientShare: number;
  netAmount: number;
  approvedAmount: number;
  approvedDate: number;
  submissionType: 1 | 2 | 3;
  claimStatus: 0 | 1;
  linkId: number;
  activityArray: ActivityDetails[];
}
export interface ClaimSummaryApi {
  _submittedDate: number;
  _receiver: string;
  _receiverCode: string;
  _claimId: string;
  _payer: string;
  _payerCode: string;
  _grossAmount: number;
  _patientShare: number;
  _netAmount: number;
  _approvedAmount: number;
  _approvedDate: number;
  _settlementDate: number;
  _submissionType: 1 | 2 | 3;
  _paymentReference: string;
  _claimStatus: 0 | 1;
  _linkId: number;
}
export interface ActivityDetails {
  activityCode: string;
  activityDescription: string;
  activityNet: number;
  activityApproved: number;
  denialCode: string;
  clinicianCode: string;
  clinicianName: string;
  linkId: number;
  isProcessed: boolean;
  status: StatusDetails;
}

export interface ActivityDetailsApi {
  _activityCode: string;
  _activityDescription: string;
  _activityNet: number;
  _activityApproved: number;
  _denialCode: string;
  _clinicianCode: string;
  _clinicianDescription: string;
  _linkId: number;
  _activityType: number;
}

export interface ActivityTypesApi {
  _activityType: number;
  _activityTypeDescription: string;
}

export interface ActivityTypes {
  activityType: number;
  activityTypeDescription: string;
}
export interface DenialCodesApi {
  _denialCode: string;
  _denialCodeDescription: string;
}

export interface DenialCodes {
  denialCode: string;
  denialCodeDescription: string;
}

export interface DenialCodeSummary {
  denialCode: string;
  denialCodeDescription: string;
  count: number;
}
