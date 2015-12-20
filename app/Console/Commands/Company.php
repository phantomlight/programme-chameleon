<?php

namespace App\Console\Commands;

use App\Models\Company\Eloquent\CompanyModel;
use Illuminate\Console\Command;
use Carbon\Carbon;

class Company extends Command {
	    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'company';

  /**
   * The console command description.
   *
   * @var string
   */
  protected $description = 'Runs daily. Check and update VIP status of company.';

  /**
   * Execute the console command.
   *
   * @return mixed
   */
	public function handle() {
		$model = new CompanyModel;
		$companies = $model->all();

		if (count($companies) > 0) {
			foreach ($companies as $company) {
				if ($company->is_vip) {
					$vipEnd = Carbon::createFromFormat('Y-m-d H:i:s', $company->vip_end);
					if ($vipEnd->isToday()) {
						$company->vip_start = '0000-00-00 00:00:00';
						$company->vip_end = '0000-00-00 00:00:00';
						$company->is_vip = false;
						$company->save();
					}
				}
			}
		}
	}
	
}