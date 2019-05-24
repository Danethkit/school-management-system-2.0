import React from 'react'
import classNames from "classnames"
import { Button, Grid } from "@material-ui/core"
import SaveIcon from "@material-ui/icons/Save"

const DownloadButton = ({classes}) => {
return <Grid container justify="flex-end" alignItems="flex-end">
    <Button
        variant="contained"
        color="default"
        className={classes.button}
    >
        <SaveIcon
            className={classNames(classes.leftIcon, classes.iconSmall)}
        />
        Download
    </Button>
</Grid> 
}
export default DownloadButton