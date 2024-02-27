import React from "react"
import Options from "./Options"
import { useOrderDetails } from "../../context/OrderDetails"
import { formatCurrency } from "../../utils"

const OrderEntry = ({ phaseOnChange }) => {
  const { totals, optionCounts } = useOrderDetails()

  const grandTotal = totals.scoops + totals.toppings

  const hasScoops =
    Object.entries(optionCounts["scoops"])
      .map(([key, value]) => value)
      .reduce((a, b) => a + b, 0) > 0

  return (
    <div>
      <h1>Design your sundae</h1>
      <Options optionType="scoops" />
      <Options optionType="toppings" />

      <h2>Grand Total: {formatCurrency(grandTotal)}</h2>
      <button
        onClick={() => phaseOnChange("review")}
        disabled={!hasScoops}
        className={totals.scoops > 0 ? "blue" : "gray"}
      >
        Proceed Order
      </button>
    </div>
  )
}

export default OrderEntry
