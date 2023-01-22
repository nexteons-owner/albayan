import { useState, useEffect } from "react";

function getNetworkConnection() {
  const nav: any = navigator;
  return nav.connection || nav.mozConnection || nav.webkitConnection || null;
}
function getConnectionInfo() {
  const connection = getNetworkConnection();
  if (!connection) {
    return {};
  }
  return {
    rtt: connection.rtt, // connection round trip time
    type: connection.type, // wifi/mobiledata
    downLink: connection.downLink, // estimate bandwidth
    downLinkMax: connection.downLinkMax, // maximum downlink
    saveData: connection.saveData, // android savedata,
    effectiveType: connection.effectiveType, // slow-2g,3g
  };
}

function useNetwork() {
  const [state, setState] = useState<{ online: boolean; since: any }>({
    since: undefined,
    online: navigator.onLine,
    ...getConnectionInfo(),
  });
  useEffect(() => {
    const handleOnline = () => {
      setState((prevState: any) => ({
        ...prevState,
        online: true,
        since: new Date().toString,
      }));
    };
    const handleOffline = () => {
      setState((prevState: any) => ({
        ...prevState,
        online: false,
        since: new Date().toString,
      }));
    };
    const handleConnctionChange = () => {
      setState((prevState: any) => ({
        ...prevState,
        ...getConnectionInfo(),
      }));
    };
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    const connection = getNetworkConnection();
    connection?.addEventListener("change", handleConnctionChange);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      connection?.removeEventListener("change", handleConnctionChange);
    };
  }, []);
  return state;
}
export default useNetwork;
