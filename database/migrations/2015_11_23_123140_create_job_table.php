<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateJobTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        \Schema::create('tb_job', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('company_id');
            $table->unsignedInteger('agency_id')->nullable();
            $table->unsignedInteger('experience_year')->default(0);
            $table->string('title', 255);
            $table->string('start_date', 255);
            $table->string('city', 50);
            $table->string('country', 50);
            $table->string('duration', 25);
            $table->boolean('is_active')->default(true);
            $table->string('contact_name', 255);
            $table->string('contact_phone', 255);
            $table->decimal('salary', 16, 4);
            $table->enum('salary_type', ['hourly', 'monthly', 'daily', 'annually']);
            $table->boolean('visa')->default(1);
            $table->boolean('eligible_to_work_in_country')->default(1);
            $table->boolean('security_clearance')->default(1);
            $table->enum('type', ['permanent', 'contract']);
            $table->enum('status', ['open', 'taken']);
            $table->text('job_apply_details');
            $table->text('description')->nullable();
            $table->timestamps();

            $table->engine = 'InnoDB';
            $table->index(['company_id', 'created_at']);
            $table->index(['title', 'city', 'country']);
            $table->index(['type', 'salary', 'experience_year']);
        });

        \Schema::create('tb_industry', function(Blueprint $table) {
            $table->increments('id');
            $table->string('title');
            $table->timestamps();

            $table->engine = 'InnoDB';
            $table->index('created_at');
        });

        \Schema::create('tb_job_industry', function (Blueprint $table) {
            $table->unsignedInteger('job_id');
            $table->unsignedInteger('industry_id');
            $table->timestamps();

            $table->engine = 'InnoDB';
            $table->index(['job_id', 'industry_id']);
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
        \Schema::drop('tb_job_industry');
        \Schema::drop('tb_industry');
        \Schema::drop('tb_job');
    }
}
