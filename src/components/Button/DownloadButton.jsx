import React from 'react'
import { Button, Grid } from "@material-ui/core"
import SaveIcon from "@material-ui/icons/Save"

const DownloadButton = ({classes, handleClick}) => {
return <Grid container justify="flex-end" alignItems="flex-end" data-test="Grid">
    <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={handleClick}
        data-test="Button"
    >
        <SaveIcon data-test="SaveIcon"
            className={classes.leftIcon}/>
        Print PDF
    </Button>
</Grid> 
}
export default DownloadButton