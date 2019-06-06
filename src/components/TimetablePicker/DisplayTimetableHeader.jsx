import React from'react'
import {Breadcrumbs,Typography} from '@material-ui/core';
function DisplayTimetableHeader({header, week})
{
    return(
        <div style={{marginTop:30, padding:0}}>
        <Breadcrumbs separator="/" aria-label="Breadcrumb">
          <Typography color="textPrimary" variant="h5">{header.course}</Typography>
          <Typography color="textPrimary" variant="h5">{header.batch}</Typography>
          <Typography color="textPrimary" variant="h5">{header.semester}</Typography>
          <Typography color="textPrimary" variant="h5">{header.group}</Typography>
          <Typography color="textPrimary" variant="h5">week:{week}</Typography>
        </Breadcrumbs>
      </div>
    )
}
export default DisplayTimetableHeader
