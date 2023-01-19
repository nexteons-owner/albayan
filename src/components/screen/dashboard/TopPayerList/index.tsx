import {
  Box,
  Typography,
  Card,
  CardContent,
  LinearProgress,
  Tooltip,
} from "@mui/material";
import WidgetCard from "../../../Card/WidgetCard";
import { TopListModel } from "../modals";

interface Props {
  topList: TopListModel[];
  title: string;
}

const Visits = ({ topList, title }: Props) => (
  <Card
    sx={{
      pb: 0,
      mb: 4,
    }}
  >
    <CardContent
      sx={{
        pb: 0,
      }}
    >
      <WidgetCard title={title} />
      <Box sx={{ mt: -1 }}>
        {topList.map((item) => (
          <Box
            key={item.payerCode}
            sx={{
              pb: 2,
              pt: 1,
            }}
          >
            <Typography
              variant="h4"
              sx={{
                lineHeight: "1.235",
              }}
            >
              {item.payerName}
            </Typography>
            <Box
              display="flex"
              alignItems="center"
              sx={{
                pb: "3px",
              }}
            >
              <Tooltip title="Payer Code">
                <Typography color="textSecondary" variant="h6">
                  {item.payerCode}
                </Typography>
              </Tooltip>

              <Box
                sx={{
                  ml: "auto",
                }}
              >
                <Tooltip title="Total Approved Percantage">
                  <Typography
                    color="textSecondary"
                    variant="h6"
                    fontWeight="400"
                  >
                    {item.totalApprovePerc}%
                  </Typography>
                </Tooltip>
              </Box>
            </Box>

            <LinearProgress
              value={item.totalApprovePerc}
              variant="determinate"
              sx={{
                "& span": {
                  backgroundColor:
                    item.color === "secondary"
                      ? (theme) => theme.palette.secondary.main
                      : item.color === "error"
                      ? (theme) => theme.palette.error.main
                      : item.color === "warning"
                      ? (theme) => theme.palette.warning.main
                      : item.color === "success"
                      ? (theme) => theme.palette.success.main
                      : item.color === "primary"
                      ? (theme) => theme.palette.primary.main
                      : (theme) => theme.palette.primary.main,
                },
              }}
            />
            <Box
              display="flex"
              alignItems="center"
              sx={{
                pb: "3px",
              }}
            >
              <Tooltip title="Total Claimed Amount">
                <Typography color="textSecondary" variant="h6">
                  {item.totalClaimedAmount}
                </Typography>
              </Tooltip>

              <Box
                sx={{
                  ml: "auto",
                }}
              >
                <Tooltip title="Total Approved Amount">
                  <Typography
                    color="textSecondary"
                    variant="h6"
                    fontWeight="400"
                  >
                    {item.totalApprovedAmount}
                  </Typography>
                </Tooltip>
                <Tooltip title="Total Rejected Amount">
                  <Typography color="error" variant="h6" fontWeight="400">
                    {item.totalRejectedAmount}
                  </Typography>
                </Tooltip>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </CardContent>
  </Card>
);

export default Visits;
