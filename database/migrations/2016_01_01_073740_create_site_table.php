<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSiteTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        \Schema::create('tb_site', function (Blueprint $table) {
            $table->increments('id');
            $table->string('key', 100);
            $table->string('title', 255)->nullable();
            $table->string('url', 255)->nullable();
            $table->string('file', 255)->nullable();
            $table->text('description')->nullable();
            $table->timestamps();

            $table->engine = 'InnoDB';
            $table->index('key');
            $table->index('created_at');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        \Schema::drop('tb_site');
    }
}
