export interface TopListModel {
  payerName: string;
  payerCode: string;
  totalClaimedCount: number;
  totalClaimedAmount: number;
  totalApprovedCount: number;
  totalApprovedAmount: number;
  totalRejectedCount: number;
  totalRejectedAmount: number;
  totalPendingCount: number;
  totalPendingAmount: number;
  totalApprovePerc: number;
  totalPendingPerc: number;
  totalRejectedPerc: number;
  color: string;
}

export interface SummaryCardModel {
  btnbg: string;
  btntext: string;
  icon: React.ReactNode;
  digits: string;
  secondaryText: string;
  subtext: string;
  profit: string;
  type: string;
}
