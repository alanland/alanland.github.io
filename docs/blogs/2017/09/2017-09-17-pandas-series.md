---
title:  "Pandas: Series"
date:   2017-09-17 03:57:37 +0000
tags:   [python, pandas]
---

## 安裝

```shell
conda install pandas
# or
pip install pandas
```

```python
from pandas import Series, DataFrame
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
```

## Series

Series是一个一维的类似的数组对象，包含一个数组的数据（任何NumPy的数据类型）和一个与数组关联的数据标签，被叫做 索引 。最简单的Series是由一个数组的数据构成:

```python
In [1]: import pandas as pd
In [2]: from pandas import Series, DataFrame
In [3]: s = Series([4, 7, -5, 3])
In [4]: s
Out[4]: 
0    4
1    7
2   -5
3    3
dtype: int64
In [5]: s.values
Out[5]: array([ 4,  7, -5,  3])
In [6]: s.index
Out[6]: RangeIndex(start=0, stop=4, step=1)
In [7]: s2 = Series([4, 7, -5, 3], index=['d', 'b', 'a', 'c'])
In [8]: s2
Out[8]: 
d    4
b    7
a   -5
c    3
dtype: int64
In [9]: s2.index
Out[9]: Index(['d', 'b', 'a', 'c'], dtype='object')
In [10]: s2['d']
Out[10]: 4
In [11]: s2[['b','a']]
Out[11]: 
b    7
a   -5
dtype: int64
In [12]: s2[s2>0]
Out[12]: 
d    4
b    7
c    3
dtype: int64
In [13]: s2*2
Out[13]: 
d     8
b    14
a   -10
c     6
dtype: int64
In [15]: import numpy as np
In [16]: np.exp(s2)
Out[16]: 
d      54.598150
b    1096.633158
a       0.006738
c      20.085537
dtype: float64
In [17]: 'b' in s2
Out[17]: True
In [18]: 'h' in s2
Out[18]: False
In [19]: sdata = {'Ohio': 35000, 'Texas': 71000, 'Oregon': 16000, 'Utah': 5000}
In [20]: s3 = Series(sdata)
In [21]: s3
Out[21]: 
Ohio      35000
Oregon    16000
Texas     71000
Utah       5000
dtype: int64
In [23]: states = ['California', 'Ohio', 'Oregon', 'Texas']
In [25]: s4 = Series(states)
In [27]: s4
Out[27]: 
0    California
1          Ohio
2        Oregon
3         Texas
dtype: object
In [28]: s4 = Series(sdata, index=states)
In [29]: s4
Out[29]: 
California        NaN
Ohio          35000.0
Oregon        16000.0
Texas         71000.0
dtype: float64
In [30]: pd.isnull(s4)
Out[30]: 
California     True
Ohio          False
Oregon        False
Texas         False
dtype: bool
In [31]: pd.notnull(s4)
Out[31]: 
California    False
Ohio           True
Oregon         True
Texas          True
dtype: bool
In [32]: s4.isnull()
Out[32]: 
California     True
Ohio          False
Oregon        False
Texas         False
dtype: bool
In [33]: s4.name = 'population'
In [34]: s4.index.name = 'state'
In [35]: s4
Out[35]: 
state
California        NaN
Ohio          35000.0
Oregon        16000.0
Texas         71000.0
Name: population, dtype: float64
In [36]: dir(s4)
Out[36]: 
['T',
 '_AXIS_ALIASES',
 '_AXIS_IALIASES',
 '_AXIS_LEN',
 '_AXIS_NAMES',
 '_AXIS_NUMBERS',
 '_AXIS_ORDERS',
 '_AXIS_REVERSED',
 '_AXIS_SLICEMAP',
 '__abs__',
 '__add__',
 '__and__',
 '__array__',
 '__array_prepare__',
 '__array_priority__',
 '__array_wrap__',
 '__bool__',
 '__bytes__',
 '__class__',
 '__contains__',
 '__copy__',
 '__deepcopy__',
 '__delattr__',
 '__delitem__',
 '__dict__',
 '__dir__',
 '__div__',
 '__divmod__',
 '__doc__',
 '__eq__',
 '__finalize__',
 '__float__',
 '__floordiv__',
 '__format__',
 '__ge__',
 '__getattr__',
 '__getattribute__',
 '__getitem__',
 '__getstate__',
 '__gt__',
 '__hash__',
 '__iadd__',
 '__imul__',
 '__init__',
 '__init_subclass__',
 '__int__',
 '__invert__',
 '__ipow__',
 '__isub__',
 '__iter__',
 '__itruediv__',
 '__le__',
 '__len__',
 '__long__',
 '__lt__',
 '__mod__',
 '__module__',
 '__mul__',
 '__ne__',
 '__neg__',
 '__new__',
 '__nonzero__',
 '__or__',
 '__pow__',
 '__radd__',
 '__rand__',
 '__rdiv__',
 '__reduce__',
 '__reduce_ex__',
 '__repr__',
 '__rfloordiv__',
 '__rmod__',
 '__rmul__',
 '__ror__',
 '__round__',
 '__rpow__',
 '__rsub__',
 '__rtruediv__',
 '__rxor__',
 '__setattr__',
 '__setitem__',
 '__setstate__',
 '__sizeof__',
 '__str__',
 '__sub__',
 '__subclasshook__',
 '__truediv__',
 '__unicode__',
 '__weakref__',
 '__xor__',
 '_accessors',
 '_add_numeric_operations',
 '_add_series_only_operations',
 '_add_series_or_dataframe_operations',
 '_agg_by_level',
 '_agg_doc',
 '_aggregate',
 '_aggregate_multiple_funcs',
 '_align_frame',
 '_align_series',
 '_allow_index_ops',
 '_at',
 '_binop',
 '_box_item_values',
 '_builtin_table',
 '_can_hold_na',
 '_check_inplace_setting',
 '_check_is_chained_assignment_possible',
 '_check_percentile',
 '_check_setitem_copy',
 '_clear_item_cache',
 '_clip_with_scalar',
 '_consolidate',
 '_consolidate_inplace',
 '_construct_axes_dict',
 '_construct_axes_dict_for_slice',
 '_construct_axes_dict_from',
 '_construct_axes_from_arguments',
 '_constructor',
 '_constructor_expanddim',
 '_constructor_sliced',
 '_convert',
 '_create_indexer',
 '_cython_table',
 '_dir_additions',
 '_dir_deletions',
 '_expand_axes',
 '_from_axes',
 '_get_axis',
 '_get_axis_name',
 '_get_axis_number',
 '_get_axis_resolvers',
 '_get_block_manager_axis',
 '_get_bool_data',
 '_get_cacher',
 '_get_index_resolvers',
 '_get_item_cache',
 '_get_numeric_data',
 '_get_values',
 '_get_values_tuple',
 '_get_with',
 '_gotitem',
 '_iat',
 '_iget_item_cache',
 '_iloc',
 '_index',
 '_indexed_same',
 '_info_axis',
 '_info_axis_name',
 '_info_axis_number',
 '_init_mgr',
 '_internal_names',
 '_internal_names_set',
 '_is_builtin_func',
 '_is_cached',
 '_is_cython_func',
 '_is_datelike_mixed_type',
 '_is_mixed_type',
 '_is_numeric_mixed_type',
 '_is_view',
 '_ix',
 '_ixs',
 '_loc',
 '_make_cat_accessor',
 '_make_dt_accessor',
 '_make_str_accessor',
 '_maybe_cache_changed',
 '_maybe_update_cacher',
 '_metadata',
 '_needs_reindex_multi',
 '_obj_with_exclusions',
 '_protect_consolidate',
 '_reduce',
 '_reindex_axes',
 '_reindex_axis',
 '_reindex_indexer',
 '_reindex_multi',
 '_reindex_with_indexers',
 '_repr_data_resource_',
 '_repr_latex_',
 '_reset_cache',
 '_reset_cacher',
 '_selected_obj',
 '_selection',
 '_selection_list',
 '_selection_name',
 '_set_as_cached',
 '_set_axis',
 '_set_axis_name',
 '_set_is_copy',
 '_set_item',
 '_set_labels',
 '_set_name',
 '_set_subtyp',
 '_set_values',
 '_set_with',
 '_set_with_engine',
 '_setup_axes',
 '_shallow_copy',
 '_slice',
 '_stat_axis',
 '_stat_axis_name',
 '_stat_axis_number',
 '_try_aggregate_string_function',
 '_typ',
 '_unpickle_series_compat',
 '_update_inplace',
 '_validate_dtype',
 '_values',
 '_where',
 '_xs',
 'abs',
 'add',
 'add_prefix',
 'add_suffix',
 'agg',
 'aggregate',
 'align',
 'all',
 'any',
 'append',
 'apply',
 'argmax',
 'argmin',
 'argsort',
 'as_blocks',
 'as_matrix',
 'asfreq',
 'asobject',
 'asof',
 'astype',
 'at',
 'at_time',
 'autocorr',
 'axes',
 'base',
 'between',
 'between_time',
 'bfill',
 'blocks',
 'bool',
 'clip',
 'clip_lower',
 'clip_upper',
 'combine',
 'combine_first',
 'compound',
 'compress',
 'consolidate',
 'convert_objects',
 'copy',
 'corr',
 'count',
 'cov',
 'cummax',
 'cummin',
 'cumprod',
 'cumsum',
 'data',
 'describe',
 'diff',
 'div',
 'divide',
 'dot',
 'drop',
 'drop_duplicates',
 'dropna',
 'dtype',
 'dtypes',
 'duplicated',
 'empty',
 'eq',
 'equals',
 'ewm',
 'expanding',
 'factorize',
 'ffill',
 'fillna',
 'filter',
 'first',
 'first_valid_index',
 'flags',
 'floordiv',
 'from_array',
 'from_csv',
 'ftype',
 'ftypes',
 'ge',
 'get',
 'get_dtype_counts',
 'get_ftype_counts',
 'get_value',
 'get_values',
 'groupby',
 'gt',
 'hasnans',
 'head',
 'hist',
 'iat',
 'idxmax',
 'idxmin',
 'iloc',
 'imag',
 'index',
 'interpolate',
 'is_copy',
 'is_monotonic',
 'is_monotonic_decreasing',
 'is_monotonic_increasing',
 'is_unique',
 'isin',
 'isnull',
 'item',
 'items',
 'itemsize',
 'iteritems',
 'ix',
 'keys',
 'kurt',
 'kurtosis',
 'last',
 'last_valid_index',
 'le',
 'loc',
 'lt',
 'mad',
 'map',
 'mask',
 'max',
 'mean',
 'median',
 'memory_usage',
 'min',
 'mod',
 'mode',
 'mul',
 'multiply',
 'name',
 'nbytes',
 'ndim',
 'ne',
 'nlargest',
 'nonzero',
 'notnull',
 'nsmallest',
 'nunique',
 'pct_change',
 'pipe',
 'plot',
 'pop',
 'pow',
 'prod',
 'product',
 'ptp',
 'put',
 'quantile',
 'radd',
 'rank',
 'ravel',
 'rdiv',
 'real',
 'reindex',
 'reindex_axis',
 'reindex_like',
 'rename',
 'rename_axis',
 'reorder_levels',
 'repeat',
 'replace',
 'resample',
 'reset_index',
 'reshape',
 'rfloordiv',
 'rmod',
 'rmul',
 'rolling',
 'round',
 'rpow',
 'rsub',
 'rtruediv',
 'sample',
 'searchsorted',
 'select',
 'sem',
 'set_axis',
 'set_value',
 'shape',
 'shift',
 'size',
 'skew',
 'slice_shift',
 'sort_index',
 'sort_values',
 'sortlevel',
 'squeeze',
 'std',
 'strides',
 'sub',
 'subtract',
 'sum',
 'swapaxes',
 'swaplevel',
 'tail',
 'take',
 'to_clipboard',
 'to_csv',
 'to_dense',
 'to_dict',
 'to_excel',
 'to_frame',
 'to_hdf',
 'to_json',
 'to_latex',
 'to_msgpack',
 'to_period',
 'to_pickle',
 'to_sparse',
 'to_sql',
 'to_string',
 'to_timestamp',
 'to_xarray',
 'tolist',
 'transform',
 'transpose',
 'truediv',
 'truncate',
 'tshift',
 'tz_convert',
 'tz_localize',
 'unique',
 'unstack',
 'update',
 'valid',
 'value_counts',
 'values',
 'var',
 'view',
 'where',
 'xs']

In [37]: 
```

- http://pda.readthedocs.io/en/latest/chp5.html

---
END
