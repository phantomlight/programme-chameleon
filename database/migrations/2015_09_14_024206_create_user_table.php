<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUserTable extends Migration {

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
      Schema::create('tb_users', function(Blueprint $table) {
        $table->increments('id');
        $table->string('email');
        $table->string('password', 60);
        $table->text('permissions')->nullable();
        $table->boolean('activated')->default(0);
        $table->string('activation_code')->nullable();
        $table->timestamp('activated_at')->nullable();
        $table->timestamp('last_login')->nullable();
        $table->string('persist_code')->nullable();
        $table->string('reset_password_code')->nullable();
        $table->string('first_name')->nullable();
        $table->string('last_name')->nullable();
        $table->string('image')->nullable();
        $table->string('slug');
        $table->rememberToken();
        $table->timestamps();

        $table->engine = 'InnoDB';
        $table->unique('email');
        $table->index('activation_code');
        $table->index('reset_password_code');
        $table->index('slug');
      });

      Schema::create('tb_users_groups', function($table) {
        $table->increments('id');
        $table->string('name');
        $table->text('permissions')->nullable();
        $table->timestamps();

        $table->engine = 'InnoDB';
        $table->unique('name');
      });

      Schema::create('tb_users_groups_pivot', function($table) {
        $table->integer('user_id')->unsigned();
        $table->integer('group_id')->unsigned();

        $table->engine = 'InnoDB';
        $table->primary(array('user_id', 'group_id'));
      });

      Schema::create('tb_users_throttle', function(Blueprint $table) {
        $table->increments('id');
        $table->integer('user_id')->unsigned()->nullable();
        $table->string('ip_address')->nullable();
        $table->integer('attempts')->default(0);
        $table->boolean('suspended')->default(0);
        $table->boolean('banned')->default(0);
        $table->string('banned_by')->nullable();
        $table->timestamp('last_attempt_at')->nullable();
        $table->timestamp('suspended_at')->nullable();
        $table->timestamp('banned_at')->nullable();

        $table->engine = 'InnoDB';
        $table->index('user_id');
      });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down() {
      Schema::drop('tb_users_throttle');
      Schema::drop('tb_users_groups_pivot');
      Schema::drop('tb_users_groups');
      Schema::drop('tb_users');
    }

  }
