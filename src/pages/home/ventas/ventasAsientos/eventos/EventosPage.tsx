import { Box, Container, Flex, Heading, Text, useToast } from '@chakra-ui/react'
import React, { useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Asientos, { IColums } from '../../../../components/asientos'
import ModalConfirmar from '../../../../components/modal/ModalConfirmar'
import Select from '../../../../components/shared/Select'
import useToggle from '../../../../hooks/useToggle'
import { useAsientosEventos } from '../../../../services/useAsientosEventos'
import { useBloqueoAsientoAbono } from '../../../../services/useBloqueoAsientoAbono'
import { useBloqueoAsientoEvento } from '../../../../services/useBloqueoAsientoEvento'
import useButacas from '../../../../services/useButacas'
import { usePreciosRefs } from '../../../../services/usePreciosRefs'
import { genNombreFilas } from '../../../../utils/genNombreFilas'

const EventoId = () => {
	const [innerValue, setInnerValue] = useState<string>('T1')
	const [seleccionados, setSeleccionados] = useState<IColums[]>([])
	const { tendidos } = usePreciosRefs()
	const { onOpen, onClose, isOpen } = useToggle()
	const { state: eventos } = useLocation() as any
	const { createBloqueoAsiento } = useBloqueoAsientoEvento()
	const evento = eventos.evento
	const toast = useToast()
	const { asientos, refetch: refetchAsientos } = useAsientosEventos({
		eventoId: evento?.eventoId,
		tendido: innerValue
	})

	const categorias = tendidos.map((tendido) => ({
		value: tendido?.tendido!,
		label: tendido?.tendido!,
		desc: tendido?.tendido!
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

	const handleBloquear = () => {
		createBloqueoAsiento({ input: seleccionados }).then((res) => {
			if (res?.ok) {
				toast({
					title: 'Asientos Bloqueados Correctamente',
					position: 'top-right',
					isClosable: true,
					status: 'success'
				})
				refetchAsientos()
				setSeleccionados([])
			} else {
				toast({
					title: res?.error,
					position: 'top-right',
					isClosable: true,
					status: 'error'
				})
			}
		})
	}
	return (
		<Container maxWidth='1930px' p={'10'}>
			<Heading as='h1' mb={5} fontSize={22}>
				Evento
			</Heading>
			<Text color='blackAlpha.600' _dark={{ color: 'gray.400' }} fontSize='14px' mt={3}>
				{evento?.titulo}
			</Text>
			<Box>
				<Box pt={5}>
					<Heading fontSize={20} color='primary.500' textAlign='center' _dark={{ color: 'second.500' }}>
						SELECCIONA TUS ASIENTOS
					</Heading>
					<Flex
						flexDir='column'
						justifyContent='center'
						borderY='2px'
						borderColor='primary.500'
						_dark={{ borderColor: 'second.500' }}
						py={5}
						mt={5}>
						<Select
							innerValue={innerValue!}
							setInnerValue={setInnerValue}
							selectOptions={categorias!}
							label='Tendido'
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
								tipo='evento'
								evento={evento?.eventoId}
								doble={innerValue === 'T2S' ? 'Tendido2' : innerValue === 'T3' ? 'Tendido3' : 'Ruedo'}
								direccion={innerValue === 'T3A' ? 'end' : innerValue === 'T3B' ? 'start' : 'center'}
								id={innerValue}
							/>
						)}
					</Flex>
					<Flex p={5} gap={3} fontSize={{ base: 'sm', lg: 'lg' }}>
						<Flex gap={5} alignItems='center'>
							<span className='w-2.5 h-2.5 bg-butacas rounded-full'></span>
							<p className='text-tertiary dark:text-yellow-500'>Seleccionados</p>
						</Flex>
						<div className='flex items-center gap-2'>
							<span className='w-2.5 h-2.5 bg-secondary rounded-full'></span>
							<p className='text-tertiary dark:text-yellow-500'>Libres</p>
						</div>
						<div className='flex items-center gap-2'>
							<span className='w-2.5 h-2.5 bg-text rounded-full'></span>
							<p className='text-tertiary dark:text-yellow-500'>No disponibles</p>
						</div>
					</Flex>
				</Box>
				<div className='flex justify-center w-full bg-secondary'>
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
								className='px-5 py-2 mt-10 text-white rounded-lg bg-tertiary lg:mt-0'
								onClick={onOpen}>
								Bloquear
							</button>
						</div>
					</div>
				</div>
			</Box>
			<ModalConfirmar
				isOpen={isOpen}
				onClick={handleBloquear}
				onClose={onClose}
				header='Bloaquer'
				body='¿Estas seguro que deseas Bloquear esta asiento?'
			/>
		</Container>
	)
}

export default EventoId
