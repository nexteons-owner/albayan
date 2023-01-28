import { Grid, Zoom } from "@mui/material";
import {
  MarkEmailRead as ClaimedIcon,
  HourglassTop as PendingIcon,
  AttachMoney as ApprovedIcon,
  SentimentVeryDissatisfied as RejectedIcon,
} from "@mui/icons-material";
import { useQuery } from "react-query";
import SummaryCards from "../../components/screen/dashboard/SummaryCards";
import {
  ClaimSummary,
  DenialCodes,
  ActivityTypes,
  ActivityCodes,
} from "./modals";
import { SummaryCardModel } from "../../components/screen/dashboard/modals";
import { BarChart as BarChartModal } from "../../screens/dashboard/modals";
import { getClaims } from "../../useCase/dashboard";
import {
  PayersWiseClaims,
  TotalClaimSummary,
  DenialWiseClaimSummary,
  ActivityTypeClaimSummary,
  ActivityCodeClaimSummary,
} from "./controller";
import TopPayers from "../../components/screen/dashboard/TopPayerList";
import Chart from "../../components/screen/dashboard/Chart";
import BarChart from "../../components/screen/dashboard/Chart/barChart";
// import AreaChart from "../../components/screen/dashboard/Chart/AreaChart";

function DashBoard() {
  const { data: dashBoardResp } = useQuery({
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    refetchOnMount: false,
    queryFn: getClaims,
    queryKey: ["dashboard"],
  });

  const claims = dashBoardResp?.data?.claims || [];
  const denialList = dashBoardResp?.data?.denailList || [];
  const activityTypeList = dashBoardResp?.data?.activityTypeList || [];
  const activityCodeList = dashBoardResp?.data?.activityCodesList || [];

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
  const denailTopList = DenialWiseClaimSummary(cypClaims, denialList, [], [])
    .sort((a, b) => b.totalRejectAmount - a.totalRejectAmount)
    .slice(0, 10);
  const activityTypeTopList = ActivityTypeClaimSummary(
    cypClaims,
    activityTypeList
  );

  const activityCodeTopList = ActivityCodeClaimSummary(
    cypClaims,
    activityCodeList
  );
  const groupedChartArray = (
    key1: string,
    key2: string,
    key3: string,
    list: any[]
  ) => {
    const keyFirstArray: any[] = [];
    const keySecondArray: any[] = [];
    const keyThirdArray: any[] = [];

    list.forEach((item) => {
      keyFirstArray.push(item[key1]);
      keySecondArray.push(item[key2]);
      keyThirdArray.push(item[key3]);
    });

    return {
      list: [
        {
          name: key1,
          data: keyFirstArray,
        },
        {
          name: key2,
          data: keySecondArray,
        },
      ],
      xAxis: keyThirdArray,
    };
  };

  return (
    <Grid container spacing={0}>
      <Zoom in={cardList.length > 0}>
        <Grid item xs={12}>
          <SummaryCards {...{ cardList }} />
        </Grid>
      </Zoom>
      <Grid item xs={12}>
        <BarChart
          title="Activity Type (Count)"
          topList={activityTypeTopList
            .sort((a, b) => b.count - a.count)
            .slice(0, 10)
            .map(
              ({
                count,
                activityType: code,
                activityTypeDescription: description,
              }): BarChartModal => ({
                count,
                code: `${description}`,
                description,
              })
            )}
        />
      </Grid>

      <Zoom in={topList.length > 0}>
        <Grid item lg={4} xs={12}>
          <TopPayers
            topList={topList
              .sort((a, b) => b.totalClaimedAmount - a.totalClaimedAmount)
              .slice(0, 10)}
            title="TOP CLAIMED"
          />
        </Grid>
      </Zoom>

      <Grid container item lg={8}>
        <Grid item xs={12}>
          <BarChart
            title="Denial (Rejected Amount)"
            topList={denailTopList.map(
              ({
                totalRejectAmount,
                count,
                denialCode: code,
                denialCodeDescription: description,
              }): BarChartModal => ({
                count: totalRejectAmount,
                code,
                description,
              })
            )}
          />
        </Grid>
        <Zoom in={topList.length > 0}>
          <Grid item lg={6} xs={12}>
            <TopPayers
              topList={topList
                .sort((a, b) => b.totalApprovedAmount - a.totalApprovedAmount)
                .slice(0, 5)}
              title="TOP APPROVERS"
            />
          </Grid>
        </Zoom>
        <Zoom in={topList.length > 0}>
          <Grid item lg={6} xs={12}>
            <TopPayers
              topList={topList
                .sort((a, b) => b.totalRejectedAmount - a.totalRejectedAmount)
                .slice(0, 5)}
              title="TOP REJECTED"
            />
          </Grid>
        </Zoom>
      </Grid>
      <Grid item xs={12}>
        <Chart
          data={groupedChartArray(
            "totalClaimAmount",
            "totalRejectAmount",
            "activityTypeDescription",
            activityTypeTopList
              .sort((a, b) => b.totalRejectAmount - a.totalRejectAmount)
              .slice(0, 5)
          )}
          title="Activity Type(Rejected Amount)"
        />
      </Grid>
      <Grid item xs={12}>
        <Chart
          data={groupedChartArray(
            "totalClaimAmount",
            "totalRejectAmount",
            "activityDescription",
            activityCodeTopList
              .sort((a, b) => b.totalRejectAmount - a.totalRejectAmount)
              .slice(0, 5)
          )}
          title="Activity Code(Rejected Amount)"
        />
      </Grid>
    </Grid>
  );
}

export default DashBoard;
