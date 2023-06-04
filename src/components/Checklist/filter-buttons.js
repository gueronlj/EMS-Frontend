const FilterButtons = ({setVisibleItems, allItems}) => {

    const filterFrozen = () => {
        const frozenItems = allItems.filter( item => item.tags.includes("Frozen"));
        setVisibleItems(frozenItems);
    }

    const filterVegies = () => {
        const vegies = allItems.filter(item => item.tags.includes("Veggie"));
      
        setVisibleItems(vegies);
    }
    
    const filterProtein = () => {
        const proteins = allItems.filter(item => item.tags.includes("Protein"));
        setVisibleItems(proteins);
    }

    const showAll = () => {
        setVisibleItems(allItems);
    }

    return (
        <nav className="checklist-filters">
            <button onClick={showAll}>All</button>
            <button onClick={filterFrozen}>Frozen</button>
            <button onClick={filterVegies}>Vegies</button>
            <button onClick={filterProtein}>Protein</button>
        </nav>      
    )
}

export default FilterButtons;