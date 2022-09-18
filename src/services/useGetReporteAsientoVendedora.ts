// import { useReporteAsientoVendedoraQuery } from '../generated/graphql'

// interface Props {
//   code: string
// }

// export const useGetReporteAsientoVendedora = ({ code }: Props) => {
//   const { data, loading, refetch } = useReporteAsientoVendedoraQuery({
//     fetchPolicy: 'cache-and-network',
//     variables: {
//       code
//     }
//   })

//   const reporte = data?.ReporteAsientoVendedora ?? ''

//   return {
//     loading,
//     reporte
//   }
// }

import { useReporteAsientoVendedoraLazyQuery } from '../generated/graphql'

interface Props {
  code: string
}

export const useGetReporteAsientoVendedora = () => {
  const [MutationUseGetReporte, { loading }] = useReporteAsientoVendedoraLazyQuery({
    onError: (err) => {
      console.log('onError Get reporte', err?.graphQLErrors[0])
    }
  })

  const getReporteVendedora = async ({ code }: Props) => {
    try {
      const res = await MutationUseGetReporte({
        variables: { code }
      })

      const linkReporte = res?.data?.ReporteAsientoVendedora ?? ''

      return { ok: true, loading, linkReporte }
    } catch (error: any) {
      return { ok: false, error: error?.graphQLErrors[0]?.debugMessage }
    }
  }
  return { getReporteVendedora, loading }
}
