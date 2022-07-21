export const ServiceEndPoints  = {
    login: '/auth/credentials',
    EmpresasUsuarioRQ: '/Usuarios/Empresas',
    
};

export const LoginConfig = {
    loginTimeOut: 100000,
    defaultLoginLogo: 'assets/images/i_icon_login.svg',
  };

export const SystemConfig = {
    timeOut: 15000000,
}

export const ConstSIGO = {

    modName: 'SIGO',
    versionSigo: 'SIGO - Version: 1.0.0',
    services: {
        EjecutarFuncionSigoRQ: '/General/FuncionSigo',
        DespachosRQ: '/Operacion/Despachos',
        UbicacionRQ: '/Operacion/ultimaposicion',
        RecorridoRQ: '/Operacion/obtenerrecorrido',
        DatosInspeccionRQ: '/Operacion/obtenerdatosinspeccion',
        DescargarDatosRQ: '/Operacion/obtenerdatos'
    },

    // Funciones
    idFuncionObtenerControlOperaciones: 'OBTENER_CONTROL_OPERACIONES',
    idFuncionObtenerGrupoDispositivos: 'OBTENER_GRUPO_DISPOSITIVOS',

    // Grupo Dispositivos
    GrupoDispositivoTipoUsoVisualizacion: 'V',
    
};