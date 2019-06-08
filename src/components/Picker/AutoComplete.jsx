import React from "react";
import PropTypes from "prop-types";
import deburr from "lodash/deburr";
import Downshift from "downshift";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import InputAdornment from '@material-ui/core/InputAdornment'
import {connect} from 'react-redux'



function renderInput(inputProps) {
  const { InputProps, classes, ref,label, ...other } = inputProps;
  return (
    <TextField
      multiline
      variant='outlined'
      InputProps={{
        inputRef: ref,
        startAdornment: <InputAdornment position="start"><b>{label}</b></InputAdornment>,
        classes: {
          root: classes.inputRoot,
          input: classes.inputInput
        },
        ...InputProps
      }}
      {...other}
    />
  );
}

function renderSuggestion(suggestionProps) {
  const {
    suggestion,
    index,
    itemProps,
    highlightedIndex,
    selectedItem,
    rest,
    selectedFaculty
  } = suggestionProps;
  let selectedFacultyStr = ""
  let {row, col} = rest
  for(let course in selectedFaculty){
    for(let batch in selectedFaculty[course]){
      for(let semester in selectedFaculty[course][batch]){
        for(let group in selectedFaculty[course][batch][semester]){
          if(col in selectedFaculty[course][batch][semester][group]){
            if(row in selectedFaculty[course][batch][semester][group][col]){
              selectedFacultyStr = selectedFaculty[course][batch][semester][group][col][row]
            }
          }
        }
      }
    }
  }
  const isHighlighted = highlightedIndex === index;
  const isSelected = (selectedItem || "").indexOf(suggestion.label) > -1;
  const isBusy = selectedFacultyStr === suggestion.label ? true : false
  console.log('isBusy', isBusy)
  return (
    <MenuItem
      {...itemProps}
      key={suggestion.label}
      selected={isHighlighted}
      disabled={isBusy}
      component="div"
      style={{
        fontWeight: isSelected ? 500 : 400
      }}
    >
      {suggestion.label}
    </MenuItem>
  );
}

function getSuggestions(value, { showEmpty = false } = {}, suggestions) {
  const inputValue = deburr(value.trim()).toLowerCase();
  const inputLength = inputValue.length;
  return inputLength === 0 && !showEmpty
    ? []
    : suggestions.filter(suggestion => suggestion.label.toLowerCase().includes(inputValue));
}

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    container: {
      flexGrow: 1,
      position: "relative"
    },
    paper: {
      position: "absolute",
      zIndex: 1,
      marginTop: theme.spacing(1),
      left: 0,
      right: 0,
      width:400,
      boxShadow: theme.shadows[5]
    },
    inputRoot: {
      flexWrap: "wrap"
    },
    inputInput: {
      width: "auto",
      flexGrow: 1,
    },
    divider: {
      height: theme.spacing(2)
    }
  })
);
function stateReducer(state, changes) {
  // this prevents the menu from being closed when the user
  // selects an item with a keyboard or mouse
  switch (changes.type) {
    case Downshift.stateChangeTypes.keyDownEnter:
    case Downshift.stateChangeTypes.clickItem:
      return {
        ...changes,
        isOpen: false,
        highlightedIndex: state.highlightedIndex,
      }
    default:
      return changes
  }
}
const areEqual = (prevProps, nextProps) => {
  let {course, batch, semester, group} = nextProps.header
  let {row, col} = nextProps
}

function AutoComplete({suggestions,value,onChange, label, selectedFaculty, ...rest}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.divider} />
      <Downshift id="downshift-options" onChange={onChange} selectedItem={value}  stateReducer={stateReducer} >
        {({
          clearSelection,
          getInputProps,
          getItemProps,
          getLabelProps,
          getMenuProps,
          highlightedIndex,
          inputValue,
          isOpen,
          openMenu,
          selectedItem,
        }) => {
          const { onBlur, onChange, onFocus, ...inputProps } = getInputProps({
            onChange: event => {
              if (event.target.value === "") {
                clearSelection();
              }
            },
            onFocus: openMenu,
          });

          return (
            <div className={classes.container}>
              {renderInput({
                fullWidth: true,
                classes,
                InputLabelProps: getLabelProps({ shrink: true }),
                InputProps: { onBlur, onChange, onFocus },
                inputProps,
                label
              })}

              <div {...getMenuProps()}>
                {isOpen ? (
                  <Paper className={classes.paper} square onClick={()=>isOpen=false}>
                    {getSuggestions(inputValue, { showEmpty: true }, suggestions.map(e=>({label:e}))).map(
                      (suggestion, index) =>
                        renderSuggestion({
                          suggestion,
                          index,
                          itemProps: getItemProps({ item: suggestion.label }),
                          highlightedIndex,
                          selectedItem,
                          selectedFaculty,
                          rest
                        })
                    )}
                  </Paper>
                ) : null}
              </div>
            </div>
          );
        }}
      </Downshift>
    </div>
  );
}

export default connect(state=>({selectedFaculty: state.changePicker.selectedFaculty}))(AutoComplete)
renderSuggestion.propTypes = {
  highlightedIndex: PropTypes.number,
  index: PropTypes.number,
  itemProps: PropTypes.object,
  selectedItem: PropTypes.string,
  suggestion: PropTypes.shape({ label: PropTypes.string }).isRequired
};