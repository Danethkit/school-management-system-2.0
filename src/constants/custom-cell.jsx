import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import ReactDom from 'react-dom'
import '../data/fac-dummy'

const BootstrapInput = withStyles(theme => ({
    root: {
        'label + &': {
            marginTop: theme.spacing.unit * 3,
        },
    },
    input: {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        // border: '1px solid #ced4da',
        fontSize: 16,
        width: 'auto',
        padding: '10px 26px 10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            // borderRadius: 4,
            // borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
}))(InputBase);

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing.unit,
    },
    bootstrapFormLabel: {
        fontSize: 18,
    },
});




var data =[];



class CustomCell extends React.Component{
    componentWillMount() {

        con.map((con,index) =>
        {
            return(data.push((con.url+ " by " +con.name)))
        })
    }
    handleChange = event => {
        this.setState({ age: event.target.value });
    };
    render() {
        const { classes } = this.props;

        return (


            <FormControl className={classes.margin}>

                <NativeSelect
                    value={this.state.age}
                    onChange={this.handleChange}
                    input={<BootstrapInput name="age" id="age-customized-native-simple" />}
                >
                    {data.map(option => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </NativeSelect>
            </FormControl>

        );
    }
}
CustomCell.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomCell);
