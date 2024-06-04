export function getWMSCapa(capa){
    return `http://200.121.128.102:8080/geoserver/jockey/wms?service=WMS&version=1.1.0&request=GetMap&layers=jockey:jockey_p1&styles=&bbox={bbox-epsg-3857}&width=256&height=256&srs=EPSG:3857&format=image/png`
}

export function validarToken(token){
    
}