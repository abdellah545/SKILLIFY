import React from 'react'
import MainPending from './MainPending'
import rejected from "../../assets/rejection.png";
export default function Rejection() {
  return (
    <>
    <MainPending
        title="Verification Rejected"
        photo={rejected}
        status="Your account has been rejected. "
        message="Please contact the admin."
        button="Back to Sign Up"
        path="/register"
      />
    </>
  )
}
