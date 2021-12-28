import React, { FC } from 'react'
import ReactDOM from 'react-dom';

interface Props {
  width?: string
  height?: string
  viewBox?: string
}

const HeartIcon: FC<Props> = ({
  width="13.381",
  height="14",
  viewBox="0 0 13.381 14"
}) => {

  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg"
      id="cart"
      width={width}
      height={height}
      viewBox={viewBox}
      >
        <path id="Path_3572" data-name="Path 3572" d="M10.691,17.4c1.137-1.221,2.225-2.492,3.061-3.529a33.5,33.5,0,0,0,2.308-3.195,6.553,6.553,0,0,0,1.321-3.9A3.231,3.231,0,0,0,14.153,3.4a3.383,3.383,0,0,0-3.161,2.007c-.1.251-.134.368-.3.368s-.2-.117-.3-.368A3.383,3.383,0,0,0,7.228,3.4,3.231,3.231,0,0,0,4,6.779a6.553,6.553,0,0,0,1.321,3.9,31.593,31.593,0,0,0,2.325,3.195C8.466,14.908,9.553,16.179,10.691,17.4Z" transform="translate(-4 -3.4)" fill="#e46760"/>
    </svg>      
  )
}

export default HeartIcon

