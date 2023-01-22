import { Suspense, useEffect, useState } from "react";
import { useQuery } from "react-query";
// import { useLoaderData, defer } from "react-router-dom";
import { getClaims } from "../../services/user";
import DashBoardMain from "../../screens/dashboard";
import { ClaimSummary, ClaimSummaryApi } from "../../screens/dashboard/modals";
import PageContainer from "../../global/layouts/pageContainer";
import { Sspiner } from "../../components/customUiControls";

function DashBoard() {
  // const dashBoardResp: any = useLoaderData();
  const [claims, setClaims] = useState<ClaimSummary[]>([]);

  const {
    status,
    isLoading,
    error,
    data: dashBoardResp,
  } = useQuery({
    queryFn: getClaims,
    queryKey: ["dashboard"],
  });

  useEffect(() => {
    const dashBoardList = dashBoardResp?.data?.data?.dashBoardData || [];
    if (dashBoardList.length > 0) {
      const formatedClaims: ClaimSummary[] = dashBoardList?.map(
        ({
          _submittedDate,
          _approvedAmount,
          _approvedDate,
          _claimStatus,
          _grossAmount,
          _netAmount,
          _patientShare,
          _payer,
          _payerCode,
          _receiver,
          _receiverCode,
          _submissionType,
        }: ClaimSummaryApi) => {
          const item: ClaimSummary = {
            submittedDate: _submittedDate,
            receiver: _receiver,
            receiverCode: _receiverCode,
            payer: _payer,
            payerCode: _payerCode,
            grossAmount: _grossAmount,
            patientShare: _patientShare,
            netAmount: _netAmount,
            approvedAmount: _approvedAmount,
            approvedDate: _approvedDate,
            submissionType: _submissionType,
            claimStatus: _claimStatus,
          };
          return item;
        }
      );
      setClaims(formatedClaims);
    }
  }, [dashBoardResp]);

  return (
    <PageContainer
      title="Albayan Dashboard"
      description="Albayan Claims Dashboard"
    >
      {isLoading ? <Sspiner /> : <DashBoardMain claims={claims} />}
    </PageContainer>
  );
}

export default DashBoard;

// export async function getClaimsLoader() {
//   const resp = await getClaims();
//   if (resp.status) {
//     return defer({
//       dashBoardList: resp.data?.data?.dashBoardData || [],
//     });
//   } else {
//     throw new Response("Network Call Failed", {
//       status: 404,
//       statusText: resp.msg,
//     });
//   }
// }
