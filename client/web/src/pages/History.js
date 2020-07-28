import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import { GET_HISTORY } from "../queries/trip";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import CheckCircleRoundedIcon from "@material-ui/icons/CheckCircleRounded";
import green from "@material-ui/core/colors/green";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { Container } from "react-bootstrap";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const Accordion = withStyles({
  root: {
    border: "1px solid rgba(0, 0, 0, .125)",
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "auto",
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: "rgba(0, 0, 0, .03)",
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    marginBottom: -1,
    minHeight: 56,
    "&$expanded": {
      minHeight: 56,
    },
  },
  content: {
    "&$expanded": {
      margin: "12px 0",
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiAccordionDetails);

export default function CustomizedAccordions() {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  const { userId } = useParams();
  const { loading, error, data } = useQuery(GET_HISTORY, {
    variables: {
      userId,
    },
  });

  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  if (loading) {
    return <p>Loading</p>;
  }
  if (error) {
    return <p>Error</p>;
  }
  return (
    <div>
      {/* {JSON.stringify(data)} */}
      {!data.getHistory.length && (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <img src="https://image.freepik.com/free-vector/men-got-boring-nothing-by-checking-his-gadget_10045-598.jpg" />
        </div>
      )}
      {data.getHistory.map((trip) => {
        return (
          <Accordion
            square
            expanded={expanded === `${trip._id}`}
            onChange={handleChange(`${trip._id}`)}
          >
            <AccordionSummary
              aria-controls="panel3d-content"
              id="panel3d-header"
            >
              <Typography>
                {new Date(trip.startedAt).toLocaleDateString("id-Id", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <ul style={{ listStyle: "none" }}>
                  {trip.routes.map((route) => {
                    return (
                      <Card className={classes.root} style={{ marginTop: 15 }}>
                        <CardContent>
                          <Typography variant="h5" component="h2">
                            <CheckCircleRoundedIcon
                              style={{ color: green[500] }}
                            />
                            {route.address}
                          </Typography>
                        </CardContent>
                      </Card>
                    );
                  })}
                </ul>
              </Typography>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </div>
  );
}
