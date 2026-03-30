import React from 'react'
import successful from "../../assets/successful.png";
import MainPending from './MainPending';

export default function Confirmation() {
  return (
    <>
      <MainPending
        title="Good Job!"
        photo={successful}
        status="Your transaction is copleted successfully."
        message="Now you can join to your course!"
        button="Back to Home"
        path="/categories"
      />
    </>
  )
}
