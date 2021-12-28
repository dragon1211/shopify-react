import React, { FC } from 'react'
import ReactDOM from 'react-dom';

interface Props {
  width?: string
  height?: string
  viewBox?: string
}

const CloseIcon: FC<Props> = ({
  width="10.404",
  height="10.404",
  viewBox="0 0 10.404 10.404"
}) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg"
      id="cart"
      width={width}
      height={height}
      viewBox={viewBox}
      >
      <g id="Group_169" data-name="Group 169" transform="translate(-1250.766 -205.966)">
        <rect id="Rectangle_152" data-name="Rectangle 152" width="13.187" height="1.526" rx="0.488" transform="matrix(0.707, -0.707, 0.707, 0.707, 1250.766, 215.291)" fill="#e96860"/>
        <rect id="Rectangle_153" data-name="Rectangle 153" width="1.526" height="13.187" rx="0.488" transform="translate(1250.767 207.046) rotate(-45)" fill="#e96860"/>
      </g>
    </svg>

  )
}

export default CloseIcon

const CloseIconBig: FC<Props> = ({
  width="23.927",
  height="23.927",
  viewBox="0 0 23.927 23.927"
}) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg"
      id="cart"
      width={width}
      height={height}
      viewBox={viewBox}
      >
      <path id="Path_1904" data-name="Path 1904" d="M116.978,727.427a.556.556,0,0,1-.393-.949L139.4,703.663a.556.556,0,1,1,.786.786l-22.815,22.815A.557.557,0,0,1,116.978,727.427Z" transform="translate(-116.422 -703.5)" fill="#e76860"/>
      <path id="Path_1903" data-name="Path 1903" d="M139.793,727.427a.555.555,0,0,1-.393-.163l-22.815-22.815a.556.556,0,0,1,.787-.786l22.815,22.815a.556.556,0,0,1-.393.949Z" transform="translate(-116.422 -703.5)" fill="#e76860"/>
    </svg>


  )
}

export {
  CloseIconBig
}

