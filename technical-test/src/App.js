import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import MainHome from "./views/MainHome";
import FormVIew from "./views/FormView";
import { Routes, Route } from "react-router-dom";

function App() {
  const [catagoreis, setCategories] = useState();
  const [form, setForm] = useState(false);

  const fectchdata = () => {
    fetch(" http://localhost:3000/catagories", {
      method: "GET", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const deleteName = (id) => {
    console.log(id);
    fetch(`http://localhost:3000/catagories/${id}`, {
      method: "DELETE", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => fectchdata())

      .catch((error) => {
        console.error("Error:", error);
      });
  };
  useEffect(() => {
    fectchdata();
  }, []);
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>no</th>
            <th>Category Name</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>
          {catagoreis &&
            catagoreis.map((categories) => (
              <tr>
                <td>{categories.id}</td>
                <td>{categories.name}</td>
                <td>
                  <Button
                    variant="primary"
                    onClick={() => {
                      setForm(true);
                    }}
                  >
                    create
                  </Button>
                  <Button variant="primary">edit</Button>
                  <Button
                    variant="primary"
                    onClick={() => {
                      deleteName(categories.id);
                    }}
                  >
                    delete
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <FormVIew fectchdata={fectchdata} />
    </>
  );
}

export default App;
