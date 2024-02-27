import { render } from "@testing-library/react"
import { OrderDetailsProvider } from "../context/OrderDetails"

const customRender = (ui, options) =>
  render(ui, { wrapper: OrderDetailsProvider, ...options })

// re-export everything
export * from "@testing-library/react"

// override render method
export { customRender as render }
