import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { Landing } from './app/pages/landing/landing';
import { Notfound } from './app/pages/notfound/notfound';
import { AuthGuard } from './app/core/guards/auth.guard';


const appRoutes: Routes = [
    {
        path: '',
        component: AppLayout,
        canActivate: [AuthGuard],
        loadChildren: () => import('./app/pages/SeccionDashboard/dashboard/dashboard.module').then(m => m.DashboardModule)
        //children: [
        //    { path: '', component: Dashboard },
        //    { path: 'uikit', loadChildren: () => import('./app/pages/uikit/uikit.routes') },
        //    { path: 'documentation', component: Documentation },
        //    { path: 'pages', loadChildren: () => import('./app/pages/pages.routes') }
        //]
    },
    {
        path: 'configuracion',
        component: AppLayout,
        canActivate: [AuthGuard],
        loadChildren
            : () => import('./app/pages/ModuloAdministracion/configuracion/configuracion.module').then(m => m.ConfiguracionModule)
    },
    {
        path: 'unidad',
        component: AppLayout,
        canActivate: [AuthGuard],
        loadChildren
            : () => import('./app/pages/ModuloProducto/unidad/unidad.module').then(m => m.UnidadModule)
    },
    {
        path: 'categoria',
        component: AppLayout,
        canActivate: [AuthGuard],
        loadChildren
            : () => import('./app/pages/ModuloProducto/categoria/categoria.module').then(m => m.CategoriaModule)
    },
    {
        path: 'tipo_producto',
        component: AppLayout,
        canActivate: [AuthGuard],
        loadChildren
            : () => import('./app/pages/ModuloProducto/tipo-producto/tipo-producto.module').then(m => m.TipoProductoModule)
    },
    {
        path: 'producto',
        component: AppLayout,
        canActivate: [AuthGuard],
        loadChildren
            : () => import('./app/pages/ModuloProducto/producto/producto.module').then(m => m.ProductoModule)
    },
    {
        path: 'ProductoEnvase',
        component: AppLayout,
        canActivate: [AuthGuard],
        loadChildren
            : () => import('./app/pages/ModuloProducto/producto-envase/producto-envase.module').then(m => m.ProductoEnvaseModule)
    },

    {
        path: 'gestion',
        component: AppLayout,
        canActivate: [AuthGuard],
        loadChildren
            : () => import('./app/pages/ModuloVenta/gestion/gestion.module').then(m => m.GestionModule)
    },

    {
        path: 'cliente',
        component: AppLayout,
        canActivate: [AuthGuard],
        loadChildren
            : () => import('./app/pages/ModuloVenta/cliente/cliente.module').then(m => m.ClienteModule)
    },

    {
        path: 'proveedor',
        component: AppLayout,
        canActivate: [AuthGuard],
        loadChildren
            : () => import('./app/pages/ModuloCompra/proveedor/proveedor.module').then(m => m.ProveedorModule)
    },

    {
        path: 'NotaVenta',
        component: AppLayout,
        canActivate: [AuthGuard],
        loadChildren
            : () => import('./app/pages/ModuloVenta/nota-venta/nota-venta.module').then(m => m.NotaVentaModule)
    },

    {
        path: 'NotaCompra',
        component: AppLayout,
        canActivate: [AuthGuard],
        loadChildren
            : () => import('./app/pages/ModuloCompra/nota-compra/nota-compra.module').then(m => m.NotaCompraModule)
    },

    {
        path: 'Inventario',
        component: AppLayout,
        canActivate: [AuthGuard],
        loadChildren
            : () => import('./app/pages/ModuloInventario/inventario/inventario.module').then(m => m.InventarioModule)
    },

    {
        path: 'NotaDevolucion',
        component: AppLayout,
        canActivate: [AuthGuard],
        loadChildren
            : () => import('./app/pages/ModuloDevolucion/nota-devolucion/nota-devolucion.module').then(m => m.NotaDevolucionModule)
    },

    {
        path: 'cultivo',
        component: AppLayout,
        canActivate: [AuthGuard],
        loadChildren
            : () => import('./app/pages/ModuloVenta/cultivo/cultivo.module').then(m => m.CultivoModule)
    },

    { path: 'landing', component: Landing },
    { path: 'notfound', component: Notfound },
    { path: 'auth', loadChildren: () => import('./app/pages/ModuloAuth/auth/auth.module').then(m => m.AuthModule) },
   // { path: 'auth', loadChildren: () => import('./app/pages/auth/auth.routes') },
    { path: '**', redirectTo: '/notfound' }
];

// El AppRoutingModule sigue siendo necesario para configurar el RouterModule
@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled' })],
  exports: [RouterModule]
})

export class AppRoutingModule {  }