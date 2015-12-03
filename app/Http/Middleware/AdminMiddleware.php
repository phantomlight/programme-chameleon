<?php namespace App\Http\Middleware;

use Closure;

class AdminMiddleware {

	/**
	 * Handle an incoming request.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @param  \Closure  $next
	 * @return mixed
	 */
	public function handle($request, Closure $next) {
		if ( ! \User::check()) {
			return redirect('admin/login')->with('flashMessage', ['class' => 'danger', 'message' => 'You have to be logged in first.']);
		}

		$user = \User::getUser();

		if ( ! $user->hasAccess('admin')) {
			\User::logout();
			return redirect('admin/login')->with('flashMessage', ['class' => 'danger', 'message' => 'You do not have access to this page.']);
		}
		
		return $next($request);
	}

}
