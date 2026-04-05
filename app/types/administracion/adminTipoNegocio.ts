export interface TipoNegocio {
  id_tipo_negocio: number;
  nombre: string;
  descripcion: string;
  icono: string;
  vigencia: string;
  fecha_creacion: string;
  usuario_creacion: string;
  fecha_actualizacion: string;
  usuario_actualizacion: string;
  usuario_baja: string;
  fecha_baja: string;
}

export interface tipoNegocioActivo {
  id_tipo_negocio: number;
  nombre: string;
}

export interface tipoNegocioDTO {
  id_tipo_negocio: number;
  nombre: string;
  descripcion: string;
  vigencia: string;
}

export interface tipoNegocioInsert {
  nombre: string;
  descripcion: string;
  icono: string;
  vigencia: string;
  usuario_creacion: string;
}

export interface tipoNegocioUpdate extends tipoNegocioInsert {
  id_tipo_negocio: number;
}
