import { Grid, Zoom } from "@mui/material";
import {
  MarkEmailRead as ClaimedIcon,
  HourglassTop as PendingIcon,
  AttachMoney as ApprovedIcon,
  SentimentVeryDissatisfied as RejectedIcon,
} from "@mui/icons-material";
import SummaryCards from "../../components/screen/dashboard/SummaryCards";
import { ClaimSummary, DenialCodes } from "./modals";
import {
  SummaryCardModel,
  TopListModel,
} from "../../components/screen/dashboard/modals";
import {
  PayersWiseClaims,
  TotalClaimSummary,
  DenialWiseClaimSummary,
} from "./controller";

import { toFixedAmount } from "../../global/utils/number";
import { claimStatusLocal } from "../../global/utils/claims";
import TopPayers from "../../components/screen/dashboard/TopPayerList";
import Chart from "../../components/screen/dashboard/Chart";
import BarChart from "../../components/screen/dashboard/Chart/barChart";
interface Props {
  claims: ClaimSummary[];
  denialList: DenialCodes[];
}

function DashBoard({ claims, denialList }: Props) {
  const cypClaims = [...claims];
  const {
    totalApprovePerc,
    totalApprovedAmount,
    totalClaimedAmount,
    totalPendingCount,
    totalPendingPerc,
    totalRejectedCount,
    totalRejectedPerc,
    totalClaimedCount,
    totalApprovedCount,
    totalPendingAmount,
    totalRejectedAmount,
  } = TotalClaimSummary(cypClaims);
  const cardList: SummaryCardModel[] = [
    {
      btnbg: "primary.light",
      btntext: "primary.main",
      icon: <ClaimedIcon />,
      digits: totalClaimedAmount.toString(),
      subtext: "CLAIMED",
      profit: "100",
      secondaryText: `${totalClaimedCount}(Claims)`,
      type: "loss",
    },
    {
      btnbg: "success.light",
      btntext: "success.main",
      icon: <ApprovedIcon />,
      digits: totalApprovedAmount.toString(),
      subtext: "APPROVED",
      profit: `${totalApprovePerc || 0}`,
      secondaryText: `${totalApprovedCount}(Claims)`,
      type: "profit",
    },
    {
      btnbg: "warning.light",
      btntext: "warning.main",
      icon: <PendingIcon />,
      digits: `${totalPendingAmount}`,
      subtext: "PENDING",
      profit: `${totalPendingPerc || 0}`,
      secondaryText: `${totalPendingCount}(Claims)`,
      type: "profit",
    },
    {
      btnbg: "error.light",
      btntext: "error.main",
      icon: <RejectedIcon />,
      digits: totalRejectedAmount.toString(),
      subtext: "REJECTED",
      profit: `${totalRejectedPerc || 0}`,
      secondaryText: `${totalRejectedCount}`,
      type: "loss",
    },
  ];

  const topList = PayersWiseClaims(cypClaims);
  const denailTopList = DenialWiseClaimSummary(cypClaims, denialList)
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  return (
    <Grid container spacing={0}>
      {JSON.stringify(denailTopList)}
      <Zoom in={cardList.length > 0}>
        <Grid item xs={12}>
          <SummaryCards {...{ cardList }} />
        </Grid>
      </Zoom>
      <Grid item xs={12}>
        <Chart />
      </Grid>

      <Zoom in={topList.length > 0}>
        <Grid item xs={4}>
          <TopPayers
            topList={topList
              .sort((a, b) => b.totalClaimedAmount - a.totalClaimedAmount)
              .slice(0, 10)}
            title="TOP CLAIMED"
          />
        </Grid>
      </Zoom>

      <Zoom in={topList.length > 0}>
        <Grid item xs={4}>
          <TopPayers
            topList={topList
              .sort((a, b) => b.totalApprovedAmount - a.totalApprovedAmount)
              .slice(0, 5)}
            title="TOP APPROVERS"
          />
        </Grid>
      </Zoom>

      <Zoom in={topList.length > 0}>
        <Grid item xs={4}>
          <TopPayers
            topList={topList
              .sort((a, b) => b.totalRejectedAmount - a.totalRejectedAmount)
              .slice(0, 5)}
            title="TOP REJECTED"
          />
        </Grid>
      </Zoom>
      <Grid item xs={8}>
        <BarChart title="Denial" topList={denailTopList} />
      </Grid>
    </Grid>
  );
}

export default DashBoard;
