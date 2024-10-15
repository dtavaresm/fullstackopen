const PersonForm  = ({ adding, personName, handleName, personNumber, handleNumber}) => {
    return (
        <form onSubmit={adding}>
            <div>
                name: <input value={personName} onChange={handleName} />
            </div>
            <div>
                number: <input value={personNumber} onChange={handleNumber} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm