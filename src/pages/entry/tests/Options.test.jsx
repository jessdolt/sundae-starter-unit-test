import userEvent from "@testing-library/user-event"
import { render, screen } from "../../../test-utils/testing-library-utils"
import Options from "../Options"

test("displays image for each scoop from the server", async () => {
  render(<Options optionType="scoops" />)

  const scoopImages = await screen.findAllByRole("img", {
    name: /scoop$/i,
  })

  expect(scoopImages).toHaveLength(2)

  const altText = scoopImages.map((element) => element.alt)
  expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"])
})

test("display image for each toppings from the server", async () => {
  render(<Options optionType="toppings" />)

  const toppingImages = await screen.findAllByRole("img", {
    name: /topping$/i,
  })

  expect(toppingImages).toHaveLength(3)

  const altText = toppingImages.map((element) => element.alt)
  expect(altText).toEqual([
    "M&Ms topping",
    "Hot fudge topping",
    "Cherries topping",
  ])
})

test("show red border in input when count is invalid", async () => {
  const user = userEvent.setup()

  render(<Options optionType="scoops" />)

  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  })

  await user.clear(chocolateInput)
  await user.type(chocolateInput, "-2")

  expect(chocolateInput).toHaveStyle("border-color: red")
})
