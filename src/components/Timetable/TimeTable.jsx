import React, {useMemo, memo} from 'react'
import DisplayTimetableHeader from '../TimetablePicker/DisplayTimetableHeader'
import { Paper, Table, TableRow, TableCell, withStyles, Divider, Button, makeStyles, TableHead, TableBody, Box } from '@material-ui/core'
import moment from 'moment'
import InsertData from './InsertData'
const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.secondary.light,
        color: '#fff',
        fontSize: 14,
    },
    body: {
        fontSize: 14,
        paddingRight:5,
        paddingLeft:5,
        textAlign: 'center',
        margin:0,
    },
}))(TableCell);

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(3) *3 ,
        overflow: 'auto'
    },
    table: {
        minWidth: 540,
    },
    row: {
        '&:nth-of-type(odd)': {
            backgroundColor: '#ddd',
            fontSize: 14,
            paddingRight:5,
            paddingLeft:5,
            margin:0

        },
    },
    generateTimetable:{
        padding:0,
        marginTop:-60,
        marginBottom: theme.spacing(2)
    },
    container: {
        flexWrap: 'wrap',
        // margin:'-150 5 5 0',
    },
    submitButton: {
        display:"flex",
        justifyContent:"flex-end",
        padding: " 10px 0 15px 0",
    },
}))

const TimeTable = memo(({header, week, onDataInsert, sessions, facultyData}) => {
    const sortedSession = useMemo(()=> sessions.sort((a,b)=> {
        let timeA = [a.slice(0,5), ' ', a.slice(5,7)].join('')
        let timeB = [b.slice(0,5), ' ', b.slice(5,7)].join('')
        return new Date(`07/16/1999 ${timeA}`) - new Date(`07/16/1999 ${timeB}`)
    }), [sessions])

    const classes = useStyles()
    let columns = ['Session']
    for(let i=0; i<7; i++){
        columns.push(moment.utc().week(week).weekday(i).format("ddd MM/DD"))
    }
    return (
        <>
        <DisplayTimetableHeader header={header} week={week}/>
        <Box className={classes.generateTimetable} boxShadow={3}>
            <div className={classes.container}>
                <Paper className={classes.root}>
                    <Table className={classes.table}>
                        <TableHead>
                                <TableRow className={classes.row}>
                                    {
                                        columns.map(cell=><CustomTableCell align='center'  key={cell} >{cell}</CustomTableCell>)
                                    }
                                </TableRow>
                        </TableHead>
                        <TableBody>
                            {sortedSession.map(row => (
                                <TableRow className={classes.row} key={row} >
                                    {
                                        columns.map((cell,i)=> cell === 'Session' ? <CustomTableCell  align='center' component="th" scope="row" key={i}>{row}</CustomTableCell>
                                        : <CustomTableCell text-align= "center" key={i}><InsertData onChange={onDataInsert} row={row} col={cell} header={header} facultyData={facultyData}/></CustomTableCell>)
                                    }
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            </div>

            <Divider style={{marginLeft:15,marginRight:15}}/>
            <div className={classes.submitButton} >
                <Button size="medium" variant="outlined" color="primary" disabled={true} style={{marginLeft:15,marginRight:15}} >Edit</Button>
                <Button size="medium" variant="outlined" color="primary"  >Discard</Button>
                <Button size="medium"  color="primary" style={{marginLeft:15,marginRight:15}}  variant="contained">Save</Button>
            </div>
        </Box>
        </>
    )
})
export default TimeTable