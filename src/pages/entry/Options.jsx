import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"
import ScoopOptions from "./ScoopOptions"
import { Row } from "react-bootstrap"
import ToppingsOptions from "./ToppingsOptions"
import AlertBanner from "../common/AlertBanner"
import { pricePerItem } from "../../constants"
import { formatCurrency } from "../../utils"
import { useOrderDetails } from "../../context/OrderDetails"

const Options = ({ optionType }) => {
  const [items, setItems] = useState([])
  const [error, setError] = useState(false)
  const { totals } = useOrderDetails()

  useEffect(() => {
    const controller = new AbortController()

    const fetchOptions = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3030/${optionType}`,
          {
            signal: controller.signal,
          }
        )

        setItems(response.data)
      } catch (e) {
        // if (error.name !== "CancelledError") setError(true)
        // else setError(false)
        setError(true)
      }
    }

    fetchOptions()

    return () => {
      // controller.abort()
    }
  }, [optionType])

  if (error) {
    return <AlertBanner />
  }

  const ItemComponent = optionType === "scoops" ? ScoopOptions : ToppingsOptions
  const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase()

  const optionItems = items.map((item) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
    />
  ))

  return (
    <>
      <h2>{title}</h2>
      <p>{formatCurrency(pricePerItem[optionType])} each </p>
      <p>
        {title} total: {formatCurrency(totals[optionType])}
      </p>
      <Row>{optionItems}</Row>
    </>
  )
}

export default Options
