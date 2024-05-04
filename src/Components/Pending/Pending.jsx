import React from "react";
import MainPending from "./MainPending";
import pending from "../../assets/pending.png";

export default function Pending() {
  return (
    <>
      <MainPending
        title="Verification Pending"
        photo={pending}
        status="Your account is pending. "
        message="We will notify you once it has been verified."
        button="Back to Home"
        path="/"
      />
    </>
  );
}
