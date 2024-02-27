import { delay, http, HttpResponse } from "msw"

export const handlers = [
  http.get("http://localhost:3030/scoops", () => {
    return HttpResponse.json([
      {
        name: "Chocolate",
        imagePath: "/images/chocolate.png",
      },
      {
        name: "Vanilla",
        imagePath: "/images/vanilla.png",
      },
    ])
  }),
  http.get("http://localhost:3030/toppings", () => {
    return HttpResponse.json([
      {
        name: "M&Ms",
        imagePath: "/images/m-and-ms.png",
      },
      {
        name: "Hot fudge",
        imagePath: "/images/hot-fudge.png",
      },
      {
        name: "Cherries",
        imagePath: "/images/cherries.png",
      },
    ])
  }),
  http.post("http://localhost:3030/order", async () => {
    await delay(100)
    return HttpResponse.json({
      orderNumber: "420420",
    })
  }),
]
