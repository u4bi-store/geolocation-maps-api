var 
    geo = document.getElementById("geo");

function geoMe() {

    if (!navigator.geolocation) return console.log('브라우저에서 지원하지 않음');

    navigator.geolocation.getCurrentPosition(success);

}

function success(position){
    console.log('position', position);

    var cor = position.coords;

    var lat     = cor.latitude,
        lon     = cor.longitude,
        acc     = cor.accuracy;

        console.log('위도', lat);
        console.log('경도', lon);
        console.log('정확도', acc);
};

