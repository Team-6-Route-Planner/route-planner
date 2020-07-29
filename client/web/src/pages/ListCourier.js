import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { FETCH_All_USER } from "../queries/trip";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { Container, Row, Col } from "react-bootstrap";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    width: 151,
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));

export default function ListCourier() {
  const classes = useStyles();
  const theme = useTheme();

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
    <Container>
      <Row style={{ marginTop: 30 }}>
        {data.getAllUser.map((user) => {
          return (
            <Col sm={6} style={{ marginBottom: 20 }}>
              <Card
                className={classes.root}
                style={{
                  padding: 10,
                  marginTop: 15,
                  height: 250,
                  width: 500,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                }}
              >
                <div className={classes.details}>
                  <CardContent className={classes.content}>
                    <Typography
                      component="h5"
                      variant="h5"
                      style={{ fontWeight: "bold" }}
                    >
                      {user.username}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      style={{
                        color: `${user.status ? "green" : "red"}`,
                        fontSize: "20px",
                      }}
                    >
                      {user.status ? "Tersedia" : "Dalam perjalanan"}
                    </Typography>
                    <Typography
                      style={{ display: "flex", flexDirection: "column" }}
                    >
                      {user.lat && (
                        <Button
                          variant="contained"
                          color="primary"
                          style={{ marginRight: 5, marginBottom: 5, width: 200 }}
                        >
                          <Link
                            to={`/track/${user._id}`}
                            style={{ color: "white" }}
                          >
                            Lokasi Kurir
                          </Link>
                        </Button>
                      )}
                      {!user.status && (
                        <Button
                          variant="contained"
                          color="primary"
                          style={{ marginBottom: 5, width: 200}}
                        >
                          <Link
                            to={`/detailstrip/${user._id}`}
                            style={{ color: "white" }}
                          >
                            Detail Perjalanan
                          </Link>
                        </Button>
                      )}
                      <Button
                        variant="contained"
                        color="primary"
                        style={{ marginRight: 10, width: 200 }}
                      >
                        <Link
                          to={`/history/${user._id}`}
                          style={{ color: "white" }}
                        >
                          Riwayat Perjalanan
                        </Link>
                      </Button>
                    </Typography>
                  </CardContent>
                </div>
                <CardMedia
                  className={classes.cover}
                  image={
                    user.status
                      ? "https://image.freepik.com/free-vector/men-got-boring-nothing-by-checking-his-gadget_10045-598.jpg"
                      : "https://image.freepik.com/free-vector/delivery-service-with-man-scooter_23-2148496523.jpg"
                  }
                  title="Live from space album cover"
                />
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}
