# Handling Data

## PostGIS Import example

``` bash
DB_NAME="mapnik-tests"
createdb $DB_NAME
psql -d $DB_NAME -c "create extension if not exists postgis"
ogr2ogr -f "PostgreSQL" PG:"host=localhost user=`whoami` dbname=$DB_NAME" data/world_merc.shp -nlt POLYGON
```

## Finding EPSG of data

### Using the [SRS modules](https://github.com/mapbox/node-srs)

``` bash
node -e "console.log(require('srs').parse(require('fs').readFileSync('data/world_merc.prj')))"
```
