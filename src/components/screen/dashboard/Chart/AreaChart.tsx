import React from "react";
import Chart from "react-apexcharts";
import { Card, CardContent, Box, Typography } from "@mui/material";
import { ApexOptions } from "apexcharts";

const BCrumb = [
  {
    to: "/",
    title: "Home",
  },
  {
    title: "Area Chart",
  },
];

const AreaChart = () => {
  const optionsareachart: ApexOptions = {
    chart: {
      height: 350,
      type: "line",
      fontFamily: "'DM Sans', sans-serif",
      foreColor: "#adb0bb",
      zoom: {
        type: "x",
        enabled: true,
      },
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    },
    grid: {
      show: false,
    },
    colors: ["#0b70fb", "#6ac3fd"],
    dataLabels: {
      enabled: true,
    },
    stroke: {
      curve: "straight",
      width: 2,
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
      floating: true,
      show: true,
    },
    tooltip: {
      theme: "dark",
    },
  };
  const serieslinechart = [
    {
      name: "High - 2013",
      data: [28, 29, 33, 36, 32, 32, 33],
    },
    {
      name: "Low - 2013",
      data: [12, 11, 14, 18, 17, 13, 13],
    },
  ];

  return (
    <Card>
      <Box p={2} display="flex" alignItems="center">
        <Box flexGrow={1}>
          <Typography variant="h4">Area Charts</Typography>
        </Box>
      </Box>
      <CardContent>
        <Chart
          options={optionsareachart}
          series={serieslinechart}
          type="line"
          height="308px"
        />
      </CardContent>
    </Card>
  );
};

export default AreaChart;
