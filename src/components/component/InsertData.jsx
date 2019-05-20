import React from 'react'
import {Popper, Grow, Paper, MenuItem,MenuList,InputBase} from '@material-ui/core'


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
        value: ""
    };
    handleToggle = () => {
        this.setState(state => ({ open: !state.open }));
    };

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
        const { open } = this.state;
        return (
            <div className="filter-list">

                <InputBase
                    buttonRef={node => {
                        this.anchorEl = node;
                    }}
                    aria-owns={open ? 'menu-list-grow' : undefined}
                    aria-haspopup="true"
                    onClick={this.handleToggle}
                    value={this.state.value}
                    onChange={this.filterList}
                />
                <Popper open={this.state.open} anchorEl={this.anchorEl} transition disablePortal>
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            id="menu-list-grow"
                            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                        >
                            <Cell items={this.state.items}/>
                        </Grow>
                    )}
                </Popper>
                {/* <input type="text" placeholder="Search" onChange={this.filterList}/> */}

            </div>
        )
    }
}


class Cell extends React.Component {
    // props={
    //   boo : flase,
    // }
    render() {
        return (
            <React.Fragment>

                <Paper>
                    <MenuList>
                        {
                            this.props.items.map((item, index) => {
                                return <MenuItem key={index} onClick={this.setState.value ={item}}>{item}</MenuItem>
                            })
                        }
                    </MenuList>
                </Paper>

            </React.Fragment>
        )
    }
}
export default InsertData