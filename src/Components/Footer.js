import React from "react";
import {
    Grid,
    makeStyles, 
    Typography
  } from "@material-ui/core";

  const styles = (theme) => ({
    footer: {
      marginTop: theme.spacing(4),
      padding: theme.spacing(1),
      textAlign: "center",
    },
    title: {
        margin: theme.spacing(2),
        display: "block"
    }
  });

const useStyles = makeStyles(styles);

export default function Footer() {
    const classes = useStyles();

    return (
        <Grid
            container
            className={classes.footer}
            direction="row"
            justifyContent="center"
            alignItems="flex-end"
        >
            <p>
                <Typography variant="" className={classes.title}>
                    Avolidly
                </Typography>

                <a href="https://discord.gg/u6hfFmmKQc">Discord</a> |&nbsp;
                <a href="https://twitter.com/avaxsolidly">Twitter</a>
            </p>
        </Grid>

    );
}