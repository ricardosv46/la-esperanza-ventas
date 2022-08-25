import React from 'react'

interface Iprops {
  children: any
  condition: boolean
  isDefault?: JSX.Element
}

export const Show = ({ children, condition, isDefault }: Iprops) =>
  !condition ? children : isDefault || null
