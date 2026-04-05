export interface rol {
  id_rol: number;
  rol_nombre: string;
  rol_descripcion: string;
}

export interface rolInsert {
  rol_nombre: string;
  rol_descripcion: string;
}

export interface rolUpdate extends rolInsert {
  id_rol: number;
}
