<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateContractorTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // main table
        \Schema::create('tb_contractor', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('user_id');
            $table->string('address', 255);
            $table->string('occupation', 255)->default('Has many skills');
            $table->string('phone', 255)->nullable();
            $table->string('city', 255)->nullable();
            $table->string('country', 255)->nullable();
            $table->text('educations')->nullable();
            $table->text('experiences')->nullable();
            $table->enum('salary_rate', ['hourly', 'daily', 'monthly']);
            $table->integer('range_salary_min')->default(0);
            $table->integer('range_salary_max')->default(0);
            $table->text('skills')->nullable();
            $table->text('urls')->nullable();
            $table->text('description')->nullable();
            $table->text('socials')->nullable();
            $table->string('image', 255)->nullable();
            $table->timestamps();

            $table->engine = 'InnoDB';
            $table->index(['user_id', 'created_at']);
        });

        // expense
        \Schema::create('tb_contractor_expense', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('contractor_id');
            $table->unsignedInteger('job_id');
            $table->string('title', 255);
            $table->string('file', 255)->nullable();
            $table->enum('type', ['food', 'transport', 'business_operation', 'other']);
            $table->text('description')->nullable();
            $table->decimal('amount', 16, 4);
            $table->timestamps();

            $table->engine = 'InnoDB';
            $table->index(['contractor_id', 'created_at']);
        });

        // job alert/bookmark
        \Schema::create('tb_contractor_job_alert', function(Blueprint $table) {
            $table->unsignedInteger('contractor_id');
            $table->unsignedInteger('industry_id');
            $table->string('email', 255);
            $table->string('country', 100);
            $table->string('city', 100);
            $table->enum('type', ['any', 'permanent', 'contract']);
            $table->timestamps();

            $table->engine = 'InnoDB';
            $table->index(['contractor_id', 'industry_id']);
            $table->index('created_at');
        });

        // job applied
        \Schema::create('tb_contractor_job', function(Blueprint $table) {
            $table->unsignedInteger('contractor_id');
            $table->unsignedInteger('job_id');
            $table->unsignedInteger('timesheet_id');
            $table->timestamps();

            $table->engine = 'InnoDB';
            $table->index(['contractor_id', 'job_id']);
            $table->index('created_at');
        });

        // cv table
        \Schema::create('tb_contractor_cv', function(Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('contractor_id');
            $table->string('file', 255);
            $table->timestamps();

            $table->engine = 'InnoDB';
            $table->unique = 'contractor_id';
            $table->index(['contractor_id', 'created_at']);
        });

        // timesheet table
        \Schema::create('tb_contractor_timesheet', function(Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('contractor_id');
            $table->unsignedInteger('job_id');
            $table->string('name', 255);
            $table->enum('type', ['file', 'data']);
            $table->string('file', 255)->nullable();
            $table->enum('report', ['daily', 'weekly', 'monthly'])->nullable();
            $table->smallInteger('hours')->nullable();
            $table->dateTime('start_date')->default('0000-00-00 00:00:00')->nullable();
            $table->dateTime('end_date')->default('0000-00-00 00:00:00')->nullable();
            $table->timestamps();

            $table->engine = 'InnoDB';
            $table->index(['contractor_id', 'created_at']);
        });

        // notifications
        \Schema::create('tb_contractor_notification', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('contractor_id');
            $table->string('alert_from', 255);
            $table->boolean('has_read')->default(0);
            $table->string('title', 255);
            $table->string('url', 255)->nullable();
            $table->text('description')->nullable();
            $table->timestamps();

            $table->engine = 'InnoDB';
            $table->index(['alert_from', 'created_at']);
            $table->index(['contractor_id', 'has_read']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        \Schema::drop('tb_contractor_notification');
        \Schema::drop('tb_contractor_timesheet');
        \Schema::drop('tb_contractor_cv');
        \Schema::drop('tb_contractor_job');
        \Schema::drop('tb_contractor_job_alert');
        \Schema::drop('tb_contractor_expense');
        \Schema::drop('tb_contractor');
    }
}
