import { Grid, Slide } from "@mui/material";
import { ClaimSummary } from "./modals";
import { TopListModel } from "../../components/screen/dashboard/modals";
import { PayersWiseClaims } from "./controller";
import Table from "../../components/screen/dashboard/Table/claims";
interface Props {
  claims: ClaimSummary[];
}

function DashBoard({ claims }: Props) {
  const cypClaims: ClaimSummary[] = [...claims];
  const topList: TopListModel[] = PayersWiseClaims(cypClaims);

  return (
    <Grid container spacing={0}>
      <Slide direction="left" in={topList.length > 0}>
        <Grid item xs={12}>
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

export default DashBoard;
