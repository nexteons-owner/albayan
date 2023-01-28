import { Box, Typography, Card, CardContent } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Chart from "react-apexcharts";
import WidgetCard from "../../../Card/WidgetCard";
import { BarChart } from "../../../../screens/dashboard/modals";

interface Props {
  topList: BarChart[];
  title: string;
}
const Visits = ({ topList, title }: Props) => {
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const optionscolumnchart = {
    grid: {
      show: true,
      borderColor: "transparent",
      strokeDashArray: 2,
      padding: {
        left: 0,
        right: 0,
        bottom: -13,
      },
    },
    chart: {
      toolbar: {
        show: false,
      },
      foreColor: "#adb0bb",
      fontFamily: "'DM Sans',sans-serif",
    },
    colors: [primary],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "42%",
        endingShape: "rounded",
        borderRadius: 5,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 5,
      colors: ["transparent"],
    },
    xaxis: {
      categories: topList.map(({ code }) => code),
      labels: {
        style: {
          cssClass: "grey--text lighten-2--text fill-color",
        },
      },
    },
    yaxis: {
      title: {
        text: "",
      },
    },
    fill: {
      type: "solid",
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (
          value: any,
          { series, seriesIndex, dataPointIndex, w }: any
        ) {
          const desc = topList[dataPointIndex].description || "";
          return desc + "<br/>" + value;
        },
      },
      // custom: function (opts: any) {
      //   const desc = topList[opts.dataPointIndex].description || "";
      //   const value = opts.series[opts.seriesIndex][opts.dataPointIndex];
      //   return (
      //     '<div style={{ margin: "10px" }}>' +
      //     "<span>" +
      //     desc +
      //     "</br>" +
      //     value +
      //     "</span>" +
      //     "</div>"
      //   );
      // },
      theme: "dark",
      fixed: {
        enabled: false,
        position: "bottomLeft",
        offsetX: 0,
        offsetY: 0,
      },
    },
    markers: {
      size: 0,
    },
    legend: {
      show: false,
    },
  };
  const seriescolumnchart = [
    {
      name: "",
      data: topList.map(({ count, description }) => count),
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
          height="350px"
        />
      </CardContent>
    </Card>
  );
};

export default Visits;
