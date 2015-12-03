<?php

use Carbon\Carbon;
use Illuminate\Database\Seeder;

class IndustrySeeder extends Seeder {

	protected $data = [
		'IT', 'Engineering', 'Marketing', 'Other',
	];

	public function run() {
		// foreach ($this->data as $d) {
		// 	$dbData = ['title'	=>	$d, 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()];
		// 	\DB::table('tb_industry')->insert($dbData);
		// }

		dd(new \Company);
	}

}