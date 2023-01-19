import React from "react";
import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";

interface Props {
  title: string;
}
const WidgetCard = ({ title }: Props) => (
  <Box>
    <Typography
      variant="h3"
      sx={{
        mb: 2,
      }}
    >
      {title}
    </Typography>
  </Box>
);

WidgetCard.propTypes = {
  title: PropTypes.string.isRequired,
};

export default WidgetCard;
