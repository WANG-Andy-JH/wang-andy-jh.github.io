/**
 * Load Map
 */
// Default location
var dLat = 29.72245;
var dLon = 106.60409;

const map = L.map('map').setView([dLat, dLon], 18); // Lat Lon Scale
const drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);

// Map source
const imageURL = "http://t0.tianditu.gov.cn/img_w/wmts?" +
      "SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles" +
      "&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}" +
      "&tk=e6372a5333c4bac9b9ef6097453c3cd6";

var tdt = L.tileLayer(imageURL, {
            maxZoom: 19,
            attribution: '© TIANDITU'
        });

L.control.layers({
    '天地图': tdt.addTo(map),
    "Open Street": L.tileLayer('http://openstreetmap.org/copyright">OpenStreetMap</a> contributors', {
        attribution: 'OpenStreetMap'
    })
    }, 
    { '显示绘制': drawnItems }, 
    { position: 'topleft', collapsed: false }).addTo(map);

/**
 * Painter
 */
const drawControl = new L.Control.Draw({
    // position: 'bottomright',
    edit: {
        featureGroup: drawnItems,
        poly: {
            allowIntersection: false
        }
    },
    draw: {
        polygon: {
            allowIntersection: false,
            showArea: true
        },
        polyline: false, 
        circlemarker: false
    }
});
map.addControl(drawControl);

/**
 * Marker
 */
// Default marker
L.marker([dLat, dLon]).addTo(map)
    .bindPopup('重庆地质矿产研究院')
    .openPopup();

// Popup windows
function addMarker(lat, lng) {
    const marker = L.marker([lat, lng]).addTo(map);
    marker.bindPopup(`纬度: ${lat.toFixed(5)}, 经度: ${lng.toFixed(5)}`);
}

map.on(L.Draw.Event.CREATED, function (event) {
    const layer = event.layer;
    drawnItems.addLayer(layer);

    // Only marker emit
    if (event.layerType === 'marker') {
        const latLng = layer.getLatLng();
        addMarker(latLng.lat, latLng.lng);
    }
});

/**
 * Loaction
 */

var locateControl = L.control.locate({
    position: 'topleft', // 控件位置
    drawCircle: true,    // 是否绘制定位圆圈
    follow: false,       // 是否跟随用户位置
    setView: true,       // 定位后是否设置视图
    keepCurrentZoomLevel: true, // 保持当前缩放级别
    
}).addTo(map);

// 定位当前位置
function locateUser() {
    map.locate({setView: true, maxZoom: 16});
}

// 处理定位成功
map.on('locationfound', function(e) {
    L.marker(e.latlng).addTo(map)
        .bindPopup("您在这里！").openPopup();
});

// 处理定位失败
map.on('locationerror', function(e) {
    alert(e.message);
});

// 调用定位函数
locateUser();

/**
 * Export
 */

function exportGeoJSON() {
    const geojson = drawnItems.toGeoJSON();
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(geojson));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "map-drawing.geojson");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();

    alert('导出成功！');
}

/**
 * Import
 */

function importGeoJSON() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    if (!file) {
        alert("请先选择一个GeoJSON文件。");
        return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
        const geojsonData = JSON.parse(e.target.result);
        L.geoJSON(geojsonData).addTo(drawnItems);
    };
    reader.readAsText(file);
}