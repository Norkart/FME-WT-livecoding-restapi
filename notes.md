-----DO NOT LOSE THIS FILE. IT CANNOT BE REGENERATED OR DOWNLOADED AGAIN-----
FME Server username: superuser
FME Server password: BxuDyg8wkzh3ZKfR43D2
-----NOTE: THE DATABASE PORT 5432 IS CLOSED BY DEFAULT-----
PostGIS database: gisdb
PostGIS username: dbuser
PostGIS password: oghM7a_oRhBdlGKvUJ7C




//add a WMS layer from a FME workspace
                var wmslayer = L.tileLayer.wms("https://wt-demo-norkart.fmecloud.com/fmeogc/samples/geojson_output.fmw", {
                    layers: 'railroad',
                    format: 'image/png',
                    transparent: true,
                    attribution: "FME WMS!"
                });
                wmslayer.addTo(Norkart.map);
                Norkart.map.LayerControl.addOverlay(wmslayer, 'WMS Layer');
                */