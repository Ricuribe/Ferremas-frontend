// Interface para la categoría de productos
export interface Categoria {
  id: number;
  nombre: string;
}

// Interface para el tipo de productos
export interface Tipo {
  id: number;
  nombre: string;
}

// Interface para los productos
export interface Producto {
  id_producto: number;
  nombre: string;
  categoria: number;
  tipo: number;
  precio: number;
  stock: number;
  descuento: number;
  descripcion: string;
  imagen: string;
  imagen_url: string;
}

// Interface para la respuesta de detalles de un producto
export interface ProductoDetalle {
  id_producto: number;
  nombre: string;
  categoria: Categoria;
  tipo: Tipo;
  precio: number;
  stock: number;
  descuento: number;
  descripcion: string;
  imagen: string;
  imagen_url: string;
}
