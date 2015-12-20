<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
        \App\Console\Commands\Job::class,
        \App\Console\Commands\Company::class
    ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        $schedule->command('job')
                 ->dailyAt('00:05')
                 ->withoutOverlapping();

        $schedule->command('company')
                 ->dailyAt('00:35')
                 ->withoutOverlapping();

        // Test schedule:run
        // $schedule->call(function() {
        //     \Mail::raw('Testing from mydomain', function($message)
        //     {
        //         $message->to('forddyce92@gmail.com')->from('alerts@programmechameleon.com');
        //     });
        // })->everyMinute();
    }
}
