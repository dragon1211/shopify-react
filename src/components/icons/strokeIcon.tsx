import React, { FC } from 'react'
import ReactDOM from 'react-dom';

interface Props {
  width?: string
  height?: string
  viewBox?: string
}

const StrokeIcon: FC<Props> = ({
  width="1",
  height="28",
  viewBox="0 0 1 28"
}) => {

  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg"
      id="my_page"
      width={width}
      height={height}
      viewBox={viewBox}
      >
      <line id="Line_3" data-name="Line 3" y2="28" transform="translate(0.5)" fill="none" stroke="#665b51" strokeMiterlimit="10" strokeWidth="1"/>
    </svg>    
  )
}

export default StrokeIcon