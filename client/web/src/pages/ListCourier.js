import React from "react";
import {Table, Button} from 'react-bootstrap'
export default function ListCourier(){
	const tableStyle = { 
    marginTop: "30px",
  };
	return(
		<>
			<Table striped bordered hover size="sm" style={tableStyle}>
			  <thead>
			    <tr>
			      <th>ID COURIER</th>
			      <th>USERNAME</th>
			      <th>STATUS</th>
			      <th>DETAIL LOKASI</th>
			    </tr>
			  </thead>
			  <tbody>
			    <tr>
			      <td>1</td>
			      <td>Mark</td>
			      <td>Otto</td>
			      <td><Button variant="outline-info">Lihat Lokasi</Button></td>
			    </tr>
			  </tbody>
			</Table>
		</>
	)
}