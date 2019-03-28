import {
    REQUEST_STUDENTS_PENDING,
    REQUEST_STUDENTS_SUCCESS,
    REQUEST_STUDENTS_FAILED,
    CHANGE_BATCH
} from './constants/env'
import Odoo from 'odoo-xmlrpc'

var odoo = new Odoo({
    url: 'http://localhost',
    port: '8069',
    db: 'odoo-school',
    username: 'admin',
    password: 'adminkit'
});

export const requestStudent= () => (dispatch) => {
    dispatch({type: REQUEST_STUDENTS_PENDING})
    odoo.connect((err) => {
        if(err) return dispatch({type: REQUEST_STUDENTS_FAILED, data:err})
        let params = [[[], ['name', 'last_name', 'roll_number', 'batch_id']]]
        odoo.execute_kw('op.student', 'search_read', params, (err, data)=>{
            if(err) return dispatch({type: REQUEST_STUDENTS_FAILED, data:err})
            console.log('data:', data)
            
            let res = {}
            data.forEach(element => {
                let batch = element.batch_id[1]
                if (batch in res) {
                    res[batch].push(element)
                }else {
                    res[batch] = []
                }
            });
            dispatch({type: REQUEST_STUDENTS_SUCCESS, payload:res})
        })        
    })
}

export const onBatchChange = (batch) => ({type:CHANGE_BATCH, payload:batch})

// .catch(error => dispatch({type: REQUEST_STUDENTS_FAILED, data:error}))
// fetch('http://localhost:8069/sms')
// .then(res =>res.json())
// .then(data => dispatch({type: REQUEST_STUDENTS_SUCCESS, payload:data}))
// .catch(error => dispatch({type: REQUEST_STUDENTS_FAILED, data:error}))