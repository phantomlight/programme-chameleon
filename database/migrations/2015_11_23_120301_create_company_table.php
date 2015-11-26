<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCompanyTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        \Schema::create('tb_company', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('user_id');
            $table->unsignedInteger('credit');
            $table->text('address')->nullable();
            $table->string('name', 255);
            $table->string('position', 255);
            $table->string('image', 255)->nullable();
            $table->string('phone', 255);
            $table->timestamps();

            $table->engine = 'InnoDB';
            $table->index(['user_id', 'created_at']);
            $table->index('name');
        });

        \Schema::create('tb_company_credit_history', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('company_id');
            $table->decimal('amount');
            $table->enum('status', ['process', 'done']);
            $table->timestamps();

            $table->engine = 'InnoDB';
            $table->index(['company_id', 'created_at']);
        });

        \Schema::create('tb_company_notification', function(Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('company_id');
            $table->string('alert_from', 255);
            $table->boolean('has_read')->default(0);
            $table->string('title', 255);
            $table->timestamps();

            $table->engine = 'InnoDB';
            $table->index(['alert_from', 'created_at']);
            $table->index(['company_id', 'has_read']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        \Schema::drop('tb_company_notification');
        \Schema::drop('tb_company_credit_history');
        \Schema::drop('tb_company');
    }
}
