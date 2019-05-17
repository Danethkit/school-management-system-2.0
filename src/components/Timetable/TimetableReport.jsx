import React from 'react'
import ReactDom from 'react-dom'
import { Divider, InputBase, Paper, Table, TableBody, TableCell, TableHead, TableRow, withStyles, Button, Toolbar
} from "@material-ui/core";

class TimetableReport extends React.Component{

    state ={
        dataf:''
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    render()
    {
        return(
            <div>
                 <InputBase value={"hello"} />
            </div>
        )
    }
}



export default TimetableReport