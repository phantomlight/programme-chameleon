<?php namespace App\Models\Deal\Eloquent;

use Eloquent;
use App\Models\Deal\Interfaces\DealCategoryModelInterface;

class DealCategoryModel extends Eloquent implements DealCategoryModelInterface {
	
	protected $table = 'tb_deal_categories';
	protected $hidden = [];
	protected $guarded = [];
	protected static $dealModel = 'App\Models\Deal\Eloquent\DealModel';

	public function deals() {
		return $this->hasMany(static::$dealModel);
	}

	public function delete() {
		$this->deals()->delete();
		return parent::delete();
	}

	public function scopeSubCategory($query) {
		return $query->where('is_parent', '!=', 1);
	}

	public function scopeParentCategory($query) {
		return $query->where('is_parent', 1);
	}

	public function findById($id) {
		return self::where('id', $id)->first();
	}

	public function findByQuery(array $data) {
		$model = new self;

		if (isset($data['search'])) {
			$model = self::where('name', 'like', '%' . $data['search'] . '%');
		}

		if (isset($data['limit'])) {
			$model->take($data['limit']);
		}
		else {
			$model->take(100);
		}

		$model->orderBy('created_at', 'desc');
		return $model->get();
	}

	public function removeById($id) {
		$model = self::where('id', $id)->first();
		if ($model) {
			if ($model->is_parent === '1') {
				$child = self::where('parent_id', $model->id)->get();
				if ($child->count() > 0) {
					foreach ($child as $c) {
						$c->is_parent = true;
						$c->parent_id = 0;
						$c->save();
					}
				}
			}
			$model->delete();
		}
		else {
			throw new \Exception("Data not found!", 1);
		}
		return;
	}

}