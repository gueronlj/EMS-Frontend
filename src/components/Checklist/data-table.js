const DataTable = ( {list, handleIncrease, handleDecrease, handleCheckboxCLick}) =>  {
    console.log(list);
    list.map((item) => {
        return (
            <tbody>
                <tr key={item._id}> 
                    <td>
                        <input type='checkbox' name='status' checked={item?.status} onChange={()=>handleCheckboxCLick(item)}/>
                    </td>
                    <td style={item.status===true?{color:'#89DF87'}:{}}>{item.name}</td>
                    <td style={item.quantity>=item.recommended?{color:'#89DF87'}:{}}>{item.quantity}/{item.recommended}</td>
                    <td onClick={() => handleIncrease(item)}>+</td>
                    <td onClick={() => handleDecrease(item)}>-</td>                       
                </tr>
            </tbody>
        )
    })
}

export default DataTable;