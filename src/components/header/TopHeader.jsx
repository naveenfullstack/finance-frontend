import React from 'react'
import Logo from "../../assets/logo.svg"

export default function TopHeader() {
  return (
    <div className='border-b p-3'>
        <img src={Logo} alt='logo'/>
    </div>
  )
}
