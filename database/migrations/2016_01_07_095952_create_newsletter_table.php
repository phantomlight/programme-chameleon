<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateNewsletterTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        \Schema::create('tb_newsletter', function (Blueprint $table) {
            $table->increments('id');
            $table->string('email', 255);
            $table->boolean('active')->default(true);
            $table->timestamps();

            $table->engine = 'InnoDB';
            $table->unique('email');
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
        \Schema::drop('tb_newsletter');
    }
}
