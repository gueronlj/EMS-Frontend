import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios'
import { ColorRing } from 'react-loader-spinner';
import FilterButtons from './filter-buttons';

const Checklist = () => {
    const [allItems, setAllItems] = useState([]);
    const [visibleItems, setVisibleItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState('')
    const endpoint = process.env.REACT_APP_CHECKLIST_ENDPOINT

    const fetchItems = async () => {
        try {
            setLoading(true)
            let response = await axios.get(`${endpoint}/checklist`);            
            setAllItems(response.data);
            setLoading(false)
        } catch(error) {
            console.log(error);
        } 
    }

    const filterItems = ( filter ) => {     
        if (filter !== ''){
            let array = allItems.filter(item => item.tags.includes(filter))
            //add all items with that tag to visibleItems array
            setVisibleItems(array)
        } else {
            setVisibleItems(allItems)
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
            axios.put(`${endpoint}/checklist/disable/${item._id}`)
                .then(() => {
                    fetchItems();
                    updatedStatus(matchingIndex, false)
                })
        } else {
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
                visibleItems.forEach(item => item.status = false)
            })
    }

    const handleIncrease = ( item ) => {
        axios.put(`${endpoint}/checklist/increase/${item._id}`)
            .then(() => fetchItems())
            .then(()=>{
                const index = visibleItems.findIndex((ele) => ele.name === item.name);
                visibleItems[index].quantity ++
            })
    }

    const handleDecrease = ( item ) => {
        axios.put(`${endpoint}/checklist/decrease/${item._id}`)
            .then(() => fetchItems())
            .then(()=>{
                const index = visibleItems.findIndex((ele) => ele.name === item.name);
                visibleItems[index].quantity --
            })
    }

    useEffect(()=>{
        fetchItems();
        filterItems(filters);         
    },[filters])

    return (
        <main>
            <FilterButtons
                setVisibleItems={setVisibleItems}
                allItems={allItems}
                setFilters={setFilters}/>
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
                        {visibleItems.length > 0 ? 
                            visibleItems.map((item)=>{
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
                                        <td onClick={() => handleIncrease(item)}>+</td>
                                        <td onClick={() => handleDecrease(item)}>-</td>                       
                                    </tr>
                                )
                            })
                            :
                            allItems.map((item) => {
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
                                    <td onClick={() => handleIncrease(item)}>+</td>
                                    <td onClick={() => handleDecrease(item)}>-</td>                       
                                </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            }           
        </main>
    )
}

export default Checklist;