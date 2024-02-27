import { render, screen } from "../../../test-utils/testing-library-utils"
import OrderEntry from "../OrderEntry"
import { server } from "../../../mocks/server"
import { HttpResponse, http } from "msw"
import { expect } from "vitest"
import userEvent from "@testing-library/user-event"

test.skip("handles error for scoops and toppings routes", async () => {
  server.resetHandlers(
    http.get("http://localhost:3030/scoops", () => {
      return new HttpResponse(null, {
        status: 500,
      })
    }),
    http.get("http://localhost:3030/toppings", () => {
      return new HttpResponse(null, {
        status: 500,
      })
    })
  )

  render(<OrderEntry />)

  const alerts = await screen.findAllByRole("alert")

  expect(alerts).toHaveLength(2)
})

test("disable button when no scoops ordered", async () => {
  const user = userEvent.setup()
  render(<OrderEntry />)

  const submitButton = screen.getByRole("button", {
    name: /proceed order/i,
  })

  expect(submitButton).toBeDisabled()

  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  })

  await user.type(chocolateInput, "1")

  expect(submitButton).toBeEnabled()

  await user.clear(chocolateInput)
  await user.type(chocolateInput, "0")

  expect(submitButton).toBeDisabled()
})

test("change button color when scoops is present", async () => {
  const user = userEvent.setup()
  render(<OrderEntry />)

  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  })

  await user.clear(chocolateInput)
  await user.type(chocolateInput, "2")

  const totalHeading = screen.getByRole("heading", {
    name: /grand total/i,
  })

  expect(totalHeading).toHaveTextContent("4.00")

  const submitButton = screen.getByRole("button", {
    name: /proceed order/i,
  })

  expect(submitButton).toHaveClass("blue")
})

test("dont update scoop subtotal if the input is a negative number", async () => {
  const user = userEvent.setup()
  render(<OrderEntry />)

  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  })

  const scoopHeading = screen.getByText("Scoops total: $", { exact: false })

  await user.clear(chocolateInput)
  await user.type(chocolateInput, "-1")

  expect(scoopHeading).toHaveTextContent("0.00")
})
