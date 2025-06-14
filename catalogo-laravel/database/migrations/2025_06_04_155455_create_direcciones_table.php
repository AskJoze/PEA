<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('direcciones', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')
                ->constrained('users')->onDelete('cascade');//relacion tabla usuarios
            $table->string('direccion');//direccion del usuario
            $table->string('ciudad');//ciudad del usuario
            $table->string('provincia');//provincia del usuario
            $table->string('telefono');//telefono del usuario
        
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('direcciones');
    }
};
