const Filter = ({ adding, filter, handleFilter }) => {
    return (
        <form onSubmit={(adding)}>
            <div>
                filter shown with: <input value={filter} onChange={handleFilter} />
            </div>
        </form>
    )
}

export default Filter