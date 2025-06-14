<?php 

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Categoria;
use App\Models\Producto;

class CategoriaProductoSeeder extends Seeder
{
    public function run(): void
    {
        // Crear categorías
        $categorias = [
            'electronica' => Categoria::firstOrCreate(
                ['slug' => 'electronica'],
                ['nombre' => 'Electrónica']
            ),
            'ropa' => Categoria::firstOrCreate(
                ['slug' => 'ropa'],
                ['nombre' => 'Ropa']
            ),
            'hogar' => Categoria::firstOrCreate(
                ['slug' => 'hogar'],
                ['nombre' => 'Hogar']
            ),
        ];

        // Crear productos con categoría fija
        $productos = [
            [
                'titulo' => 'Laptop X1',
                'descripcion' => 'Laptop de alto rendimiento',
                'precio' => 1200.50,
                'imagen' => 'https://firebasestorage.googleapis.com/v0/b/peapres-77a1b.firebasestorage.app/o/laptopXI.png?alt=media&token=7b922e7f-64db-43ef-9832-78a8717e243f',
                'stock' => 10,
                'categoria_slug' => 'electronica',
            ],
            [
                'titulo' => 'Camisa Casual',
                'descripcion' => 'Camisa de algodón',
                'precio' => 25.99,
                'imagen' => 'https://firebasestorage.googleapis.com/v0/b/peapres-77a1b.firebasestorage.app/o/Camisa%20Casual.webp?alt=media&token=13e99f57-ca15-4f08-93fc-8b2f81510e94',
                'stock' => 50,
                'categoria_slug' => 'ropa',
            ],
            [
                'titulo' => 'Sofá Moderno',
                'descripcion' => 'Sofá de diseño cómodo',
                'precio' => 499.99,
                'imagen' => 'https://firebasestorage.googleapis.com/v0/b/peapres-77a1b.firebasestorage.app/o/Sofa%20moderno.png?alt=media&token=f45589fc-b519-42db-a8fb-4f4f7035e3a9',
                'stock' => 5,
                'categoria_slug' => 'hogar',
            ],
            [
                'titulo' => 'Pantalón Baggy',
                'descripcion' => 'Pantalón estilo baggy cómodo y moderno',
                'precio' => 39.99,
                'imagen' => 'https://firebasestorage.googleapis.com/v0/b/peapres-77a1b.firebasestorage.app/o/Pantal%C3%B3n%20Baggy.webp?alt=media&token=b78581ca-11d2-497b-8ef1-12f5fcde8277',
                'stock' => 20,
                'categoria_slug' => 'ropa',
            ],
            [
                'titulo' => 'Mouse Logitech',
                'descripcion' => 'Mouse ergonómico de alta precisión',
                'precio' => 29.99,
                'imagen' => 'https://firebasestorage.googleapis.com/v0/b/peapres-77a1b.firebasestorage.app/o/Mouse%20Logitech.png?alt=media&token=209f1505-ec28-4b39-af65-ea414b43d1cb',
                'stock' => 30,
                'categoria_slug' => 'electronica',
            ],
            [
                'titulo' => 'Zapato DC',
                'descripcion' => 'Zapato deportivo de la marca DC',
                'precio' => 69.99,
                'imagen' => 'https://firebasestorage.googleapis.com/v0/b/peapres-77a1b.firebasestorage.app/o/Zapato%20DC.png?alt=media&token=644fcd85-d695-4a26-9525-b0f9e90f2cf2',
                'stock' => 15,
                'categoria_slug' => 'ropa',
            ],
            [
                'titulo' => 'Camiseta Oversize',
                'descripcion' => 'Camiseta oversize de algodón suave',
                'precio' => 19.99,
                'imagen' => 'https://firebasestorage.googleapis.com/v0/b/peapres-77a1b.firebasestorage.app/o/dagger.webp?alt=media&token=2ef91e47-d23c-4a6e-a59c-f5871e9bb2c3',
                'stock' => 40,
                'categoria_slug' => 'ropa',
            ],
            [
                'titulo' => 'Cama Grande',
                'descripcion' => 'Cama grande y cómoda para un descanso ideal',
                'precio' => 899.99,
                'imagen' => 'https://firebasestorage.googleapis.com/v0/b/peapres-77a1b.firebasestorage.app/o/cama.webp?alt=media&token=be4cfcbc-9f3b-4484-a87b-522220f6d807',
                'stock' => 8,
                'categoria_slug' => 'hogar',
            ],
        ];

        foreach ($productos as $prodData) {
            $categoria = $categorias[$prodData['categoria_slug']];
            unset($prodData['categoria_slug']);

            $producto = Producto::firstOrCreate(
                ['titulo' => $prodData['titulo']],
                $prodData
            );

            // Asignar categoría específica
            $producto->categorias()->sync([$categoria->id]);
        }
    }
}
