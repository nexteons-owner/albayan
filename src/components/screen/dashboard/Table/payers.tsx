import React, { useState } from "react";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableRow,
  TableCell,
  LinearProgress,
  IconButton,
  Avatar,
  Tooltip,
} from "@mui/material";
import { TopListModel } from "../modals";

import DashboardCard from "../../../Card/DashboardCard";
interface Props {
  topList: TopListModel[];
  title?: string;
}
const ProductsTable = ({ topList }: Props) => {
  return (
    <DashboardCard title={`PAYERS SUMMARY (${topList.length})`}>
      <Box
        sx={{
          overflow: {
            xs: "auto",
            sm: "unset",
          },
          mt: -2,
        }}
      >
        <Table
          sx={{
            whiteSpace: {
              xs: "nowrap",
              sm: "unset",
            },
          }}
        >
          <TableBody>
            {topList.map((item) => (
              <TableRow key={item.payerCode}>
                <TableCell
                  sx={{
                    pl: 0,
                  }}
                >
                  <Box display="flex" alignItems="center">
                    <Box
                      sx={{
                        ml: 2,
                      }}
                    >
                      <Typography variant="h6">{item.payerName}</Typography>
                      <Typography
                        color="textSecondary"
                        variant="h6"
                        fontWeight="400"
                      >
                        {item.payerCode}
                      </Typography>
                      <Tooltip
                        title={`Approval Perc :${item.totalApprovePerc}`}
                      >
                        <LinearProgress
                          value={item.totalApprovePerc}
                          variant="determinate"
                          sx={{
                            "& span": {
                              backgroundColor:
                                item.totalApprovePerc > 80
                                  ? (theme) => theme.palette.primary.main
                                  : item.totalApprovePerc > 75
                                  ? (theme) => theme.palette.success.main
                                  : item.totalApprovePerc > 50
                                  ? (theme) => theme.palette.warning.main
                                  : item.totalApprovePerc < 50
                                  ? (theme) => theme.palette.error.main
                                  : (theme) => theme.palette.primary.main,
                            },
                          }}
                        />
                      </Tooltip>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell
                  sx={{
                    pl: 0,
                  }}
                >
                  <Tooltip title={`Total Claim `}>
                    <Typography
                      variant="h6"
                      sx={{
                        mb: 1,
                      }}
                    >
                      {item.totalClaimedAmount}
                    </Typography>
                  </Tooltip>
                  <Tooltip title={`Total Approved`}>
                    <Typography
                      color="textSecondary"
                      variant="h6"
                      fontWeight="400"
                      sx={{
                        mt: 1,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {item.totalApprovedAmount}
                    </Typography>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  <Typography
                    color="textSecondary"
                    variant="h6"
                    fontWeight="400"
                  >
                    Claims
                  </Typography>
                  <Tooltip title={`Count`}>
                    <Typography variant="h5">
                      {item.totalClaimedCount}
                    </Typography>
                  </Tooltip>
                  <Tooltip title={`Amount`}>
                    <Typography variant="h5">
                      {item.totalClaimedAmount}
                    </Typography>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  <Typography
                    color="textSecondary"
                    variant="h6"
                    fontWeight="400"
                  >
                    Approved
                  </Typography>
                  <Tooltip title={`Count`}>
                    <Typography variant="h5">
                      {item.totalApprovedCount}
                    </Typography>
                  </Tooltip>
                  <Tooltip title={`Amount`}>
                    <Typography variant="h5">
                      {item.totalApprovedAmount}
                    </Typography>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  <Typography
                    color="textSecondary"
                    variant="h6"
                    fontWeight="400"
                  >
                    Rejected
                  </Typography>{" "}
                  <Tooltip title={`Count`}>
                    <Typography variant="h5">
                      {item.totalRejectedCount}
                    </Typography>
                  </Tooltip>
                  <Tooltip title={`Amount`}>
                    <Typography variant="h5">
                      {item.totalRejectedAmount}
                    </Typography>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  <Typography
                    color="textSecondary"
                    variant="h6"
                    fontWeight="400"
                  >
                    Pending
                  </Typography>
                  <Tooltip title={`Count`}>
                    <Typography variant="h5">
                      {item.totalPendingCount}
                    </Typography>
                  </Tooltip>
                  <Tooltip title={`Amount`}>
                    <Typography variant="h5">
                      {item.totalPendingAmount}
                    </Typography>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </DashboardCard>
  );
};

export default ProductsTable;
