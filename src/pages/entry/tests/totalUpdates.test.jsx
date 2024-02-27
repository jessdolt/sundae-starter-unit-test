import {
  logRoles,
  render,
  screen,
} from "../../../test-utils/testing-library-utils"
import Options from "../Options"
import userEvent from "@testing-library/user-event"
import OrderEntry from "../OrderEntry"
import { expect } from "vitest"

test("update scoop subtotal when scoops change", async () => {
  const user = userEvent.setup()
  render(<Options optionType="scoops" />)

  const scoopsSubtotal = screen.getByText("Scoops total: $", { exact: false })

  expect(scoopsSubtotal).toHaveTextContent("0.00")

  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  })

  await user.clear(vanillaInput)
  await user.type(vanillaInput, "1")
  expect(scoopsSubtotal).toHaveTextContent("2.00")

  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  })

  await user.clear(chocolateInput)
  await user.type(chocolateInput, "2")
  expect(scoopsSubtotal).toHaveTextContent("6.00")
})

test("update toppings subtotal when toppings change", async () => {
  const user = userEvent.setup()

  render(<Options optionType="toppings" />)

  const toppingSubtotal = screen.getByText("Toppings total: $", {
    exact: false,
  })

  expect(toppingSubtotal).toHaveTextContent("0.00")

  const mnmInput = await screen.findByRole("checkbox", {
    name: "M&Ms",
  })

  await user.click(mnmInput)

  expect(toppingSubtotal).toHaveTextContent("1.50")

  const hotFudgeInput = await screen.findByRole("checkbox", {
    name: "Hot fudge",
  })

  await user.click(hotFudgeInput)

  expect(toppingSubtotal).toHaveTextContent("3.00")

  // update total when unchecked

  await user.click(mnmInput)
  expect(toppingSubtotal).toHaveTextContent("1.50")

  await user.click(hotFudgeInput)
  expect(toppingSubtotal).toHaveTextContent("0.00")
})

describe("Grand Total", () => {
  test("must be zero at first", () => {
    render(<OrderEntry />)

    const grandTotalPrice = screen.getByRole("heading", {
      name: /grand total: \$/i,
    })

    expect(grandTotalPrice).toHaveTextContent("0.00")
  })

  test("must update the value whenever scoops change", async () => {
    const user = userEvent.setup()

    render(<OrderEntry />)

    const grandTotalPrice = screen.getByRole("heading", {
      name: /grand total: \$/i,
    })

    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    })

    await user.clear(vanillaInput)
    await user.type(vanillaInput, "1")

    expect(grandTotalPrice).toHaveTextContent("2.00")

    const chocolateInput = await screen.findByRole("spinbutton", {
      name: "Chocolate",
    })

    await user.clear(chocolateInput)
    await user.type(chocolateInput, "1")
    expect(grandTotalPrice).toHaveTextContent("4.00")
  })

  test("must update the value whenever toppings change", async () => {
    const user = userEvent.setup()

    render(<OrderEntry />)

    const grandTotalPrice = screen.getByRole("heading", {
      name: /grand total: \$/i,
    })

    const mnmCheckbox = await screen.findByRole("checkbox", {
      name: "M&Ms",
    })

    const hotFudgeCheckbox = await screen.findByRole("checkbox", {
      name: "Hot fudge",
    })

    await user.click(mnmCheckbox)
    expect(grandTotalPrice).toHaveTextContent("1.50")
    await user.click(mnmCheckbox)
    expect(grandTotalPrice).toHaveTextContent("0.00")

    await user.click(hotFudgeCheckbox)
    expect(grandTotalPrice).toHaveTextContent("1.50")
  })

  test("must update the value whenever toppings and scoops change", async () => {
    const user = userEvent.setup()

    render(<OrderEntry />)

    const grandTotalPrice = screen.getByRole("heading", {
      name: /grand total: \$/i,
    })

    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    })

    await user.clear(vanillaInput)
    await user.type(vanillaInput, "2")

    expect(grandTotalPrice).toHaveTextContent("4.00")

    const mnmCheckbox = await screen.findByRole("checkbox", {
      name: "M&Ms",
    })

    await user.click(mnmCheckbox)
    expect(grandTotalPrice).toHaveTextContent("5.50")

    await user.clear(vanillaInput)
    expect(grandTotalPrice).toHaveTextContent("1.50")
  })
})
