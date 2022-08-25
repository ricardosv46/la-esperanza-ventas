import React, { ReactElement } from 'react'

interface Props {
  children: ReactElement | ReactElement[]
  title: string
  button?: ReactElement
  desc: string
}

const PlantillaPage = ({ children, title, button, desc }: Props) => {
  return (
    <div className="p-10">
      <div className="flex flex-col">
        <h1 className="mb-3 text-3xl font-bold dark:text-slate-200 ">
          {title}
        </h1>
        <p className="mb-3 text-sm md:text-md text-slate-400">{desc}</p>
        <div className="w-full mb-3 ml-auto sm:w-max">{button}</div>
      </div>
      <div>{children}</div>
    </div>
  )
}
export default PlantillaPage
