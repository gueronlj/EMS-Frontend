
const FilterButtons = ({allItems, setFilters}) => {

    const showAll = () => {
        setFilters('')
    }

    const filterBy = ( string ) => {
        setFilters( string )
    }

    return (
        <nav className="checklist-filters">
            <button onClick={()=>{filterBy('Cold')}}>Cold</button>
            <button onClick={()=>{filterBy('Frozen')}}>Frozen</button>
            <button onClick={()=>{filterBy('Veggie')}}>Veggies</button>
            <button onClick={()=>{filterBy('Protein')}}>Protein</button>
            <button onClick={()=>{filterBy('Container')}}>Containers</button>
            <button onClick={()=>{filterBy('Equipment')}}>Equipment</button>
            <button onClick={()=>{filterBy('Appetizer')}}>Appetizers</button>
            <button onClick={()=>{filterBy('Fried')}}>Fried Foods</button>
            <button onClick={()=>{filterBy('Misc')}}>Other</button>
            <button onClick={showAll}>Show All</button>
        </nav>      
    )
}

export default FilterButtons;