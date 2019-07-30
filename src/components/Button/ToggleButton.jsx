import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormatAlignCenterIcon from '@material-ui/icons/FormatAlignCenter';
import TodayIcon from '@material-ui/icons/TodayOutlined'
import Grid from '@material-ui/core/Grid';
import {Button} from '@material-ui/core'


const useStyles = makeStyles(theme => ({
  toggleContainer: {
    position:'absolute',
  },
  active:{
      color: theme.palette.primary.main
  },
  disable:{
      color:'gray'
  }
}));

export default function ToggleButtons({onChange, mode}) {

  const classes = useStyles();

  return (
    <Grid container justify="flex-end" alignItems="baseline" style={{ marginBottom: 40}} data-test="Grid"  >
        <div className={classes.toggleContainer}>
            <Button data-test="Button" variant="contained" className={mode === 'create' ? classes.active : classes.disable} onClick={()=>onChange('create')}>
                <TodayIcon data-test="TodayIcon" />
            </Button>
            <Button data-test="Button" variant="contained" className={mode === 'view' ? classes.active : classes.disable}  onClick={()=>onChange('view')} >
                <FormatAlignCenterIcon  data-test="FormatAlignCenterIcon"/>
            </Button>
        </div>
    </Grid>
  );
}