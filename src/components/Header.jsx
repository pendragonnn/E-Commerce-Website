import React, { useContext } from 'react'
import { SidebarContext } from '../contexts/SidebarContext'
import { BsBag } from 'react-icons/bs'

export default function Header() {
  const {setIsOpen, isOpen} = useContext(SidebarContext)

  return (
    <div>
      <div>Header</div>
      <div onClick={() => setIsOpen(!isOpen)} className='cursor-pointer flex relative'>
        <BsBag className='text-2xl'/>
      </div>
    </div>
  )
}
