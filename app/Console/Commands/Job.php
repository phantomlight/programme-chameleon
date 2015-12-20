<?php

namespace App\Console\Commands;

use App\Models\Job\Eloquent\JobModel;
use Illuminate\Console\Command;
use Carbon\Carbon;

class Job extends Command {
	    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'job';

  /**
   * The console command description.
   *
   * @var string
   */
  protected $description = 'Check job daily for non-vip company, deactivate job when created_at is equal to job duration';

  /**
   * Execute the console command.
   *
   * @return mixed
   */
	public function handle() {
		$model = new JobModel;
		$jobs = $model->all();
		
		if (count($jobs)) {
			foreach ($jobs as $job) {
				switch ($job->duration) {
					case '1': // 1 week
						$today = Carbon::now();
						$jobDurationDate = $job->created_at->addDays(7);
						if ($jobDurationDate->lte($today)) {
							$job->is_active = false;
							$job->save();
						}
						break;

					case '2': // 1 month
						$today = Carbon::now();
						$jobDurationDate = $job->created_at->addMonth();
						if ($jobDurationDate->lte($today)) {
							$job->is_active = false;
							$job->save();
						}
						break;

					case '999': // unlimited
						continue;
						break;

					default: // not a job duration registered? Remove them.
						$job->delete();
						break;
				}
			}	
		}
	}
	
}