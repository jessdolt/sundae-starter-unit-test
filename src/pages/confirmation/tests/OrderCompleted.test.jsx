import { HttpResponse, http } from "msw"
import { server } from "../../../mocks/server"
import { render, screen } from "../../../test-utils/testing-library-utils"
import OrderCompleted from "../OrderCompleted"

test("Show error alert when order post request failed", async () => {
  server.resetHandlers(
    http.post("http://localhost:3030/order", async () => {
      return HttpResponse.json({}, { status: 500 })
    })
  )

  render(<OrderCompleted />)

  const errorElement = await screen.findByText(
    "Something went wrong. Please try again later.",
    {
      exact: false,
    }
  )

  expect(errorElement).toBeInTheDocument()
})
