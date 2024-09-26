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

/**
 * Custom Buttom to Control
 */
// 自定义按钮控件
L.Control.io = L.Control.extend({
    onAdd: function (map) {
        const button = L.DomUtil.create("div", "leaflet-io leaflet-bar leaflet-control");
        button.innerHTML = 'iostyle';
        button.onclick = function () {
            alert('按钮被点击！');
        };
        return button;
    },

});

