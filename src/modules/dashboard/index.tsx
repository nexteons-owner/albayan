import { Suspense } from "react";
import { useLoaderData, defer, Await } from "react-router-dom";
import { getClaims } from "../../services/user";

function DashBoard() {
  const albums: any = useLoaderData();

  return (
    <>
      <Suspense fallback={<p>Loading</p>}>
        <Await
          resolve={albums.response}
          errorElement={<h3>Some error happens</h3>}
        >
          {(response) => <h2>{JSON.stringify(response, null, 2)}</h2>}
        </Await>
      </Suspense>
    </>
  );
}

export default DashBoard;

export async function getClaimsLoader() {
  return defer({ response: await getClaims() });
}
