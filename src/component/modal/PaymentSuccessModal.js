import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
const PaymentSuccess = ({ openDialog, handleClose, tokenData }) => {
  // console.log("tokenData", tokenData)
  return (
    <>
      <Dialog
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" style={{ textAlign: "center" }}>
          {"Transaction Successful!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <CheckCircleIcon style={{ marginLeft: "45%" }} />
            <br />
            <p>Id: {tokenData?.id}</p>
            <p>Name: {tokenData?.card.name}</p>
            <p>Email: {tokenData?.email}</p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            style={{ margin: "0 auto" }}
            color="primary"
            autoFocus
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PaymentSuccess;
