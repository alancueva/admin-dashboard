export interface menu {
  id_menu: number;
  id_organizaciones: number;
  id_categoria: number;
  cate_nombre: string;
  menu_nombre: string;
  menu_descripcion: string;
  menu_precio: number;
  menu_vigencia: string;
  usuario_creacion: string;
  fecha_creacion: string;
  usuario_modificacion: string;
  fecha_modificacion: string;
  usuario_baja: string;
  fecha_baja: string;
}

export interface menuDTO {
  id_menu: number;
  id_categoria: number;
  categoria: string;
  menu_nombre: string;
  menu_descripcion: string;
  menu_precio: number;
  menu_vigencia: string;
}

export interface menuActivo {
  id_menu: number;
  menu_nombre: string;
  menu_descripcion: string;
  menu_precio: number;
}

export interface menuInsert {
  id_organizaciones: number;
  id_categoria: number;
  menu_nombre: string;
  menu_descripcion: string;
  menu_precio: number;
  menu_vigencia: string;
  usuario_creacion: string;
}

export interface menuUpdate extends menuInsert {
  id_menu: number;
}
