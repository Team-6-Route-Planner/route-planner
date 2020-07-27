import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useQuery, from } from "@apollo/client";
import { DETAILS_TRIP } from "../queries/trip";
import { useParams, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineOppositeContent from "@material-ui/lab/TimelineOppositeContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import Deliver from "@material-ui/icons/LocalShipping";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import green from "@material-ui/core/colors/green";
import lightgreen from "@material-ui/core/colors/lightGreen";
import DoneAllIcon from "@material-ui/icons/DoneAll";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: "6px 16px",
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },
}));

export default function History() {
  const classes = useStyles();

  const { userId } = useParams();
  console.log(userId);
  const { loading, error, data } = useQuery(DETAILS_TRIP, {
    variables: {
      userId,
    },
    pollInterval: 500,
  });

  if (loading) {
    return <p>Loading</p>;
  }
  if (error) {
    return <p>Error</p>;
  }

  return (
    <div className="mt-4 flex flex-column justify-content-center">
      <center>
        <h3 className="mt-4">Details Trip Courier</h3>
      </center>
      {/* <h3>{JSON.stringify(data)}</h3> */}
      <Timeline align="alternate">
        {data.getCurrentTrip.routes.map((route) => {
          return (
            <TimelineItem>
              <TimelineOppositeContent>
                <Typography variant="body2" color="textSecondary">
                  {route.arrivedAt}
                </Typography>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot
                  style={route.arrivedAt ? { background: green[500] } : null}
                >
                  <Deliver />
                </TimelineDot>
                <TimelineConnector style={{ height: 50 }} />
              </TimelineSeparator>
              <TimelineContent>
                <Paper elevation={3} className={classes.paper}>
                  <Typography>{route.address}</Typography>
                </Paper>
              </TimelineContent>
            </TimelineItem>
          );
        })}
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot style={data.status && { background: lightgreen[500] }}>
              <DoneAllIcon />
            </TimelineDot>
          </TimelineSeparator>
          <TimelineContent></TimelineContent>
        </TimelineItem>
      </Timeline>
    </div>
  );
}
