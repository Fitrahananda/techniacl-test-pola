import React from "react";
import { Form, Button } from "react-bootstrap";
import { useEffect, useState } from "react";

export default function FormVIew({ fectchdata }) {
  const [name, setName] = useState();

  const submit = () => {
    console.log(name);
    fetch("http://localhost:3000/catagories", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
      }),
    })
      .then(() => {
        fectchdata();
      })

      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>name Category</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter name"
          onChange={(e) => {
            const value = e.target.value;
            setName(value);
          }}
        />
      </Form.Group>
      <Button
        variant="primary"
        onClick={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        Submit
      </Button>
    </Form>
  );
}
