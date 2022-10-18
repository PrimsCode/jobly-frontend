import React from "react";
import {Grid, CircularProgress} from '@mui/material';

/** Loading message used by components that fetch API data. */

function Loading() {
    const centering = {display: "flex", justifyContent: "center", alignItems:"center"};
  return (
    <Grid container style={centering}>
      <CircularProgress />
    </Grid>
  );
}

export default Loading;