import React, { FC } from 'react'
import ReactDOM from 'react-dom';

interface Props {
  width?: string
  height?: string
  viewBox?: string
}

const UserIcon: FC<Props> = ({
  width="15.596",
  height="21.848",
  viewBox="0 0 15.596 21.848"
}) => {

  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg"
      id="my_page"
      width={width}
      height={height}
      viewBox={viewBox}
      >
      <path id="Path_727" data-name="Path 727" d="M211.822,180.906H199.534a1.568,1.568,0,0,1-1.654-1.46v-3.905c0-2.745,2.679-4.978,5.97-4.978h3.655c3.292,0,5.97,2.233,5.97,4.978v3.905A1.567,1.567,0,0,1,211.822,180.906Zm-7.972-9.123c-2.619,0-4.75,1.686-4.75,3.758v3.905c0,.1.173.24.433.24h12.289c.26,0,.433-.144.433-.24v-3.905c0-2.071-2.13-3.758-4.75-3.758Z" transform="translate(-197.88 -159.058)" fill="#665b51"/>
      <path id="Path_728" data-name="Path 728" d="M205.631,169.251a5,5,0,1,1,5-5A5.007,5.007,0,0,1,205.631,169.251Zm0-8.781a3.78,3.78,0,1,0,3.781,3.781A3.785,3.785,0,0,0,205.631,160.47Z" transform="translate(-197.833 -159.25)" fill="#665b51"/>
    </svg>    
  )
}

export default UserIcon
