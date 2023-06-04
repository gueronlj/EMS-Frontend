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

    const filterCointainers = () => {
        const containers = allItems.filter(item => item.tags.includes("Container"));
        setVisibleItems(containers);
    }

    const filterOthers = () => {
        const misc = allItems.filter(item => item.tags.includes("Misc"));
        setVisibleItems(misc);
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
            <button onClick={filterCointainers}>Containers</button>
            <button onClick={filterOthers}>Other</button>
        </nav>      
    )
}

export default FilterButtons;