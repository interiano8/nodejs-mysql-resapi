import { pool } from '../db.js';

export const getEmployees = async (req, res)=>{
    
try {
    const [rows] = await pool.query('Select * from employee')
    res.json(rows);
} catch (error) {
    return res.status(500).json(
        {
            message:'something goes wrong'
        }
    )
}
//res.send('Obteniendo empleados');
}

export const getEmployee = async (req,res)=>{

try {
    const [rows]= await pool.query('Select * from employee where id= ?',[req.params.id])
    if (rows.length <=0)return res.status(404).json(
        {
            message:'Employee not found'
        }
    ) 
        res.json(rows[0])
} catch (error) {
    return res.status(500).json(
        {
            message:'something goes wrong'
        }
    )
}
    }

    



export const createEmployee = async (req, res)=>{
    const {name, salary}=req.body;
try {

    const [rows] = await pool.query('insert into employee (name, salary) values (?,?)',[name, salary]);
    res.send({
        id:rows.insertId,
        name,
        salary,
    });
} catch (error) {
    return res.status(500).json(
        {
            message:'something goes wrong'
        }
    )
}
}

export const deleteEmployee = async (req, res)=>{
    try {
        const [result] = await pool.query('delete from employee where id = ?',[req.params.id])

    if (result.affectedRows <= 0) return res.status(404).json(
        {
            message: 'Employee not found'
        }
    )
    res.sendStatus(204);
    } catch (error) {
        return res.status(500).json(
            {
                message:'something goes wrong'
            }
        )
    }
}

export const updateEmployee = async (req, res)=>{
    const {id} = req.params
    const {name, salary} = req.body
    try {
        const [result]= await pool.query('update employee set name = ifnull(?, name), salary = ifnull(?,salary) where id = ?',[name,salary,id])
    if (result.affectedRows === 0)return res.status(404).json(
        {
            message: 'Employee not found'
        }
    ) 

    const [rows] = await pool.query('select * from employee where id=?',[id])
        

    res.json(rows[0])
    } catch (error) {
        return res.status(500).json(
            {
                message:'something goes wrong'
            }
        )
    }
}
