export interface EstadoCuenta {
    montoTotalContado: number;
    montoTotalCredito: number;
    cantidad_venta_credito: number;
    cantidad_venta_contado: number;
    cantidad_venta_anulada: number;
    cantidad_venta_pendiente: number;
}

export interface EstadoCuentaDevolucion {
    montoTotalContado: number;
    cantidad_devolucion_contado: number;
    cantidad_devolucion_anulada: number;
    cantidad_devolucion_pendiente: number;
}