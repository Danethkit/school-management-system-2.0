import React from 'react';
import Select from 'react-select';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import NoSsr from '@material-ui/core/NoSsr';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import {InputAdornment, MenuItem} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    height: 60,
    padding:0,
    margin:0
  },
  input: {
    display: 'flex',
    padding:0,
    height: '100%',
  },
  paper: {
    position: 'absolute',
    zIndex: 999,
    marginTop: theme.spacing(1),
    left: 0,
    right: 0,
    top:50,
    boxShadow:'-16px 10px 26px -8px rgba(0,0,0,0.61)'
  },
}));

function inputComponent({ inputRef, ...props }) {
    return  <div ref={inputRef} {...props}/>;
}

const ControlComponent = props => {
   return <TextField
          fullWidth
          margin='normal'
          variant='outlined'
          InputProps={{
            inputComponent,
            startAdornment: <InputAdornment position="start"><b>{props.selectProps.label}</b></InputAdornment>,
            inputProps: {
                className: props.selectProps.classes.input,
                inputRef: props.innerRef,
                children: props.children,
                ...props.innerProps,
              },
          }}
          {...props.selectProps.TextFieldProps}
        />
    }

function Menu(props) {
  return (
    <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
      {props.children}
    </Paper>
  );
}
function Option(props) {
  return (
    <MenuItem
      ref={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontWeight: props.isSelected ? 500 : 400,
      }}
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
  );
}

function AutoComplete(props) {
  const classes = useStyles();
  const theme = useTheme();
  const {suggestions, value, onChange} = props

  const selectStyles = {
    input: base => ({
      ...base,
      color: theme.palette.secondary,
      '& input': {
        font: 'inherit',
      },
    }),
  };
  let suggestionsObj = suggestions.map(e => ({label:e,value:e}))

  return (
    <div className={classes.root}>
      <NoSsr>
        <Select
          classes={classes}
          isClearable={true}
          styles={selectStyles}
          options={suggestionsObj}
          value={value}
          onChange={onChange}
          components={{ Control: ControlComponent, Menu:Menu, Option:Option}}
          placeholder=''
          {...props}
        />
      </NoSsr>
    </div>
  );
}
// =========================== PropTypes
export default AutoComplete


Option.propTypes = {
    children: PropTypes.node,
    innerProps: PropTypes.object,
    innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    isFocused: PropTypes.bool,
    isSelected: PropTypes.bool,
};

Menu.propTypes = {
    children: PropTypes.node,
    innerProps: PropTypes.object,
    selectProps: PropTypes.object,
};