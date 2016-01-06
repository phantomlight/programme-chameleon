<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as BaseVerifier;

class VerifyCsrfToken extends BaseVerifier
{
    /**
     * The URIs that should be excluded from CSRF verification.
     *
     * @var array
     */
    protected $except = [
        //
    ];

    public function handle($request, Closure $next)
    {
        // change to production url
    	if ($request->url() == 'http://www.programmechameleon.com/mail/receive') {
    		return $next($request);
    	}
    	return parent::handle($request, $next);
    }
  }
