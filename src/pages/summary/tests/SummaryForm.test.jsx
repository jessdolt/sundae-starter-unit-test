import { render, screen } from "@testing-library/react"
import user from "@testing-library/user-event"
import SummaryForm from "../SummaryForm"
import { expect } from "vitest"

describe("Summary Form", () => {
  test("renders correctly", () => {
    render(<SummaryForm />)
    const checkboxElement = screen.getByRole("checkbox", {
      name: /i agree to terms and conditions/i,
    })

    expect(checkboxElement).not.toBeChecked()

    const buttonElement = screen.getByRole("button", {
      name: /confirm order/i,
    })

    expect(buttonElement).toBeDisabled()
  })

  test("Checkbox disabled button on first click and enables on second click", async () => {
    user.setup()

    render(<SummaryForm />)

    const checkboxElement = screen.getByRole("checkbox", {
      name: /i agree to terms and conditions/i,
    })
    const buttonElement = screen.getByRole("button", {
      name: /confirm order/i,
    })

    await user.click(checkboxElement)

    expect(buttonElement).toBeEnabled()

    await user.click(checkboxElement)

    expect(buttonElement).toBeDisabled()
  })

  test("popover responds to hover", async () => {
    user.setup()
    render(<SummaryForm />)

    const nullPopover = screen.queryByText(
      /no ice cream will actually be delivered/i
    )

    expect(nullPopover).not.toBeInTheDocument()

    const termsAndConditions = screen.getByText(/terms and conditions/i)

    await user.hover(termsAndConditions)

    const popver = screen.getByText(/no ice cream will actually be delivered/i)

    expect(popver).toBeInTheDocument()

    await user.unhover(termsAndConditions)

    expect(popver).not.toBeInTheDocument()
  })
})
