var geo, 
    config = { apiKey: "AIzaSyBTCzFn8Gal6MKpo9jxOhkZul0dnlK7iio", authDomain: "maps-app-7d1e0.firebaseapp.com", databaseURL: "https://maps-app-7d1e0.firebaseio.com", projectId: "maps-app-7d1e0", storageBucket: "maps-app-7d1e0.appspot.com", messagingSenderId: "1068530736710" },
    db;
    
init();

function init(){
    firebase.initializeApp(config);
    db = firebase.database();

    geo = document.getElementById("geo");
        
}


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
    
    var 
        name = document.getElementById('name').value;

    addGeo(name, lat, lon, acc, position.timestamp);
    
};

function addGeo(name, lat, lon, acc, time){
    console.log(name, lat, lon, acc, time);

    db.ref('users/'+name).set({
        name : name,
        lat : lat,
        lon : lon,
        acc : acc,
        time : time
    });

}

function selGeo(name){
    db.ref('users/'+name)
        .once('value')
        .then(function(item){

            var 
                data = item.val();
            
            console.log('이름 : ', data.name);

            console.log('위도 : ', data.lat);

            console.log('경도 : ', data.lon);

            console.log('정확도 : ', data.acc);

            console.log('기록 시간 : ', data.time);
        });
}