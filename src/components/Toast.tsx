import { Alert, AlertColor, Snackbar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Status } from "../types/Status";
type Props = {
  status: Status;
};
function Toast({ status }: Props) {
  const [_status, setStatus] = useState(Status.NONE);

  useEffect(() => {
    setStatus(status);
  }, [status]);

  const getServerity = (status: Status): AlertColor => {
    switch (status) {
      case Status.ERROR:
        return "error";
      case Status.SUCCESS:
        return "success";
      default:
        return "info";
    }
  };

  const getAlertMessage = (status: Status): string => {
    switch (status) {
      case Status.ERROR:
        return "Post Failed";
      case Status.SUCCESS:
        return "Posted";
      case Status.LOADING:
        return "Posting";
      default:
        return "";
    }
  };

  return (
    <>
      {_status !== Status.NONE ? (
        <Snackbar
          open={true}
          autoHideDuration={3000}
          onClose={() => {
            setStatus(Status.NONE);
          }}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert severity={getServerity(_status)}>
            {getAlertMessage(_status)}
          </Alert>
        </Snackbar>
      ) : null}
    </>
  );
}

export default Toast;
