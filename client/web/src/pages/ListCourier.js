import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Table, Button } from "react-bootstrap";
import { FETCH_All_USER } from "../queries/trip";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import { Container, Row, Col } from "react-bootstrap";

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
      <Row>
        {data.getAllUser.map((user) => {
          return (
            <Col sm={6} style={{ marginBottom: 20 }}>
              <Card
                className={classes.root}
                style={{
                  padding: 10,
                  marginTop: 15,
                  height: 200,
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
                      {user.status ? "available" : "on delivery"}
                    </Typography>
                    <Typography>
                      {user.lat && (
                        <Button
                          variant="outline-info"
                          style={{ marginRight: 10 }}
                        >
                          <Link to={`/track/${user._id}`}>Location</Link>
                        </Button>
                      )}
                      {!user.status && (
                        <Button variant="outline-info">
                          <Link to={`/detailstrip/${user._id}`}>Details</Link>
                        </Button>
                      )}
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

{
  /* <Table striped bordered hover size="sm" style={tableStyle}>
<thead>
  <tr>
    <th>ID COURIER</th>
    <th>USERNAME</th>
    <th>STATUS</th>
    <th>Action</th>
  </tr>
</thead>
<tbody>
  {/* {JSON.stringify(data)} */
}
//   {data.getAllUser.map((user) => {
//     return (
//       <tr key={user._id}>
//         <td>{user._id}</td>
//         <td>{user.username}</td>
//         <td>{user.status ? "available" : "on delivery"}</td>
//         <td>
//           {/* {JSON.stringify(user)} */}
//           {user.lat && (
//             <Button variant="outline-info">
//               <Link to={`/track/${user._id}`}>Location</Link>
//             </Button>
//           )}
//           {!user.status && (
//             <Button variant="outline-info">
//               <Link to={`/detailstrip/${user._id}`}>Details</Link>
//             </Button>
//           )}
//         </td>
//       </tr>
//     );
//   })}
// </tbody>
// </Table> */}
