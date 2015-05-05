


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
