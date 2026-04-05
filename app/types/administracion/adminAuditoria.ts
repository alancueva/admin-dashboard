export interface auditoriaRecuperar {
  id_auditoria: number;
  id_organizaciones: number;
  codigo_registro: number;
  usuario: string;
  fecha_registro: string;
  modulo: string;
  opcion: string;
  accion: string;
  datos_registrados: any[];
  datos_actualizados: any[];
}

export interface auditoria {
  id_auditoria: number;
  usuario: string;
  fecha_registro: string;
  modulo: string;
  opcion: string;
  accion: string;
}
