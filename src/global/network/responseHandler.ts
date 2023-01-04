import { RESPONSE } from "./responseStatus";

const responseHandler = (res: any) => {
  try {
    if (res && res.status) {
      switch (res.status) {
        case RESPONSE.POST_SUCCESS:
          return { status: true, data: res.data, msg: "" };
        case RESPONSE.GET_SUCCESS:
          return { status: true, data: res.data, msg: "" };
        case RESPONSE.PUT_SUCCESS:
          return { status: true, data: res.data, msg: "" };
        case RESPONSE.BAD_REUEST:
          return { status: false, data: null, msg: res.data.message };
        case RESPONSE.ERROR:
          return { status: false, data: null, msg: res.data.message };
        case RESPONSE.FORBIDDEN:
          return { status: false, data: null, msg: res.data.message };
        case RESPONSE.NOT_FOUND:
          return { status: false, data: null, msg: res.data.message };
        case RESPONSE.UNAUNTHORIZED:
          return { status: false, data: null, msg: res.data.message };
        case RESPONSE.DOCUMENT_ERROR:
          return { status: false, data: null, msg: res.data.message };
        default:
          return {
            status: false,
            data: null,
            msg: "Something went wrong --mH",
          };
      }
    } else {
      console.log(res && JSON.stringify(res));
      return { status: false, data: null, msg: "Contact Admin S100" };
    }
  } catch (error) {
    return { status: false, data: null, msg: "Something went wrong --nH" };
  }
};
export default responseHandler;
