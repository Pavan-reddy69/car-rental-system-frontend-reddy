import React from 'react'
import { Table } from 'reactstrap'
import { useNavigate } from 'react-router-dom';
import '../TableComp/table_component.css'

const TableComp = ({columns,data,url,style,isClickable}) => {
    console.log(data)
    const navigate=useNavigate();
    return (
    
    <Table className='table__comp' responsive size='sm' style={style}>
        <thead className='table-primary' >
            <tr >
            {columns.map((column) => (
                <th className='table_head' key={column}>{column.header}</th>))}
            </tr>
        </thead>
        <tbody>
            {data.map((item)=>{
                return (
                    <tr key={item.id} style={{cursor:isClickable?'pointer':'default'}} onClick={()=>{isClickable? navigate(url+item.id):console.log()}}>
                        {columns.map((column)=>(
                            <td>{item[column.key]}</td>
                        ))}
                    </tr>
                )
            })}
        </tbody>
    </Table>

    )
}


export default TableComp