import React from 'react'
import {Popper, Grow, Paper,Menu,ClickAwayListener, MenuItem,MenuList,InputBase} from '@material-ui/core'


var con = [

    { name: 'Leo Mr', url: 'C program'},
    { name: 'Dinesh Mr', url: 'Basic Maths'},
    { name: 'Veknish Mr', url: 'Java'},
    { name: 'Shiraz Mr', url: 'Computer Network'},
    { name: 'Havy Ms', url: 'Vocabulary'},
    { name: 'Balal Mr', url: 'Data Structure'},
    { name: 'Sheryl Ms', url: 'LeaderShip '},
    { name: 'Minami Ms', url: 'Japanese'},


];



class InsertData extends React.Component{
    state = {
        open: false,

        // value1: ""
    };
    handleToggle = () => {
        this.setState(state => ({ open: !state.open }));
    };
    changeValue=(e)=>
    {
        this.setState({value1: e.target.value})

    }
    handleClose = event => {
        if (this.anchorEl.contains(event.target)) {
            return;
        }

        this.setState({ open: false });
    };


    constructor(props) {
        super(props);

        this.filterList = this.filterList.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.data = [];
        this.state = {
            // data : [],
            value1: "",
            initialItems:this. data,
            items: [],

            // open:false,
        }
    }
    filterList(event) {
        var updatedList = this.state.initialItems;
        updatedList = updatedList.filter(function(item) {
            return item.toLowerCase().search(event.target.value.toLowerCase()) !== -1;
        });
        this.setState({items: updatedList});
    }
    handleClick(event) {
        console.log(this.state.initialItems.name);
    }
    componentWillMount() {
        this.setState({items: this.state.initialItems});
        {

            con.map((con,index) =>
            {
                return(this.data.push((con.url+ " by " +con.name)))
            })

        }
    }

    render()
    {
        const { classes } = this.props;
        const { open, value1 } = this.state;
        console.log(('value ======', value1))
        return (
            <div className="filter-list">

                <InputBase

                    inputRef={node => {
                        this.anchorEl = node;
                    }}
                    text-align-last= "center"
                    aria-owns={open ? 'menu-list-grow' : undefined}
                    aria-haspopup="true"
                    onClick={this.handleToggle}
                    value={value1}
                    onChange={this.filterList }
                />
                <Popper open={this.state.open} onClose={this.handleClose} anchorEl={this.anchorEl} transition disablePortal>
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            id="menu-list-grow"
                            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                        >
                            <Paper >
                                <ClickAwayListener onClickAway={this.handleClose}>
                                <MenuList>
                                    {
                                        this.state.items.map((item, index) => {
                                            return <MenuItem
                                                        key={index}
                                                        value={{item}}
                                                        onChange={ this.handleClose}
                                                        onClick={()=>{
                                                            console.log('=========', item)
                                                            this.setState({value1:item});


                                                            this.setState({ open: false });
                                                        }} >
                                                        {item}
                                                    </MenuItem>
                                        })
                                    }
                                </MenuList>
                                </ClickAwayListener>
                            </Paper>

                        </Grow>
                    )}
                </Popper>

            </div>
        )
    }
}



export default InsertData