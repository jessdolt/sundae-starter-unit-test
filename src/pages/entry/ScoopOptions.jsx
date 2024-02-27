import Col from "react-bootstrap/Col"
import { useOrderDetails } from "../../context/OrderDetails"
import { Form, Row } from "react-bootstrap"
import { useState } from "react"

export default function ScoopOptions({ name, imagePath }) {
  const [error, setError] = useState(false)
  const { updateItemCount } = useOrderDetails()

  const handleInputChange = (e) => {
    if (+e.target.value < 0) {
      setError(true)
      return
    }

    setError(false)
    updateItemCount(name, e.target.value, "scoops")
  }

  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: "center" }}>
      <img
        style={{ width: "75%" }}
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} scoop`}
      />
      <Form.Group
        controlId={`${name}-count`}
        as={Row}
        style={{ marginTop: 10 }}
      >
        <Form.Label column xs={6} style={{ textAlign: "center" }}>
          {name}
        </Form.Label>
        <Col xs={5} style={{ textAlign: "left" }}>
          <Form.Control
            type="number"
            defaultValue={0}
            style={{
              borderColor: error && "red",
            }}
            onChange={handleInputChange}
          />
        </Col>
      </Form.Group>
    </Col>
  )
}
