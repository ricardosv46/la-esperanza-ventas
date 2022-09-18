import { IconPdf, IconUser } from '@icons'
import { useGetReporteAsientoVendedora } from '@services/useGetReporteAsientoVendedora'
import React from 'react'
import { useEffect } from 'react'
interface Props {
  code: string
  onClick: () => void
}

const Detalle = ({ code, onClick }: Props) => {
  const { getReporteVendedora, loading: loadingReporte } = useGetReporteAsientoVendedora()

  useEffect(() => {}, [])

  return (
    <div className="flex justify-center gap-3">
      <button className="text-center btn-icon btn-ghost-primary" onClick={onClick}>
        <IconUser />
      </button>
      <button
        disabled={loadingReporte}
        className="text-center btn-icon btn-ghost-primary"
        onClick={() => {
          console.log({ code })
          getReporteVendedora({ code }).then((res) => {
            if (res.ok) {
              console.log({ code })
              console.log(res.linkReporte)
              window.open(res.linkReporte)
            }
          })
        }}>
        <IconPdf />
      </button>
    </div>
  )
}

export default Detalle
