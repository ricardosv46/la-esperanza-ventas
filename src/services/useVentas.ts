import { useGetAllVentasQuery } from '@generated/graphql'

const useVendedoras = (input = { pagina: 1, numeroPagina: 10 }) => {
  const { data, loading, refetch } = useGetAllVentasQuery({
    fetchPolicy: 'network-only',
    variables: {
      ...input
    }
  })
  const ventas = data?.GetAllVentas?.data ?? []
  const nTotal = data?.GetAllVentas?.numeroTotal ?? 0

  return {
    ventas,
    loading,
    refetch,
    nTotal
  }
}

export default useVendedoras
