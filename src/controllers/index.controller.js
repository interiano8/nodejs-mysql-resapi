import {pool} from '../db.js';

export const ping =async (req, res)=>{
    const result = await pool.query('Select * from employee')
    res.json(result)
}