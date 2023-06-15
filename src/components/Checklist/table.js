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
                visibleItems.forEach(item => {
                    item.status = false;
                    item.quantity = 0;
                })
            })
    }

    const handleIncrease = ( item ) => {
        axios.put(`${endpoint}/checklist/increase/${item._id}`)
            .then(() => fetchItems())
            .then(()=>{
                const index = visibleItems.findIndex((ele) => ele.name === item.name);
                visibleItems[index].quantity ++
                visibleItems[index].status = true;
            })
    }

    const handleDecrease = ( item ) => {
        if (item.quantity > 0){
            axios.put(`${endpoint}/checklist/decrease/${item._id}`)
            .then(() => fetchItems())
            .then(()=>{
                const index = visibleItems.findIndex((ele) => ele.name === item.name);
                visibleItems[index].quantity --
                if (visibleItems[index].quantity <= 0){
                    visibleItems[index].status = false;
                }
            })
        }
    }

    useEffect(()=>{
        fetchItems();
        filterItems(filters);
    },[filters])

    return (
        <>
            <FilterButtons
                setVisibleItems={setVisibleItems}
                allItems={allItems}
                setFilters={setFilters}/>

            <Table
                striped
                bordered
                hover
                variant="dark"
                className="checklist">
                <thead>
                    <tr>
                        <th className="check-td"><button onClick={uncheckAll}>Clear</button></th>
                        <th>Name</th>
                        <th width="7%">Qty</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                { loading ?
                   <div className="loading-spinner">
                    <ColorRing
                      visible={true}
                      height="140"
                      width="140"
                      ariaLabel="blocks-loading"
                      wrapperStyle={{}}
                      wrapperClass="blocks-wrapper"
                      colors={['#192231', '#98878F', '#494E6B', '#56f4de', '#849b87']}
                    />
                 </div>
                :
                <tbody>
                    { visibleItems.length > 0 ?
                        visibleItems?.map((item)=>{
                            return(
                                <tr key={item._id}>
                                    <td className='check-td'>
                                        <input
                                            className='check'
                                            type='checkbox'
                                            name='status'
                                            checked={item?.status}
                                            onChange={()=>handleCheckboxCLick(item)}/>
                                    </td>
                                    <td style={item.status===true?{color:'#89DF87'}:{}}>{item.name}</td>
                                    <td style={item.quantity>=item.recommended?{color:'#89DF87'}:{}}>{item.quantity}/{item.recommended}</td>
                                    <td><img src="images/plus-white.png" onClick={() => handleIncrease(item)} alt="Plus Icon"/></td>
                                    <td><img src="images/minus-white.png" onClick={() => handleDecrease(item)} alt="Decrease Button"/></td>
                                </tr>
                            )
                        })
                    :
                        <>
                        {allItems &&
                            allItems.map((item) => {
                                return(
                                    <tr key={item._id}>
                                        <td className='check-td'>
                                            <input
                                                className='check'
                                                type='checkbox'
                                                name='status'
                                                checked={item.status}
                                                onChange={()=>handleCheckboxCLick(item)}/>
                                        </td>
                                        <td style={item.status===true || item.quantity > 0?{color:'#89DF87'}:{}}>{item.name}</td>
                                        <td style={item.quantity>=item.recommended?{color:'#89DF87'}:{}}>{item.quantity}/{item.recommended}</td>
                                        <td><img src="images/plus-white.png" onClick={() => handleIncrease(item)} alt="Plus Icon"/></td>
                                        <td><img src="images/minus-white.png" onClick={() => handleDecrease(item)} alt="Decrease Button"/></td>
                                    </tr>
                                )
                        })}
                        </>
                    }
                </tbody>
                }

            </Table>
        </>
    )
}

export default Checklist;
