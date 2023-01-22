import React from "react";
import { Card, CardContent, Typography, Fab, Box, Grid } from "@mui/material";

import { SummaryCardModel } from "../modals";
interface Props {
  cardList: SummaryCardModel[];
}
const SummaryCards = ({ cardList }: Props) => (
  <Card
    sx={{
      p: 0,
    }}
  >
    <Grid container spacing={0}>
      {cardList.map((topcard, index) => (
        <Grid item xs={6} lg={3} sm={3} key={topcard.subtext}>
          <CardContent
            sx={{
              borderRight: {
                xs: "0",
                sm: "1px solid rgba(0,0,0,0.1)",
              },
              padding: "30px",
              "& :last-child": {
                borderRight: "0",
              },
            }}
          >
            <Fab
              size="large"
              aria-label="top-cards"
              sx={{
                backgroundColor: topcard.btnbg,
                color: topcard.btntext,
                boxShadow: "none",
                "&:hover": {
                  backgroundColor: topcard.btnbg,
                },
              }}
            >
              {topcard?.icon}
            </Fab>
            <Typography
              color="textSecondary"
              variant="h6"
              fontWeight="400"
              sx={{
                mt: 2,
              }}
            >
              {topcard.subtext}
            </Typography>
            <Box display="flex" alignItems="center">
              <Typography variant="h3">{topcard.digits}</Typography>
              <Typography
                color={
                  topcard.type === "profit" ? "success.main" : "error.main"
                }
                variant="caption"
                fontWeight="400"
                sx={{
                  ml: 1,
                }}
              >
                {topcard.profit}%
              </Typography>
            </Box>
            <Typography variant="h5">{topcard.secondaryText}</Typography>
          </CardContent>
        </Grid>
      ))}
    </Grid>
  </Card>
);

export default SummaryCards;
