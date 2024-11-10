import ButtonShow from "./ButtonShow"

const ItemList = ({ item, showButton, handleClick}) => {
  if (showButton == true) {
    return (
      <li>
        {item} <ButtonShow handleClick={() => handleClick(item)} text='Show' />
      </li>
    )
  }
  else {
    return (
      <li>
        {item}
      </li>
    )
  }
}

export default ItemList