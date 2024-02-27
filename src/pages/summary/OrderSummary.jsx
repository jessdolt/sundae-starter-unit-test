import React from "react"
import SummaryForm from "./SummaryForm"
import { useOrderDetails } from "../../context/OrderDetails"
import { formatCurrency } from "../../utils"

const OrderSummary = ({ phaseOnChange }) => {
  const { totals, optionCounts } = useOrderDetails()

  const scoopArray = Object.entries(optionCounts.scoops)
  const scoopList = scoopArray.map(([key, value]) => (
    <li key={key} name="scoops">
      {value} {key}
    </li>
  ))

  const toppingsArray = Object.keys(optionCounts.toppings)

  const toppingsList = toppingsArray.map((key) => (
    <li key={key} name="toppings">
      {key}
    </li>
  ))

  return (
    <div>
      <h1>Order Summary</h1>
      <h2>Scoops: {formatCurrency(totals.scoops)}</h2>
      <ul>{scoopList}</ul>
      {toppingsList.length > 0 && (
        <>
          <h2>Toopings: {formatCurrency(totals.toppings)}</h2>
          <ul>{toppingsList}</ul>
        </>
      )}

      <SummaryForm phaseOnChange={phaseOnChange} />
    </div>
  )
}

export default OrderSummary
