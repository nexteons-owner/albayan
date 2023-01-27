import { Suspense, useEffect, useState } from "react";
import { useQuery } from "react-query";
// import { useLoaderData, defer } from "react-router-dom";
import { getClaims } from "../../useCase/dashboard";
import DashBoardMain from "../../screens/dashboard";
import { ClaimSummary, DenialCodes } from "../../screens/dashboard/modals";
import PageContainer from "../../global/layouts/pageContainer";
import { Sspiner } from "../../components/customUiControls";

function DashBoard() {
  const [claims, setClaims] = useState<ClaimSummary[]>([]);
  const [denialList, setDenialList] = useState<DenialCodes[]>([]);

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
      const denailList = dashBoardResp?.data?.denailList || [];
      setClaims(claimsList);
      setDenialList(denailList);
    }
  }, [dashBoardResp]);

  return (
    <PageContainer
      title="Albayan Dashboard"
      description="Albayan Claims Dashboard"
    >
      {isLoading ? (
        <Sspiner />
      ) : (
        <DashBoardMain claims={claims} denialList={denialList} />
      )}
    </PageContainer>
  );
}

export default DashBoard;
