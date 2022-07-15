export interface Empresa {
    Usuario: string;
    CodSistema: number;
    CodEmpresa: number;
    CodigoRefEmpresa: string;
    NombreEmpresa: string;
    LogoEmpresa: string;
    DescEmpresa: string;
    Icon: string;
}

export interface BaseResponse {
    Codigo: number;
    Mensaje: string;
}

export interface ListaValorRQ {
    IdEmpresa: number;
    ReferenciaTipo: string;
    ReferenciaValor?: string;
    ReferenciaDoble?: string;
    Estado?: string;
}

export interface ListaValorRS extends BaseResponse {
    ListaValores: ListaValor[];
}

export interface DespachoActivoRQ {
    IdEmpresa: number;
    Usuario: string;
}

export interface DespachoActivoRS extends BaseResponse {
    Despachos: DespachoWS[];
}

export interface DespachoWS {
    IdEmpresa: number;
    IdDespacho: number;
    Vehiculo: string;
    IdRuta: number;
    Ruta: string;
    NumeroViaje: number;
    Tramo: string;
    Estado: string;
    IdSupervisor: number;
    IdConductor?: number;
    IdVehiculo: number;
    NombreConductor: string;
    Confirmado: string;
    Tripulante1: string;
    tripulante2: string;
    tripulante3: string;
    Tripulante4: string;
    TipoVehiculo: string;
    FecUltimoReporte: string;
    Velocidad: number;
    TipoServicio: string;
    ZonaAtencion: string;
    MinutosUltimoReporte: number;
    IdNovedadOperacionAbierta: number;
    ComponenteActividad: string;
    IdSolicitud?: number;
    Origen: string;
    Destino: string;
    Observaciones: string;
    ReferenciaOT: string;
    OrdenTrabajo: string;
    IdTramoActual: number;
    IdTipoServicio: number;
    NovedadesSiguientes: NovedadWS[];
    EstadoOperativo: string;
    MensajeAccion: string;
    IdVehiculoOperativo?: number;
    ObservacionRechazo: string;
    SwitchMantenimiento: string;
    IdTurno?: number;
    RechazoEn: string;
    ApsPrincipal?: number;
}

export interface NovedadWS{
    IdNovedad: number;
    Idempresa: number;
    Nombre: string;
    Estado: string;
    IdNovedadOperacion?: number;
    Referencia: string;
}

export interface ListaValor {
    IdListaValor: number;
    IdEmpresa: number;
    IdTipoLista: number;
    Referencia: string;
    ReferenciaDoble: string;
    Nombre: string;
    Valor: string;
    Descripcion: string;
    Estado: string;
    Usuario?: number;
    FechaModificacion?: Date;
}

export interface Vehiculo {
    IdVehiculo: number;
    Placa: string;
    NumInterno: string;
    TipoVehiculo: TipoVehiculo;
    Orden: number;
    UltimoSeguimientoAVL: SeguimientoAVL;
    SeguimientosAVL: SeguimientoAVL[];
}

export interface SeguimientoAVL {
    IdSeguimientoAVL: number;
    IdEmpresa: number;
    IdAVL: number;
    Placa: string;
    Fecha: string;
    PosX?: number;
    PosY?: number;
    Velocidad: number;
    Novedadavl?: number;
    FecRecibo?: string;
    Procesado: string;
    Sentido: string;
    DescNovedad: string;
    Odometro?: number;
    SentidoGrados: number;
    Satelites: number;
    Ignicion: number;
    UltimaFecha: string;
    IdVehiculo: number;
    Ubicacion: string | Function;
    IdRuta?: number;
    IdDespacho?: number;
    NumViaje?: number;
}

export interface TipoVehiculo {
    IdTipoVehiculo: number;
    Nombre: string;
}

export interface StatusPreoperacional {
    Switch: string;
    Status: string;
    Descripcion: string;
    IdVehiculoOperativo?: number;
}

export interface SistemaVehiculo {
    IdSistema: number;
    Nombre: string;
}

export interface Viaje {
    TipoRetorno: string;
    TramoFinaliza: number;
}

