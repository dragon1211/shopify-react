import React, { FC } from 'react'
import ReactDOM from 'react-dom';

interface Props {
  width?: string
  height?: string
  viewBox?: string
}

const GoTopIcon: FC<Props> = ({
  width="68",
  height="68",
  viewBox="0 0 68 68"
}) => {

  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg"
      id="cart"
      width={width}
      height={height}
      viewBox={viewBox}
      >
      <g id="TOPへ戻るボタン" transform="translate(-262.573 -10398.342)">
        <circle id="Ellipse_47" data-name="Ellipse 47" cx="33" cy="33" r="33" transform="translate(263.573 10399.342)" fill="none" stroke="#eb6860" strokeMiterlimit="10" strokeWidth="2"/>
        <g id="Group_1538" data-name="Group 1538">
          <g id="Group_1537" data-name="Group 1537">
            <g id="Group_1536" data-name="Group 1536">
              <path id="Path_3150" data-name="Path 3150" d="M290.456,10419.672l5.3-8.8a.939.939,0,0,1,1.609,0l5.322,8.8a.939.939,0,0,1-.8,1.425H291.261A.94.94,0,0,1,290.456,10419.672Z" fill="#eb6860"/>
            </g>
          </g>
        </g>
        <text id="TOP" transform="translate(276.998 10444.454)" fill="#eb6860" fontSize="20" fontFamily="Helvetica" letterSpacing="0.04em"><tspan x="0" y="0">TOP</tspan></text>
      </g>
    </svg>      
  )
}

export default GoTopIcon

