import React, {CSSProperties} from 'react'
type Props = {
  style?: CSSProperties,
  onClick: () => void
}
const AddButton = ({style = {}, onClick}: Props) => {
  return (
    <button
      className={'meal-planner-add-button'}
      style={{...buttonStyle, ...style}}
      onClick={onClick}
    >+</button>
  )
}

const buttonStyle: CSSProperties = {
  color: 'white',
  fontSize: 38,
  borderRadius: '50%',
  border: 'none',
  width: 32,
  height: 32,
  fontWeight: 'bold',
  lineHeight: '32px',
  padding: '0px 30px 36px 6px',
  verticalAlign: 'middle',
}

export default AddButton
