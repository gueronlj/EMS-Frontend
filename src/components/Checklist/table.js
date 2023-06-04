import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios'
import { ColorRing } from 'react-loader-spinner';

const Checklist = () => {
    const [allItems, setAllItems] = useState([]);
    const [visibleItems, setVisibleItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const endpoint = process.env.REACT_APP_CHECKLIST_ENDPOINT

    const handleCheckboxCLick = () => {

    }

    const fetchItems = async () => {
        try {
            setLoading(true)
            let response = await axios.get(`${endpoint}/checklist`);            
            setVisibleItems(response.data)
            console.log(response.data)
            setLoading(false)
        } catch(error) {
            console.log(error);
        } 
    }

    useEffect(()=>{
        fetchItems()
    },[])

    return (
        <main>
            { loading? 
                <ColorRing/>
            :
                <Table 
                    striped 
                    bordered 
                    hover 
                    variant="dark" 
                    className="checklist">
                    <thead>
                        <tr>
                            <th>Loaded</th>
                            <th>Name</th>
                            <th>Qty</th>
                        </tr>
                    </thead>
                    <tbody>
                        {visibleItems.map((item)=>{
                            return(
                                <tr key={item._id}> 
                                    <td>
                                        <input
                                            type='checkbox'
                                            name='status'
                                            checked={item.status}
                                            onChange={(event)=>handleCheckboxCLick(item)}/>
                                    </td>
                                    <td>{item.name}</td>
                                    <td>{item.quantity}/{item.recommended}</td>
                                    <td>+</td>
                                    <td>-</td>                       
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            }           
        </main>
    )
}

export default Checklist;