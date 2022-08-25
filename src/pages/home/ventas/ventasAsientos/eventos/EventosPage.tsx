import Asientos, { IColums } from '@components/asientos'
import PlantillaPage from '@components/PlantillaPage/PlantillaPage'
import Select from '@components/shared/Select/Select'
import useToggle from '@hooks/useToggle'
import { useAsientosAbonado } from '@services/useAsientosAbonado'
import { useAsientosEventos } from '@services/useAsientosEventos'
import useButacas from '@services/useButacas'
import { usePreciosRefs } from '@services/usePreciosRefs'
import { genNombreFilas } from '@utils/genNombreFilas'
import React, { useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'

const Abono = () => {
	const [innerValue, setInnerValue] = useState<string>('T1')
	const [seleccionados, setSeleccionados] = useState<IColums[]>([])
	const { tendidos } = usePreciosRefs()
	const { state: eventos } = useLocation() as any
	const evento = eventos.evento
	const { onOpen, onClose, isOpen } = useToggle()
	const { asientos, refetch: refetchAsientos } = useAsientosEventos({
		eventoId: evento?.eventoId,
		tendido: innerValue
	})
	// const { createBloqueoAsiento } = useBloqueoAsientoEvento()

	const categorias = tendidos.map((tendido) => ({
		value: tendido?.tendido!,
		label: tendido?.tendido!
		// desc: tendido?.tendido!
	}))
	const { db: butacas, loading, refetch } = useButacas({ tendido: innerValue })

	const dataAsientos = useMemo(() => {
		if (butacas?.length && !loading) {
			return butacas.map((item, i) => ({
				tendido: item?.tendido || '',
				butacaId: item?.butacaId || '',
				codigo: item?.codigo || '',
				cantidad: item?.cantidad || 0,
				precio: item?.precio || 0
			}))
		}
	}, [butacas, loading])

	useEffect(() => {
		refetch()
		refetchAsientos()
		setSeleccionados([])
	}, [innerValue])

	const handleVenta = () => {
		// createBloqueoAsiento({ input: seleccionados }).then((res) => {
		// 	if (res?.ok) {
		// 		toast.success('Asientos Vendidos Correctamente', {
		// 			theme: 'colored',
		// 			position: 'top-right',
		// 			autoClose: 5000,
		// 			hideProgressBar: false,
		// 			closeOnClick: true,
		// 			pauseOnHover: true,
		// 			draggable: true,
		// 			progress: undefined
		// 		})
		// 		refetchAsientos()
		// 		setSeleccionados([])
		// 	} else {
		// 		toast.error(res?.error, {
		// 			theme: 'colored',
		// 			position: 'top-right',
		// 			autoClose: 5000,
		// 			hideProgressBar: false,
		// 			closeOnClick: true,
		// 			pauseOnHover: true,
		// 			draggable: true,
		// 			progress: undefined
		// 		})
		// 	}
		// })
	}

	return (
		<PlantillaPage title='Abono' desc='Desde aqui podras vender los abonos'>
			<div>
				<div className='pt-5'>
					<h2 className='text-xl text-center text-primary-500 dark:text-second-500'>
						SELECCIONA TUS ASIENTOS
					</h2>
					<div className='flex flex-col justify-center py-5 mt-5 border-y-2 border-primary-500 dark:border-second-500'>
						<Select
							label='Tendido'
							value={innerValue}
							options={categorias}
							onChange={({ value }) => {
								console.log(value)
								setInnerValue(value)
							}}
							dataExtractor={{
								label: 'label',
								value: 'value'
							}}
						/>

						{dataAsientos?.length && innerValue?.length > 0 && (
							<Asientos
								{...{
									data: dataAsientos!,
									desabilitados: asientos,
									seleccionados,
									setSeleccionados,
									nombreFilas: genNombreFilas(innerValue)
								}}
								tipo='abono'
								doble={innerValue === 'T2S' ? 'Tendido2' : innerValue === 'T3' ? 'Tendido3' : 'Ruedo'}
								direccion={innerValue === 'T3A' ? 'end' : innerValue === 'T3B' ? 'start' : 'center'}
								id={innerValue}
							/>
						)}
					</div>
					<div className='flex gap-5 p-5 text-sm lg:text-lg'>
						<div className='flex items-center gap-2'>
							<span className='w-2.5 h-2.5 bg-primary-900 rounded-full'></span>
							<p className='text-tertiary dark:text-yellow-500'>Seleccionados</p>
						</div>
						<div className='flex items-center gap-2'>
							<span className='w-2.5 h-2.5 bg-second-500 rounded-full'></span>
							<p className='text-tertiary dark:text-yellow-500'>Libres</p>
						</div>
						<div className='flex items-center gap-2'>
							<span className='w-2.5 h-2.5 bg-gray-500 rounded-full'></span>
							<p className='text-tertiary dark:text-yellow-500'>No disponibles</p>
						</div>
					</div>
				</div>
				<div className='flex justify-center w-full bg-second-500'>
					<div className='py-10 px-5 max-w-[1200px] flex flex-col lg:flex-row justify-between w-full'>
						<div className='flex flex-col items-center gap-5 lg:flex-row'>
							<p className='font-bold text-primary'>Seleccionados:</p>
							<div className='flex flex-wrap gap-2 leading-none lg:grid lg:grid-cols-10'>
								{seleccionados.map((item) => (
									<p key={item.reservado} className='text-xs font-bold text-primary'>
										{item.reservado}
									</p>
								))}
							</div>
						</div>
						<div className='flex items-end'>
							<button
								disabled={seleccionados.length === 0}
								className='px-5 py-2 mt-10 text-white rounded-lg bg-primary-600 lg:mt-0'
								onClick={onOpen}>
								Vender
							</button>
						</div>
					</div>
				</div>
			</div>
			{/* <ModalConfirmar
				isOpen={isOpen}
				onClick={handleVenta}
				onClose={onClose}
				header='Bloaquer'
				body='¿Estas seguro que deseas Bloaquer esta asiento?'
			/> */}
		</PlantillaPage>
	)
}

export default Abono
