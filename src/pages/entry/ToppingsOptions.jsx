import React from "react"
import { Col, Form, Row } from "react-bootstrap"
import { useOrderDetails } from "../../context/OrderDetails"

const ToppingsOptions = ({ name, imagePath }) => {
  const { updateItemCount, optionCounts } = useOrderDetails()

  const handleCheckboxChange = (e) => {
    if (e.target.checked) {
      updateItemCount(name, 1, "toppings")
    } else {
      updateItemCount(name, 0, "toppings")
    }
  }

  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: "center" }}>
      <img
        style={{ width: "75%" }}
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} topping`}
      />
      <Form.Group
        controlId={`${name}-count`}
        as={Row}
        style={{ marginTop: 10 }}
      >
        <Col xs={12} style={{ textAlign: "left" }}>
          <Form.Check
            type="checkbox"
            onChange={handleCheckboxChange}
            value={optionCounts["toppings"][name]}
            id={`${name}-count`}
            label={name}
          />
        </Col>
      </Form.Group>
    </Col>
  )
}

export default ToppingsOptions
