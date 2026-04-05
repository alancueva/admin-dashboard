export interface serie {
  id_series_comprobante: number;
  id_tipo_comprobante: number;
  tipo_comprobante: string;
  serie_compbt_serie: string;
  serie_compbt_descripcion: string;
  serie_compbt_numero: number;
  serie_compbt_vigencia: string;
  usuario_creacion: string;
  fecha_creacion: string;
  usuario_modificacion: string;
  fecha_modificacion: string;
  usuario_baja: string;
  fecha_baja: string;
}

export interface serieDTO {
  id_organizaciones: number;
  id_tipo_comprobante: number;
  tipo_comprobante: string;
  serie_compbt_serie: string;
  serie_compbt_descripcion: string;
  serie_compbt_numero: number;
  serie_compbt_vigencia: string;
}

export interface serieInsert {
  id_organizaciones: number;
  id_tipo_comprobante: number;
  serie_compbt_serie: string;
  serie_compbt_descripcion: string;
  serie_compbt_numero: string;
  serie_compbt_vigencia: string;
  usuario_creacion: string;
}

export interface serieUpdate extends serieInsert {
  id_series_comprobante: number;
}
