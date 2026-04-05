export interface mesa {
  id_mesa: number;
  id_organizaciones: number;
  mesa_numero: string;
  mesa_capacidad_personas: number;
  mesa_estado: string;
  mesa_vigencia: string;
  usuario_creacion: string;
  fecha_creacion: string;
  usuario_modificacion: string;
  fecha_modificacion: string;
  usuario_baja: string;
  fecha_baja: string;
}

export interface mesaDTO {
  id_mesa: number;
  mesa_numero: string;
  mesa_capacidad_personas: number;
  mesa_estado: string;
  mesa_vigencia: string;
}

export interface mesaActivo {
  id_mesa: number;
  mesa_numero: string;
}

export interface mesaInsert {
  id_organizaciones: number;
  mesa_numero: string;
  mesa_capacidad_personas: number;
  mesa_estado: string;
  mesa_vigencia: string;
  usuario_creacion: string;
}

export interface mesaUpdate extends mesaInsert {
  id_mesa: number;
}
