const ButtonShow = ({ handleClick, text }) => {
    return (
        <>
            <button onClick={handleClick}>
                {text}
            </button>
        </>
    )
}

export default ButtonShow