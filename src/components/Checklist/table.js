import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios'
import { ColorRing } from 'react-loader-spinner';
import FilterButtons from './filter-buttons';

const Checklist = () => {
    const [allItems, setAllItems] = useState([]);
    const [visibleItems, setVisibleItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const endpoint = process.env.REACT_APP_CHECKLIST_ENDPOINT

    const fetchItems = async () => {
        try {
            setLoading(true)
            let response = await axios.get(`${endpoint}/checklist`);            
            setAllItems(response.data);
            console.log(response.data);
            setLoading(false)
        } catch(error) {
            console.log(error);
        } 
    }

    /*updatedStatus is needed because the visibleItems array is
     a copy of a filtered allItems array, to show updated 
     status values we must update the copy too
    */
    const updatedStatus = (index, boolean) => {
        visibleItems[index].status = boolean
      } 
      
    const handleCheckboxCLick = ( item ) => {
        //Find the index we need to update
        const isMatching = (ele) => ele.name === item.name;
        const matchingIndex = visibleItems.findIndex(isMatching);
        if ( item.status === true ){
            console.log('turning off')
            axios.put(`${endpoint}/checklist/disable/${item._id}`)
                .then(() => {
                    fetchItems();
                    updatedStatus(matchingIndex, false)
                })
        } else {
            console.log('turning on')
            axios.put(`${endpoint}/checklist/enable/${item._id}`)
                .then(() => {
                  fetchItems();
                  updatedStatus(matchingIndex, true)
                })

        }
    }

    const uncheckAll = async () => {
        axios.put(`${endpoint}/checklist/uncheck-all`)
            .then(()=>{
                fetchItems();
                //TODO: Update visualItems array
            })
            .catch()
            .finally(() => {
                setVisibleItems(Array.from(allItems))
            })
    }

    useEffect(()=>{
        fetchItems()
    },[])

    return (
        <main>
            <FilterButtons
                setVisibleItems={setVisibleItems}
                allItems={allItems}/>
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
                            <th><button onClick={uncheckAll}>Uncheck All</button></th>
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
                                            checked={item?.status}
                                            onChange={()=>handleCheckboxCLick(item)}/>
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