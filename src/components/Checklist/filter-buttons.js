
const FilterButtons = ({setVisibleItems, allItems}) => {

    const showAll = () => {
        setVisibleItems(allItems);
    }

    const filterBy = ( string ) => {
        const array = allItems.filter(item => item.tags.includes(string));
        setVisibleItems(array);
    }

    return (
        <nav className="checklist-filters">
            <button onClick={showAll}>Show All</button>
            <button onClick={()=>{filterBy('Cold')}}>Cold Storage</button>
            <button onClick={()=>{filterBy('Frozen')}}>Frozen Storage</button>
            <button onClick={()=>{filterBy('Veggie')}}>Vegies</button>
            <button onClick={()=>{filterBy('Protein')}}>Protein</button>
            <button onClick={()=>{filterBy('Container')}}>Containers</button>
            <button onClick={()=>{filterBy('Equipment')}}>Equipment</button>
            <button onClick={()=>{filterBy('Appetizer')}}>Appetizers</button>
            <button onClick={()=>{filterBy('Fried')}}>Fried Foods</button>
            <button onClick={()=>{filterBy('Misc')}}>Other</button>
        </nav>      
    )
}

export default FilterButtons;