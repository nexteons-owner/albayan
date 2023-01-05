import React from "react";
import { styled } from "@mui/material/styles";
import { Typography, TypographyProps } from "@mui/material";

interface Props extends TypographyProps {
  htmlFor?: string;
}

const CustomFormLabel: React.FC<Props> = styled((props: Props) => (
  <Typography
    variant="h6"
    {...props}
    component="label"
    htmlFor={props.htmlFor}
  />
))(() => ({
  marginBottom: "5px",
  marginTop: "15px",
  display: "block",
}));

export default CustomFormLabel;
