<?php namespace App\Http\Middleware;

use Closure;

class MerchantMiddleware {

	/**
	 * Handle an incoming request.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @param  \Closure  $next
	 * @return mixed
	 */
	public function handle($request, Closure $next) {
		if ( ! \User::check()) {
			return redirect()->route('merchant.login')->with('flashMessage', ['class' => 'danger', 'message' => 'Anda harus login terlebih dahulu.']);
		}

		$user = \User::getUser();

		if ( ! $user->hasAccess('merchant')) {
			\User::logout();
			return redirect()->route('merchant.login')->with('flashMessage', ['class' => 'danger', 'message' => 'Anda tidak punya hak akses untuk halaman ini.']);
		}
		
		return $next($request);
	}

}
