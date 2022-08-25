import { IconEye, IconHome } from '@icons'
import { Route } from '@interface/index'
import { lazy } from 'react'

const VentasPage = lazy(() => import('../pages/home/ventas/VentasPage'))
const VentasAsientos = lazy(() => import('../pages/home/ventas/ventasAsientos/VentasAsientos'))

export const homeRoutes: Route[] = [
	{
		icon: IconHome,
		path: 'ventas',
		name: 'Ventas',
		to: '/ventas',
		component: VentasPage,
		subMenu: {
			value: false,
			paths: [
				{
					icon: IconHome,
					name: 'Asientos',
					path: 'ventas/asientos',
					to: 'asientos',
					component: VentasAsientos,
					render: false
				}
				// {
				// 	icon: IconHome,
				// 	name: 'Abono',
				// 	path: 'bloqueo/abono',
				// 	to: 'abono',
				// 	component: AbonoPage,
				// 	render: false
				// },

				// {
				// 	icon: IconHome,
				// 	name: 'evento',
				// 	path: 'bloqueo/evento/:id',
				// 	to: 'evento',
				// 	component: EventosPage,
				// 	render: false
				// }
			]
		}
	}
]

export const getRoutes = () => {
	const subRoutes = []
	const mainRoutes = []

	for (const { subMenu, ...mainRoute } of homeRoutes) {
		mainRoutes.push(mainRoute)

		for (const subMenu_ of subMenu.paths) {
			subRoutes.push(subMenu_)
		}
	}

	return { mainRoutes, subRoutes }
}
