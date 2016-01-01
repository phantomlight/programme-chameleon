<?php

use Carbon\Carbon;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;

class SiteSeeder extends Seeder {

	protected $table = 'tb_site'; // If you still need explanation, get out of here

	public function run() {
		$siteServices = [
			1 => [
				'title'	=>	'Consulting',
				'key'		=>	'service',
				'description'	=>	'<p>Utilise our extensive experience in delivering complex IT and Change Programmes and Projects with reliable, experienced consultants.</p>',
				'file'	=>	asset('assets/img/sample/image1.jpg'),
			],
			2	=>	[
				'title'	=>	'Training',
				'key'		=>	'service',
				'description'	=>	'<p>We offer on-site, focused, accredited Prince 2 and AGILE Ttraining.</p>',
				'file'	=>	asset('assets/img/sample/image2.jpg'),
			],
			3 => [
				'title'	=>	'Free Resources',
				'key'		=>	'service',
				'description'	=>	'<p>We offer on-site, focused, accredited Prince 2 and AGILE Ttraining.</p>',
				'file'	=>	asset('assets/img/sample/image3.jpg'),
			],
			4 => [
				'title'	=>	'Employers or Job Seekers?',
				'key'		=>	'service',
				'file'	=>	asset('assets/img/sample/image4.jpg'),
				'description'	=>	'<p>If you are employers, submit your vancany <a href="' . route('company.job.post') . '">here</a></p><p>If you are job seekers, submit your CV <a href="' . route('contractor.account') . '">here</a></p>',
			]
		];

		if ( ! $table = \DB::table($this->table)) {
			return 'Table not found.';
		}

		if (isset($siteServices)) {
			foreach ($siteServices as $service) {
				$service['created_at'] = Carbon::now();
				$service['updated_at'] = Carbon::now();
				$table->insert($service);
			}
		}
		
		if (isset($freeResources)) {
			foreach ($freeResources as $resource) {
				$resource['created_at'] = Carbon::now();
				$resource['updated_at'] = Carbon::now();
				$table->insert($resource);
			}
		}

		return 'Success!';
	}
}