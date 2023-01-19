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
  submissionType: string;
  claimStatus: number;
}
export interface ClaimSummaryApi {
  _submittedDate: number;
  _receiver: string;
  _receiverCode: string;
  _payer: string;
  _payerCode: string;
  _grossAmount: number;
  _patientShare: number;
  _netAmount: number;
  _approvedAmount: number;
  _approvedDate: number;
  _submissionType: string;
  _claimStatus: number;
}
