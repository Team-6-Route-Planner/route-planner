import React,{useState} from "react"
import { useHistory } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { Form, Button, Row, Col } from 'react-bootstrap'
import {ADD_TRIP} from '../queries/trip.js'

export default function Home(){
	const history = useHistory();
	const [actionSubmit] = useMutation(ADD_TRIP)

	const [form, setForm] = useState({
		addresses: [],
	})
	const [address, setAddress] = useState("")

		const deleteAddress = (idx) => {
		  const _temp = [...form.addresses];
		  _temp.splice(idx, 1);
		  setForm({ ...form, addresses: _temp });
		};

		const changeAddress = (event) => {
		  setAddress(event.target.value);
		};

		const addAddress = () => {
		  const _temp = [...form.addresses];
		  _temp.push(address);
		  setForm({ ...form, addresses: _temp });
		  setAddress('');
		};

		const submitAdd = (event) => {
		  event.preventDefault();
		  const dataSubmission = { ...form };
		  console.log(dataSubmission);
		  actionSubmit({
		    variables: {
		      trip: dataSubmission,
		    },
		  })
		    .then((_) => {
		      history.push('/');
		    })
		    .catch((err) => console.log(err));
		};
	
	return(
	  <>
	  	  <center><h3 className="mt-4">Welcome to Admin Page</h3></center>
	  	  <Form className="mt-5" onSubmit={submitAdd}>

	        <Form.Group as={Row}>
	          <Form.Label column sm="3">
	            Addresses
	          </Form.Label>
	          <Col sm="5">
	            <Form.Control type="text" value={address} onChange={changeAddress} placeholder="e.g: Jl. Kp. Kelapa rt 07/012 Pabuaran, Bojong Gede" />
	          </Col>
	          <Col sm="4">
	            <Button onClick={addAddress} variant="outline-info">Add Address</Button>
	          </Col>
	        </Form.Group>

	        <Form.Group as={Row}>
	          <Col sm="3"></Col>
	          <Col sm="9">
	            {form.addresses.length < 1 ? (
	              <p>...</p>
	            ) : (
	              form.addresses.map((address, idx) => (
	                <Button
	                  variant="secondary"
	                  className="ml-2 mb-4"
	                  key={idx}
	                  onClick={() => {
	                    deleteAddress(idx);
	                  }}
	                >
	                  {address}
	                  <span className="ml-3">x</span>
	                </Button>
	              ))
	            )}
	          </Col>
	        </Form.Group>

	        <div className="text-center">
	          <Button className="mt-5" variant="outline-primary" type="submit">
	            Submit Trip
	          </Button>
	        </div>
	      </Form>
	  </>
	)
}