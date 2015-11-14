@extends('back.app')

@section('title')
CMS | Programme Chameleon
@stop

@section('content')
<div id="wrapper">
	@include('back.include.sidebar')
	<div id="page-wrapper" class="gray-bg">
		@include('back.include.header')
		<div class="wrapper wrapper-content">
			<div class="row">
				<div class="col-lg-8">
					<div class="ibox float-e-margins">
						<div class="ibox-title">
							<h5><i class="fa fa-pencil"></i> Edit Pages</h5>
							<div class="ibox-tools">
								<a class="collapse-link">
									<i class="fa fa-chevron-up"></i>
								</a>
							</div>
						</div>

						<div class="ibox-content">
							<form role="form" data-parsley-validate onsubmit="return false;">
								<div class="form-group">
									<label>Page to Edit</label>
									<select class="form-control" name="page_id">
										<option>-- List of CMS Pages --</option>
									</select>
								</div>

								<div class="form-group">
									<label>Content</label>
									<div class="summernote">Edit something here</div>
									<span class="help-block">
										<a href="#"><i class="fa fa-eye"></i> preview</a>
									</span>
								</div>

								<button type="submit" class="btn sc-button">
									<span class="btn-preloader"><i class="fa fa-spinner fa-spin"></i> Updating..</span>
									<span>Update</span>
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
@stop