import React, {useState, useEffect} from 'react'
import {Paper,
    Table,
    TableBody,
    TableHead,
    TableRow,
} from "@material-ui/core";
import CustomTableCell from '../Table/CustomTableCell'
import tableStyle from '../Table/TableStyle'
import moment from 'moment'
import AutoComplete from '../Picker/AutoComplete'



export default ({currentWeek, editTT, editMode, ...rest})=> {

    const {subjectInfo, course, batch, semester, group} = rest

    const header = ['Session']
    if(currentWeek.startDate){
        for (let i = 1; i <= 7; i++) {
            header.push(
              moment(currentWeek.startDate, 'YYYY-MM-DD')
                .add(i, 'days')
                .utc()
                .format("ddd MM/DD"))
        }
    }

    const handleChangeData = (value) => {
        console.log('check', value);
    }

    let faculties = [];
    try {
        console.log({subjectInfo, course, batch, semester,group});
    for (let e of subjectInfo[course][batch][semester][group]['subjects']) {
        if (e.faculty) {
        faculties.push(`${e.subject} ~ ${e.faculty}`);
        }
    }
    } catch {}

    console.log({faculties});

    const classes = tableStyle()
    return (
        <div className={classes.container}>
                <Paper className={classes.root}>
                    <Table className={classes.table}>
                        <TableHead>
                                <TableRow className={classes.row}>
                                    {
                                        header.map(item => (
                                            <CustomTableCell align='center' multiline={"true"} key={item}>
                                                {item}
                                            </CustomTableCell>
                                        ))
                                    }
                                </TableRow>
                        </TableHead>
                        <TableBody>
                            {Object.keys(editTT).map(session => {
                                if(session === 'header') return null
                                let temp = []
                                for(let i =0; i < 7; i++){
                                    temp.push(<CustomTableCell text-align="center" key={i}>
                                    {
                                        i+1 in editTT[session] ? editMode ?
                                        <AutoComplete value={editTT[session][i+1]} onChange={handleChangeData} suggestions={faculties}/>:
                                        editTT[session][i+1]
                                        : null
                                    }
                                    </CustomTableCell>)
                                }
                                return <TableRow className={classes.row} key={session}>
                                        <CustomTableCell align="center">
                                            {session}
                                        </CustomTableCell>
                                        {temp}
                                </TableRow>
                                })
                            }
                        </TableBody>
                    </Table>
                </Paper>
        </div>
    )
}