export interface Ruta {
    IdRuta: number;
    IdEmpresa?: number;
    Nombre: string;
    ExisteCapa?: string;
    Estado?: string;
    Distancia?: number;
    IdTipoServicio?: number;
    IdTurno?: number;
}

export interface Persona {
    IdPersona: number;
    IdEmpresa: number;
    Nombre: string;
    Alias: string;
}

export interface ProgramacionTripulacion {
    IdProgramacionTripulacion: number;
    IdEmpresa: number;
    IdProgramacionVehiculo: number;
    IdPersona: number;
    Conductor: string;
    Usuario?: number;
    FechaModificacion?: Date;
}

export interface TripulacionProgramacion {
    idConductor: number;
    Conductor: string;
    idTripulante1: number;
    Tripulante1: string;
    idTripulante2: number;
    Tripulante2: string;
}

export interface DatosDespachoApoyo {
    IdDespacho: number;
    VehiculoNumeroPlaca: string;
}

export interface DatosCriterioRechazo {
    IdTipoVehiculo: number;
    IdSistemaVehiculo: number;
    IdCriterioInspeccion: number;
    OrdenCriterio: number;
    Criterio: string;
}

export interface Despacho {
    IdDespacho?: number;
    IdEmpresa?: number;
    Referencia?: string;
    IdTipoServicio: number;
    IdProgramacionVehiculo?: number;
    IdVehiculo: number;
    IdMacroruta?: number;
    IdTurno: number;
    IdRuta: number;
    PersonaDespacha?: number;
    Combustible?: number;
    Combustiblesalida?: number;
    KilometrajeSalidaBase?: number;
    KilometrajeEntradaBase?: number;
    GalonesAgua?: number;
    ApoyoRuta?: string;
    Estado?: string;
    NumeroTripulantes?: number;
    FechaCreado?: Date;
    FechaSalidaBase?: Date;
    FechaEntradaBase?: Date;
    TotalTiempo?: number;
    TotalDistancia?: number;
    TotalViajes?: number;
    TotalPeso?: number;
    Tiempoinoperativo?: number;
    Usuario?: number;
    FechaModificacion?: Date;
    IdSupervisor?: number;
    NumeroOt?: number;
    DescripcionOt: string;
    IdTramoActual?: number;
    SitioDespacho: string;
    IdSolicitud?: number;
    CreoDesde?: string;
    PlacaAlquilado?: string;
    ApoyaRuta?: string;
    IdDespachoApoyo?: number;
    DescripcionApoyo?: string;
}

export interface SeguimientoGrupo {
    Vehiculo: string;
    RutaNombre: string;
    Turno: string;
    Velocidad: number;
    UltimoReporte: string;
    IdVehiculo: number;
    IdDespacho: number;
    NumViaje: number;
    FechaDespacho: Date;
    Conductor: string;
    Supervisor: string;
    IdEmpresa: number;
    IdNovedadOperacion: number;
    IdNovedad: number;
    TituloActividad: string;
    ControlUsuario: string;
    IdTipoServicio: number;
    IdTramoActual?: number;
    NombreTramo: string;
    Inactividad: string;
    Placa: string;
    RutaApoyo: string;
    VehiculoStock: string;
    RetornoSuspendido: number;
    Estado: string;
    PosX?: number;
    PosY?: number;
    IdTipoVehiculo?: number;
    NovedadReferencia: string;
    EstadoViaje?: string;
    EstadoVerificado?: string;
    Sentido: string;
    SentidoGrados?: number;
    Area?: string;
    SitioAsignado: string;
    MarcaLinea: string;
    TipoVehiculo: string;
    Capacidad: number;
    NombreSubservicio: string;
}

export interface EjecutarFuncionSigoRQ {
    NombreFuncion: string;
    Parametros?: any;
}

export interface EjecutarFuncionSigoRS extends BaseResponse {
    Respuesta: any;
}

export interface GrupoDispositivo {
    IdGrupoDispositivo: number;
    Nombre: string;
    Capas: CapaGrupoDispositivo[];
    IdReferenciaGeografica?: number;
    Vehiculos?: Vehiculo[];
}

