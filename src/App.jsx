import { Container } from "react-bootstrap"
import { OrderDetailsProvider } from "./context/OrderDetails"
import OrderEntry from "./pages/entry/OrderEntry"
import { useState } from "react"
import OrderSummary from "./pages/summary/OrderSummary"
import OrderCompleted from "./pages/confirmation/OrderCompleted"

function App() {
  const [orderPhase, setOrderPhase] = useState("inProgress")

  const handleOrderPhaseChange = (phase) => {
    setOrderPhase(phase)
  }

  let Component = OrderEntry

  switch (orderPhase) {
    case "inProgress":
      Component = OrderEntry
      break

    case "review":
      Component = OrderSummary
      break
    case "complete":
      Component = OrderCompleted
      break
    default:
      break
  }

  return (
    <Container>
      <OrderDetailsProvider>
        <Container>
          {<Component phaseOnChange={handleOrderPhaseChange} />}
        </Container>
      </OrderDetailsProvider>
    </Container>
  )
}

export default App
