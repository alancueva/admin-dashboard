export interface categoria {
  id_categoria: number;
  cate_nombre: string;
  cate_descripcion: string;
  cate_orden: number;
  cate_vigencia: string;
}

export interface categoriaDTO {
  id_categoria: number;
  cate_nombre: string;
  cate_descripcion: string;
  cate_orden: number;
  cate_vigencia: string;
  usuario_creacion: string;
  fecha_creacion: string;
  usuario_modificacion: string;
  fecha_modificacion: string;
  usuario_baja: string;
  fecha_baja: string;
}

export interface categoriaActiva {
  id_categoria: number;
  cate_nombre: string;
}

export interface categoriaInsert {
  id_organizaciones: number;
  cate_nombre: string;
  cate_descripcion: string;
  cate_orden: number;
  cate_vigencia: string;
  usuario_creacion: string;
}

export interface categoriaUpdate extends categoriaInsert {
  id_categoria: number;
}
