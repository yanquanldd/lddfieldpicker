import React, { useEffect, useState } from "react";
import { Card, Table } from "react-bootstrap";

interface SelectedFieldsTableProps {
  entries: any;
}

// Object that renders the detected selected fields when modifying the code
const SelectedFieldsTable: React.FC<SelectedFieldsTableProps> = ({ entries }) => {
  const [info, setInfo] = useState(Object.entries(entries));

  useEffect(() => {
    setInfo(Object.entries(entries));
  }, [entries]);

  return (
    <div className="container mt-5">
      <Card>
        <Card.Header>
          <h1>Input info</h1>
        </Card.Header>
        <Card.Body>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Key</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {info.map(([key, value]) => (
                <tr key={key}>
                  <td>{key}</td>
                  <td>{JSON.stringify(value)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  );
};

export default SelectedFieldsTable;
