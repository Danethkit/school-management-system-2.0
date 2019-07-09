import Odoo from 'odoo-xmlrpc'


var odoo = new Odoo({
    url: 'http://192.168.7.240',
    port: '8008',
    db: 'kit',
    username: 'admin',
    password: 'adminkit'
});

export const  odooRequest = (model, operation='search_read',fields =[], domain =[])=>{
    return new Promise ((resolve, reject)=> {
        odoo.connect((err) => {
            if(err) return reject('request error')
            let params = []
            if(operation === 'create'){
                let inParams = []
                inParams.push({'name': 'check', 'code':'check'})
                params.push(inParams)
            }else {
                params = [[domain, fields]]
            }
            odoo.execute_kw(model, operation, params, (err, data)=>{
                if(err) return reject(`${operation} on ${model} error\n ${err}`)
                resolve(data)
            })
        })
    })
}

const formartDate = (date) => {
    const yyyy =date.getFullYear()
    const mm =date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() +1
    const dd = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    return `${yyyy}-${mm}-${dd}`
}

export const  odooPrintReport = (report_id, data)=>{
    return new Promise ((resolve, reject)=> {
        odoo.connect((err) => {
            if(err) return reject('request error')
            var inParams = [];
            inParams.push([
                ['attendance_date', '>=', formartDate(data.startDate)],
                ['attendance_date', '<=', formartDate(data.endDate)],
                ['batch_id.name', '=', data.batch],
                ['course_id.name', '=', data.course],
                ['semester_id.name', '=', data.semester],
                ['class_id.name', '=', data.group]
                ]);
            var params = [];
            params.push(inParams);
            odoo.execute_kw('op.attendance.sheet', 'search', params, function (err, value) {
                if (err) { return console.log(err) }
                if(value){
                    console.log('value:',value);
                    var params = [];
                    params.push(value);
                    params.push(data.studentIDs)
                    console.log({params})
                    // i want to pass data in here, but it accept only array of int,
                    odoo.render_report(report_id, {}, function (err2, value2) {
                        console.log('value2', value2)

                        if (err2) { return reject('report error') }
                        return resolve(value2)
                    });
                }
            });
        })
    })

}
