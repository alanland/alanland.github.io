---
title:  "GeoJson and TopoJson"
date:   2017-04-19 23:17:49 +0000
img:  docker-jekyll.jpg
description: GeoJson and TopoJson
tags:   [js, d3, geojson, topjson]
---
## GeoJson

GeoJson是一种描述地理空间信息的数据格式。对JSON数据结构进行了定义，专门用来表示地理信息。

有如下类型的对象，每个对象都有必须定义的元素：

- `Point`： 点
 - `coordinates`
- `MultiPoint`： 多点
 - `coordinates`
- `LineString`： 线
 - `coordinates`
- `MultiLineString`： 多线
 - `coordinates`
- `Polygon`： 面
 - `coordinates`
- `MultiPolygon`： 多面
 - `coordinates`
- `GeometryCollection`： 几何体集合
 - `geometries`，表示GeoJSON几何对象的数组
- `Feature`： 特征
 - `geometry`表示GeoJSON几何对象
 - `properties`
- `FeatureCollection`： 特征集合
 - `features`

建议花几分钟看一下wikipedia的页面： [https://en.wikipedia.org/wiki/GeoJSON](https://en.wikipedia.org/wiki/GeoJSON)

### 样例
```json
{
  "type": "FeatureCollection",
  "features": [
    { "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [102.0, 0.5]},
      "properties": {
        "prop0": "value0"
      }
    },
    { "type": "Feature",
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [102.0, 0.0], [103.0, 1.0], [104.0, 0.0], [105.0, 1.0]
        ]
      },
      "properties": {
        "prop0": "value0",
        "prop1": 0.0
      }
    },
    { "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [ [100.0, 0.0], [101.0, 0.0], [101.0, 1.0],
            [100.0, 1.0], [100.0, 0.0] ]
        ]
      },
      "properties": {
        "prop0": "value0",
        "prop1": {"this": "that"}
      }
    }
  ]
}
```

## TopoJson

TopoJson是GeoJSON按拓扑学编码后的扩展形式，由D3的作者Mike Bostock制定。

相比 GeoJSON 直接使用 Polygon、Point 之类的几何体来表示图形的方法，TopoJSON 中的每一个几何体都是通过将共享边（被称为arcs）整合后组成的。

TopoJSON 消除了冗余，文件大小缩小了 80%。

- wikipedia定义： [https://en.wikipedia.org/wiki/GeoJSON#TopoJSON](https://en.wikipedia.org/wiki/GeoJSON#TopoJSON)
- github: [https://github.com/topojson/topojson](https://github.com/topojson/topojson)

### 示例

```json
{
  "type":"Topology",
  "transform":{
    "scale": [1,1],
    "translate": [0,0]
  },
  "objects":{
    "two-squares":{
      "type": "GeometryCollection",
      "geometries":[
        {"type": "Polygon", "arcs":[[0,1]],"properties": {"name": "Left_Polygon" }},
        {"type": "Polygon", "arcs":[[2,-1]],"properties": {"name": "Right_Polygon" }}
      ]
    },
    "one-line": {
      "type":"GeometryCollection",
      "geometries":[
        {"type": "LineString", "arcs": [3],"properties":{"name":"Under_LineString"}}
      ]
    },
    "two-places":{
      "type":"GeometryCollection",
      "geometries":[
        {"type":"Point","coordinates":[0,0],"properties":{"name":"Origine_Point"}},
        {"type":"Point","coordinates":[0,-1],"properties":{"name":"Under_Point"}}
      ]
    }
  },
  "arcs": [
    [[1,2],[0,-2]],
    [[1,0],[-1,0],[0,2],[1,0]],
    [[1,2],[1,0],[0,-2],[-1,0]],
    [[0,-1],[2,0]]
  ]
}
```

## 两者区别可参考

[http://stackoverflow.com/questions/14740705/difference-between-geojson-and-topojson](http://stackoverflow.com/questions/14740705/difference-between-geojson-and-topojson)

```
If you care about file size or topology, then use TopoJSON. If you don’t care about either, then use GeoJSON for simplicity’s sake.

The primary advantage of TopoJSON is size. By eliminating redundancy and using a more efficent fixed-precision integer encoding of coordinates, TopoJSON files are often an order of magnitude smaller than GeoJSON files. The secondary advantage of TopoJSON files is that encoding the topology has useful applications, such as topology-preserving simplification (similar to MapShaper) and automatic mesh generation (as in the state-state boundaries in this example choropleth).

These advantages come at a cost: a more complex file format. In JavaScript, for example, you’d typically use the TopoJSON client library to convert TopoJSON to GeoJSON for use with standard tools such as d3.geo.path. (In Python, you can use topojson.py.) Also, TopoJSON’s integer format requires quantizing coordinates, which means that it can introduce rounding error if you’re not careful. (See the documentation for topojson -q.)

For server-side manipulation of geometries that does not require topology, then GeoJSON is probably the simpler choice. Otherwise, if you need topology or want to send the geometry over the wire to a client, then use TopoJSON
```

## 转换

- [http://jeffpaine.github.io/geojson-topojson/](http://jeffpaine.github.io/geojson-topojson/)
- [http://mapshaper.org/](http://mapshaper.org/)

## 总结
如果不在乎数据量或者程序要求，GeoJson的可读性更好（毕竟花几分钟就能看懂）。

---
END