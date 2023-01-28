import {
  Box,
  Typography,
  Card,
  CardContent,
  LinearProgress,
  Tooltip,
} from "@mui/material";
import Chart from "react-apexcharts";
import { useTheme } from "@mui/material/styles";
import { ApexOptions } from "apexcharts";
import WidgetCard from "../../../Card/WidgetCard";
import { TopListModel } from "../modals";

interface Props {
  data: GroupedData;
  title: string;
}
interface GroupedData {
  list: GroupedBarChart[];
  xAxis: string[];
}
interface GroupedBarChart {
  name: string;
  data: number[];
}

const Visits = ({ data, title }: Props) => {
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;

  const optionssalesoverview: ApexOptions = {
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
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "42%",
        borderRadius: 5,
      },
    },

    colors: [primary, secondary],
    fill: {
      type: "solid",
      opacity: 1,
    },
    chart: {
      toolbar: {
        show: false,
      },
      foreColor: "#adb0bb",
      fontFamily: "'DM Sans',sans-serif",
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 0,
    },
    legend: {
      show: false,
    },
    xaxis: {
      type: "category",
      categories: data.xAxis.map((item) => item),
      labels: {
        style: {
          cssClass: "grey--text lighten-2--text fill-color",
        },
      },
    },
    yaxis: {
      show: true,
      tickAmount: 3,
    },
    stroke: {
      show: true,
      width: 5,
      lineCap: "butt",
      colors: ["transparent"],
    },
    tooltip: {
      theme: "dark",
    },
  };
  return (
    <Card>
      <Box p={2} display="flex" alignItems="center">
        <Box flexGrow={1}>
          <Typography variant="h4">{title}</Typography>
        </Box>
      </Box>
      <CardContent>
        <Chart
          options={optionssalesoverview}
          series={data.list}
          type="bar"
          height="300px"
        />
      </CardContent>
    </Card>
  );
};

export default Visits;