export interface CapaGrupoDispositivo {
    IdCapa: number;
    PorDefecto: string;
    Capa: Capa;
}

export interface Vehiculo {
    IdVehiculo: number;
    Placa: string;
    NumInterno: string;
    TipoVehiculo: TipoVehiculo;
    Orden: number;
    UltimoSeguimientoAVL: SeguimientoAVL;
    SeguimientosAVL: SeguimientoAVL[];
}

export interface SeguimientoAVL {
    IdSeguimientoAVL: number;
    IdEmpresa: number;
    IdAVL: number;
    Placa: string;
    Fecha: string;
    PosX?: number;
    PosY?: number;
    Velocidad: number;
    Novedadavl?: number;
    FecRecibo?: string;
    Procesado: string;
    Sentido: string;
    DescNovedad: string;
    Odometro?: number;
    SentidoGrados: number;
    Satelites: number;
    Ignicion: number;
    UltimaFecha: string;
    IdVehiculo: number;
    Ubicacion: string | Function;
    IdRuta?: number;
    IdDespacho?: number;
    NumViaje?: number;
}

export class Capa {
    IdCapa?: number;
    IdEmpresa: number;
    Referencia: string;
    Tipo: string;
    IdConfiguracion?: number;
    Nombre: string;
    Datos: string;
    Geometria: string;
    TipoProyeccion: string;
    Orden?: number;
    Tabla: string;
    Transparencia?: number;
    Zoom?: number;
    FechaVigenciaDesde: Date;
    Estado: string;
    Usuario?: number;
    FechaModificaion?: Date;
    IdGrupoPadre?: number;
    Seleccionado?: string;
}

export interface UltimaPosicion{
    IdEmpresa: number;
    IdVehiculo: number;
    IdDespacho?: number;
    Vehiculo: string;
    Velocidad: number;
    UltimoReporte: Date;
    PosX: number;
    PosY: number;
    IdTipoVehiculo: number;
    IdSupervisor?: number;
    RutaNombre: string;
    Imagen: string;
}

export interface UltimaPosicionRQ {
    IdVehiculo: number;
}

export interface UltimaPosicionRS extends BaseResponse {
    ultPos: UltimaPosicion[];
}

export interface Marker {
    position: {
        lat: number,
        lng: number,
    };
    title: string;
    icono: string;
    ruta: string;
    despacho: string;
}

export interface CoordInfo {
    Ciudad: string,
    Vehiculo: string;
    Ruta: string;
    Despacho: string;
    Marcador: Marker;
}

export interface DatosSeguimiento {
    PosX: number;
    PosY: number;
    Sentido: string;
    Fecha: Date;
    Velocidad: number;
    Orden: number;
    IdRuta: number;
}

export interface ReferenciaGografica {
    IdEmpresa: number;
    PosX: number;
    PosY: number;
}

export interface CoordenadaGeocerca {
    Nombre: string;
    Poligono: string;
    ExisteDespacho: number;
    Centro: string;
}

export interface DatosConsultaRecorrido{
    Recorrido: DatosSeguimiento[];
    ReferenciaGografica: ReferenciaGografica;
    Geocercas: CoordenadaGeocerca[];
}

export interface RecorridoRQ {
    IdEmpresa: number;
    IdDespacho: number;
    NumViaje: number;
    IdRuta: number;
}

export interface RecorridoRS extends BaseResponse {
    dtsConsultaRecorrido: DatosConsultaRecorrido;
}

export interface PersonaWS {
    IdPersona: number;
    NroDocumento: number;
    Alias: string;
    Cargo: string;
    IdEmpresa: number;
    Nombre: string;
    Genero: string;
    NombreEps: string;
    NombreArp: string;
    TipoSangre: string;
    FechaUltActualizacion: string;
}

export interface PersonaOperativa extends PersonaWS {
    Foto: String;
    FechaVenceLicencia: string;
    IdGPS?: number; 
}

export interface PersonaOperativaRQ {
    IdEmpresa: number;
}

export interface PersonaOperativaRS extends BaseResponse {
    Personal: PersonaOperativa[];
}