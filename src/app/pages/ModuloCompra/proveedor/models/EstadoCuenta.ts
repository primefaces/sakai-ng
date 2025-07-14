export interface EstadoCuenta {
    montoTotalContado: number;
    montoTotalCredito: number;
    cantidad_compra_credito: number;
    cantidad_compra_contado: number;
    cantidad_compra_anulada: number;
    cantidad_compra_pendiente: number;
}

export interface EstadoCuentaDevolucion {
    montoTotalContado: number;
    cantidad_devolucion_contado: number;
    cantidad_devolucion_anulada: number;
    cantidad_devolucion_pendiente: number;
}