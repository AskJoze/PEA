<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Producto extends Model
{
    protected $fillable = [
        'nombre',
        'descripcion',
        'precio',
        'cantidad',
        'imagen',
        'stock',
    ];
    
    public function categorias()
    {
        return $this->belongsToMany(Categoria::class, 'categoria_producto', 'producto_id', 'categoria_id');
    }
    public function carritoProductos(){
        return $this->hasMany(CarritoProducto::class);
    }
    public function pedidoProducto() {
        return $this->belongsToMany(Pedido::class);
 
    }
}
