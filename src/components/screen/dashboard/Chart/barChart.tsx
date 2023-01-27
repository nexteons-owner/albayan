import { Box, Typography, Card, CardContent } from "@mui/material";
import Chart from "react-apexcharts";
import WidgetCard from "../../../Card/WidgetCard";
import { DenialCodeSummary } from "../../../../screens/dashboard/modals";

interface Props {
  topList: DenialCodeSummary[];
  title: string;
}
const Visits = ({ topList, title }: Props) => {
  const optionscolumnchart = {
    chart: {
      id: "column-chart",
      fontFamily: "'DM Sans', sans-serif",
      foreColor: "#adb0bb",
      toolbar: {
        show: false,
      },
    },
    colors: ["#6ac3fd", "#0b70fb", "#f64e60"],
    plotOptions: {
      bar: {
        horizontal: false,
        endingShape: "rounded",
        columnWidth: "20%",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: topList.map(({ denialCode }) => denialCode),
    },
    yaxis: {
      title: {
        text: "$ (thousands)",
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter(val: any) {
          return `$ ${val} thousands`;
        },
      },
      theme: "dark",
    },
    grid: {
      show: false,
    },
    legend: {
      show: true,
    },
  };
  const seriescolumnchart = [
    {
      name: "Inflation",
      data: topList.map(({ count }) => count),
    },
  ];
  return (
    <Card>
      <Box p={2} display="flex" alignItems="center">
        <Box flexGrow={1}>
          <Typography variant="h4">{title}</Typography>
        </Box>
      </Box>
      <CardContent>
        <Chart
          options={optionscolumnchart}
          series={seriescolumnchart}
          type="bar"
          height="300px"
        />
      </CardContent>
    </Card>
  );
};

export default Visits;
