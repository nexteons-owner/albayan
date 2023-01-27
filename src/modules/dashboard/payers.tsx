import { Suspense, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getClaims } from "../../useCase/dashboard";
import PayerDashBoard from "../../screens/dashboard/payers";
import { ClaimSummary } from "../../screens/dashboard/modals";
import PageContainer from "../../global/layouts/pageContainer";
import { Sspiner } from "../../components/customUiControls";

function DashBoard() {
  const [claims, setClaims] = useState<ClaimSummary[]>([]);

  const { isLoading, data: dashBoardResp } = useQuery({
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    refetchOnMount: false,
    queryFn: getClaims,
    queryKey: ["dashboard"],
  });

  useEffect(() => {
    if (dashBoardResp?.status) {
      const claimsList = dashBoardResp?.data?.claims || [];
      setClaims(claimsList);
    }
  }, [dashBoardResp]);

  return (
    <PageContainer
      title="Albayan Dashboard"
      description="Albayan Payers Dashboard"
    >
      {isLoading ? <Sspiner /> : <PayerDashBoard claims={claims} />}
    </PageContainer>
  );
}

export default DashBoard;
