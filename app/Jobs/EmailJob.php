<?php

namespace App\Jobs;

use App\Jobs\Job;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Bus\SelfHandling;
use Illuminate\Contracts\Queue\ShouldQueue;

class EmailJob extends Job implements SelfHandling, ShouldQueue
{
    use InteractsWithQueue, SerializesModels;
    protected $data;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(array $data)
    {
        $this->data = $data;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $mailData = $this->data;
        \Mail::send($mailData['layout'], $mailData['data'], function ($message) use ($mailData) {
            $message->from($mailData['from_email'], 'Programme Chameleon Mailing Service');
            $message->to($mailData['to_email'])->subject($mailData['subject']);
        });
    }
}
