export interface organizacionRecuperar {
  id_organizaciones: number;
  id_tipo_negocio: number;
  nombre_negocio: string;
  id_tipo_documento_identidad: number;
  tipo_doumento_identidad: string;
  numero_documento: string;
  tiene_almacen: string;
  nombre: string;
  direccion: string;
  telefono: string;
  email: string;
  vigencia: string;
  fecha_creacion: string;
  usuario_creacion: string;
  fecha_actualizacion: string;
  usuario_actualizacion: string;
}

export interface organizacionInsert {
  id_tipo_negocio: number;
  id_tipo_documento_identidad: number;
  numero_documento: string;
  nombre: string;
  direccion: string;
  telefono: string;
  email: string;
  vigencia: string;
  usuario_creacion: string;
}

export interface organizacionUpdate extends organizacionInsert {
  id_organizaciones: number;
}
