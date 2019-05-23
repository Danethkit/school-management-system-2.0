import Odoo from 'odoo-xmlrpc'

var odoo = new Odoo({
    url: 'http://localhost',
    port: '8069',
    db: 'backup',
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
