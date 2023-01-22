import { Grid, Zoom, Slide } from "@mui/material";
import SummaryCards from "../../components/screen/dashboard/SummaryCards";
import { ClaimSummary } from "./modals";
import {
  SummaryCardModel,
  TopListModel,
} from "../../components/screen/dashboard/modals";
import {
  MarkEmailRead as ClaimedIcon,
  HourglassTop as PendingIcon,
  AttachMoney as ApprovedIcon,
  SentimentVeryDissatisfied as RejectedIcon,
} from "@mui/icons-material";
import { toFixedAmount } from "../../global/utils/number";
import { claimStatusLocal } from "../../global/utils/claims";
import TopPayers from "../../components/screen/dashboard/TopPayerList";
import Table from "../../components/screen/dashboard/Table";
interface Props {
  claims: ClaimSummary[];
}

function DashBoard({ claims }: Props) {
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
          claimStatus === claimStatusLocal.PROCESSED.CODE &&
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
    ({ claimStatus }) => claimStatus === claimStatusLocal.PROCESSED.CODE
  ).length;
  const totalPendingCount = totalClaimedCount - totalApprovedCount;
  const totalRejectedCount = cypClaims.filter(
    ({ netAmount, approvedAmount, claimStatus }) =>
      claimStatus === claimStatusLocal.PROCESSED.CODE &&
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
      digits: totalPendingAmount.toString(),
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
  const topList: TopListModel[] = payersWiseClaims(cypClaims);

  return (
    <Grid container spacing={0}>
      <Zoom in={cardList.length > 0}>
        <Grid item xs={12}>
          <SummaryCards {...{ cardList }} />
        </Grid>
      </Zoom>

      <Zoom in={topList.length > 0}>
        <Grid item xs={12} lg={4}>
          <TopPayers
            topList={topList
              .sort((a, b) => b.totalClaimedAmount - a.totalClaimedAmount)
              .slice(0, 10)}
            title="TOP CLAIMED"
          />
          <TopPayers
            topList={topList
              .sort((a, b) => b.totalApprovedAmount - a.totalApprovedAmount)
              .slice(0, 5)}
            title="TOP APPROVERS"
          />
          <TopPayers
            topList={topList
              .sort((a, b) => b.totalRejectedAmount - a.totalRejectedAmount)
              .slice(0, 5)}
            title="TOP REJECTED"
          />
        </Grid>
      </Zoom>

      <Slide direction="left" in={topList.length > 0}>
        <Grid item xs={12} lg={8}>
          <Table
            topList={topList.sort(
              (a, b) => b.totalClaimedCount - a.totalClaimedCount
            )}
          />
        </Grid>
      </Slide>
    </Grid>
  );
}

function payersWiseClaims(claims: ClaimSummary[]): TopListModel[] {
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
            claimStatus === claimStatusLocal.PROCESSED.CODE &&
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
      ({ claimStatus }) => claimStatus === claimStatusLocal.PROCESSED.CODE
    ).length;
    const totalPendingCount = totalClaimedCount - totalApprovedCount;
    const totalRejectedCount = payerWiseDocument.filter(
      ({ netAmount, approvedAmount, claimStatus }) =>
        claimStatus === claimStatusLocal.PROCESSED.CODE &&
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
export default DashBoard;
