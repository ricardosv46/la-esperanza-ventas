import { useCreateVentaAbonadoMutation, useGetAllVentasQuery } from '@generated/graphql'

interface ICreate {
	input1: {}
	input2: {}
}

const useVendedoras = (input = { pagina: 1, numeroPagina: 10 }) => {
	const { data, loading, refetch } = useGetAllVentasQuery({
		fetchPolicy: 'network-only',
		variables: {
			...input
		}
	})
	const ventas = data?.GetAllVentas?.data ?? []
	const nTotal = data?.GetAllVentas?.numeroTotal ?? 0

	const [CreateVentaAbonado, { loading: loadingLogin }] = useCreateVentaAbonadoMutation()

	const createVentaAbonado = async ({ input1, input2 }: ICreate) => {
		try {
			const res = await CreateVentaAbonado({
				variables: {
					input1,
					input2
				}
			})
			if (res.data?.CreateVentaAbonado) {
				return { ok: true }
			}
		} catch (error: any) {
			return { ok: false, error: error?.graphQLErrors[0]?.debugMessage }
		}
	}
	return {
		ventas,
		loading,
		refetch,
		nTotal,
		createVentaAbonado
	}
}

export default useVendedoras
