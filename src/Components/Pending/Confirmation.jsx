import React from 'react'
import successful from "../../assets/successful.png";
import MainPending from './MainPending';

export default function Confirmation() {
  return (
    <>
      <MainPending
        title="Verification Successful"
        photo={successful}
        status="Your transaction is successful."
        message="Now you can join to your course!"
        button="Back to Home"
        path="/categories"
      />
    </>
  )
}
