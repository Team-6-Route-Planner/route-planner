import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { Form, Row, Col, Container } from "react-bootstrap";
import { ADD_TRIP } from "../queries/trip.js";
import { FETCH_USERS } from "../queries/trip.js";
import Button from "@material-ui/core/Button";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import Icon from "@material-ui/core/Icon";
import SaveIcon from "@material-ui/icons/Save";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import InputBase from "@material-ui/core/InputBase";

const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

export default function Home() {
  const classes = useStyles();
  const [age, setAge] = React.useState("");
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const history = useHistory();

  const { loading, error, data } = useQuery(FETCH_USERS);

  const [actionSubmit] = useMutation(ADD_TRIP);
  const [userId, setUserId] = useState("");

  function onChangeUserId(e) {
    const { value } = e.target;
    setUserId(value);
    console.log(value);
  }

  const [form, setForm] = useState({
    addresses: [],
  });
  const [address, setAddress] = useState("");

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
    setAddress("");
  };

  const submitAdd = (event) => {
    event.preventDefault();
    let dataSubmission = { ...form };
    console.log(dataSubmission, "<<< datasub");
    console.log(userId);
    actionSubmit({
      variables: {
        addresses: dataSubmission.addresses,
        userId,
      },
    })
      .then((_) => {
        history.push("/listcourier");
      })
      .catch((err) => console.log(err));
  };
  if (loading) return <p>Loading... </p>;
  if (error) return <p>Error... ${error.message} </p>;
  return (
    <>
      <div
        className="parallax"
        style={{
          backgroundImage: `url(
              "https://images.unsplash.com/photo-1580674285054-bed31e145f59?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
            )`,
          height: "80vh",
          width: "100vw",
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(30,144,255, 0.2)",
            position: "absolute",
            top: "64px",
            height: "730px",
            width: "100%",
          }}
        >
          <h3
            style={{
              fontFamily: "MuseoModerno",
              color: "#f4f6ff",
              fontSize: 130,
              textAlign: "center",
            }}
          >
            Selamat Datang di Route Master
          </h3>
        </div>
      </div>
      <Container
        style={{
          height: "60vh",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <div>
          <h3
            style={{
              fontFamily: "MuseoModerno",
              color: "black",
              fontSize: 30,
              marginTop: 50,
            }}
          >
            Tambah Perjalanan
          </h3>
          <Form className="mt-5" onSubmit={submitAdd}>
            <Form.Group as={Row}>
              <Form.Label column sm="2">
                Petugas Kurir
              </Form.Label>
              <Col sm="6">
                <FormControl
                  className={classes.margin}
                  as="select"
                  className="users"
                  value={userId}
                  onChange={(e) => onChangeUserId(e)}
                >
                  <NativeSelect
                    style={{ width: 500 }}
                    id="demo-customized-select-native"
                    value={age}
                    onChange={handleChange}
                    input={<BootstrapInput />}
                  >
                    <option aria-label="None" value="" />
                    {data.getAvailables.map((user) => (
                      <option key={user._id} value={user._id}>
                        {user.username}
                      </option>
                    ))}
                  </NativeSelect>
                </FormControl>
              </Col>
            </Form.Group>

            <Form.Group as={Row} style={{ alignItems: "center" }}>
              <Form.Label column sm="2">
                Alamat Paket
              </Form.Label>
              <Col sm="6">
                <FormControl
                  style={{ width: 500 }}
                  className={classes.margin}
                  type="text"
                >
                  <BootstrapInput
                    id="demo-customized-textbox"
                    value={address}
                    onChange={changeAddress}
                    placeholder="e.g: Jl. Kp. Kelapa rt 07/012 Pabuaran, Bojong Gede"
                  />
                  <Button
                    onClick={addAddress}
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    endIcon={<Icon>send</Icon>}
                  >
                    Tambah
                  </Button>
                </FormControl>
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Col sm="2"></Col>
              <Col sm="10" style={{ width: 100 }}>
                {form.addresses.length < 1 ? (
                  <p></p>
                ) : (
                  form.addresses.map((address, idx) => (
                    <Button
                      style={{ marginRight: 5, marginBottom: 10 }}
                      variant="contained"
                      color="secondary"
                      className={classes.button}
                      startIcon={<DeleteIcon />}
                      key={idx}
                      onClick={() => {
                        deleteAddress(idx);
                      }}
                    >
                      {address}
                      <span className="ml-3"></span>
                    </Button>
                  ))
                )}
                <div className="text-center">
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    className={classes.button}
                    startIcon={<SaveIcon />}
                  >
                    Tambah Perjalanan
                  </Button>
                </div>
              </Col>
            </Form.Group>
            {/* <div className="text-center">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                className={classes.button}
                startIcon={<SaveIcon />}
              >
                Tambah Perjalanan
              </Button>
            </div> */}
          </Form>
        </div>
      </Container>
    </>
  );
}
