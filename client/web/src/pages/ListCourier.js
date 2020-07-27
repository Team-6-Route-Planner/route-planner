import React from "react";
import { Table, Button } from "react-bootstrap";
import { FETCH_All_USER } from "../queries/trip";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";

export default function ListCourier() {
  const { loading, error, data } = useQuery(FETCH_All_USER, {
    pollInterval: 500,
  });

  if (loading) {
    return <p>Loading</p>;
  }
  if (error) {
    return <p>Error</p>;
  }

  const tableStyle = {
    marginTop: "30px",
  };
  return (
    <>
      <Table striped bordered hover size="sm" style={tableStyle}>
        <thead>
          <tr>
            <th>ID COURIER</th>
            <th>USERNAME</th>
            <th>STATUS</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {/* {JSON.stringify(data)} */}
          {data.getAllUser.map((user) => {
            return (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.username}</td>
                <td>{user.status ? "available" : "on delivery"}</td>
                <td>
                  <Button variant="outline-info">Lihat Lokasi</Button>
                  {!user.status && (
                    <Button variant="outline-info">
                      <Link to={`/detailstrip/${user._id}`}>Details</Link>
                    </Button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}
