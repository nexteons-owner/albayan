import { Suspense, useEffect, useState } from "react";
import { useQuery } from "react-query";
// import { useLoaderData, defer } from "react-router-dom";
import { getClaims } from "../../useCase/dashboard";
import DashBoardMain from "../../screens/dashboard";
import {
  ClaimSummary,
  DenialCodes,
  ActivityTypes,
  ActivityCodes,
} from "../../screens/dashboard/modals";
import PageContainer from "../../global/layouts/pageContainer";
import { Sspiner } from "../../components/customUiControls";

function DashBoard() {
  const { isLoading } = useQuery({
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    refetchOnMount: false,
    queryFn: getClaims,
    queryKey: ["dashboard"],
  });

  return (
    <PageContainer
      title="Albayan Dashboard"
      description="Albayan Claims Dashboard"
    >
      {isLoading ? <Sspiner /> : <DashBoardMain />}
    </PageContainer>
  );
}

export default DashBoard;
