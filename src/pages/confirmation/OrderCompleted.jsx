import React, { useEffect, useState } from "react"
import { useOrderDetails } from "../../context/OrderDetails"
import axios from "axios"

const OrderCompleted = ({ phaseOnChange }) => {
  const [orderNumber, setOrderNumber] = useState("")
  const [error, setError] = useState(false)
  const { resetOrder } = useOrderDetails()

  useEffect(() => {
    const fetchOrderNumber = async () => {
      try {
        const { data } = await axios.post("http://localhost:3030/order")
        await new Promise((resolve) => setTimeout(() => resolve("done"), 100))
        setOrderNumber(data.orderNumber)
      } catch (e) {
        setError(true)
      }
    }

    fetchOrderNumber()
  }, [])

  const handleOnClick = () => {
    resetOrder()
    phaseOnChange("inProgress")
  }

  if (error) {
    return <p>Something went wrong. Please try again later.</p>
  }

  if (orderNumber)
    return (
      <div>
        <h1>Thank you</h1>
        <p>Your order number: {orderNumber}</p>
        <button onClick={handleOnClick}>Create new order</button>
      </div>
    )

  return <div>Loading... </div>
}

export default OrderCompleted
