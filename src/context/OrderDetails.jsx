import { createContext, useContext, useMemo, useState } from "react"
import { pricePerItem } from "../constants"

const OrderDetails = createContext()

export function useOrderDetails() {
  const contextValue = useContext(OrderDetails)

  if (!contextValue)
    throw new Error(
      "useorderDetails must be called from within an OrderDetailsProvider"
    )

  return contextValue
}

export function OrderDetailsProvider(props) {
  const [optionCounts, setOptionCounts] = useState({
    scoops: {},
    toppings: {},
  })

  function updateItemCount(itemName, newItemCount, optionType) {
    const newOptionCounts = { ...optionCounts }

    newOptionCounts[optionType][itemName] = newItemCount

    setOptionCounts(newOptionCounts)
  }

  function resetOrder() {
    setOptionCounts({ scoops: {}, toppings: {} })
  }

  function caculateTotal(optionType) {
    const countsArray = Object.values(optionCounts[optionType])

    const totalCount = countsArray.reduce((total, value) => +total + +value, 0)

    return totalCount * pricePerItem[optionType]
  }

  const totals = useMemo(
    () => ({
      scoops: caculateTotal("scoops"),
      toppings: caculateTotal("toppings"),
    }),
    [optionCounts]
  )

  const value = {
    optionCounts,
    totals,
    updateItemCount,
    resetOrder,
  }

  return (
    <OrderDetails.Provider value={value} {...props}></OrderDetails.Provider>
  )
}
