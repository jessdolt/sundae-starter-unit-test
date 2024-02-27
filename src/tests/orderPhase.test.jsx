import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import App from "../App"
import { expect } from "vitest"

describe("App", () => {
  test("order phases for happy path", async () => {
    const user = userEvent.setup()
    // render app
    render(<App />)

    // add ice cream scoops and toppings
    const chocolateInput = await screen.findByRole("spinbutton", {
      name: "Chocolate",
    })

    await user.clear(chocolateInput)
    await user.type(chocolateInput, "2")

    const hotFudgeCheckbox = await screen.findByRole("checkbox", {
      name: "Hot fudge",
    })

    await user.click(hotFudgeCheckbox)

    const mnmCheckbox = await screen.findByRole("checkbox", {
      name: "M&Ms",
    })

    await user.click(mnmCheckbox)

    // find and click order button
    const proceedButton = await screen.findByRole("button", {
      name: "Proceed Order",
    })

    await user.click(proceedButton)

    const orderSummaryHeading = screen.getByRole("heading", {
      name: /order summary/i,
    })

    expect(orderSummaryHeading).toBeInTheDocument()

    // check summary information based on order

    expect(screen.getByText("2 Chocolate")).toBeInTheDocument()
    expect(screen.getByText("Hot fudge")).toBeInTheDocument()
    expect(screen.getByText("M&Ms")).toBeInTheDocument()

    // accept terms and conditions and click button to confirm order
    const termsCheckbox = screen.getByRole("checkbox", {
      name: /terms and conditions/i,
    })

    const confirmButton = screen.getByRole("button", {
      name: /confirm order/i,
    })

    await user.click(termsCheckbox)
    expect(confirmButton).toBeEnabled()

    await user.click(confirmButton)

    // confirm order number on confirmation page
    const loading = screen.getByText("loading...", {
      exact: false,
    })
    expect(loading).toBeInTheDocument()

    const confirmationHeading = await screen.findByRole("heading", {
      name: /thank you/i,
    })

    expect(confirmationHeading).toBeInTheDocument()

    const orderNumber = await screen.findByText("Your order number: 420420")
    expect(orderNumber).toBeInTheDocument()

    // click "new order" button on confirmation page

    const createButton = await screen.findByRole("button", {
      name: /create new order/i,
    })
    expect(createButton).toBeInTheDocument()

    await user.click(createButton)
    // check the scoops and toppings subtotals have been reset

    const scoopSubtotal = screen.getByText("Scoops total: $", {
      exact: false,
    })

    expect(scoopSubtotal).toHaveTextContent("0.00")

    const toppingSubtotal = screen.getByText("Toppings total: $", {
      exact: false,
    })

    expect(toppingSubtotal).toHaveTextContent("0.00")

    // do we need to await anything to avoid test errors?
  })

  test("order phases with no toppings", async () => {
    const user = userEvent.setup()
    // render app
    render(<App />)

    // add ice cream scoops and toppings
    const chocolateInput = await screen.findByRole("spinbutton", {
      name: "Chocolate",
    })

    await user.clear(chocolateInput)
    await user.type(chocolateInput, "2")

    // find and click order button
    const proceedButton = await screen.findByRole("button", {
      name: "Proceed Order",
    })

    await user.click(proceedButton)

    // check summary information based on order
    const orderSummaryHeading = screen.getByRole("heading", {
      name: /order summary/i,
    })

    expect(orderSummaryHeading).toBeInTheDocument()
    expect(screen.getByText("2 Chocolate")).toBeInTheDocument()
    const toppingSummaryHeading = screen.queryByRole("heading", {
      name: /toppings/i,
    })
    expect(toppingSummaryHeading).not.toBeInTheDocument()
  })
})
