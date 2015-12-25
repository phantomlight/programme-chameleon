<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAgencyTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        \Schema::create('tb_agency', function(Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('user_id');
            $table->string('name', 255);
            $table->string('owner_name', 255);
            $table->string('phone', 255);
            $table->string('address', 255);
            $table->string('country', 255);
            $table->string('city', 255);
            $table->string('image', 255)->nullable();
            $table->text('description')->nullable();
            $table->text('industry')->nullable();
            $table->dateTime('vip_start')->default('0000-00-00 00:00:00');
            $table->dateTime('vip_end')->default('0000-00-00 00:00:00');
            $table->boolean('is_vip')->default(0);
            $table->timestamps();

            $table->engine = 'InnoDB';
            $table->index(['user_id', 'created_at']);
            $table->index('name');
        });

        \Schema::create('tb_agency_credit_history', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('agency_id');
            $table->decimal('amount');
            $table->enum('status', ['process', 'done']);
            $table->timestamps();

            $table->engine = 'InnoDB';
            $table->index(['agency_id', 'created_at']);
        });

        \Schema::create('tb_agency_company', function(Blueprint $table) {
            $table->unsignedInteger('agency_id');
            $table->unsignedInteger('company_id');
            $table->enum('status', ['request', 'accept']);
            $table->timestamps();

            $table->engine = 'InnoDB';
            $table->index(['agency_id', 'company_id']);
            $table->index('created_at');
        });

        \Schema::create('tb_agency_notification', function(Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('agency_id');
            $table->string('alert_from', 255);
            $table->boolean('has_read')->default(0);
            $table->string('title', 255);
            $table->string('url', 255)->nullable();
            $table->timestamps();

            $table->engine = 'InnoDB';
            $table->index(['alert_from', 'created_at']);
            $table->index(['agency_id', 'has_read']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        \Schema::drop('tb_agency_notification');
        \Schema::drop('tb_agency_credit_history');
        \Schema::drop('tb_agency_company');
        \Schema::drop('tb_agency');
    }
}
