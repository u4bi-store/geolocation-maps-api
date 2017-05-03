    /* config : 파이어베이스 API 키 등록 */
var config = { apiKey: "AIzaSyBTCzFn8Gal6MKpo9jxOhkZul0dnlK7iio", authDomain: "maps-app-7d1e0.firebaseapp.com", databaseURL: "https://maps-app-7d1e0.firebaseio.com", projectId: "maps-app-7d1e0", storageBucket: "maps-app-7d1e0.appspot.com", messagingSenderId: "1068530736710" },
    db;
    
init();

function init(){
    firebase.initializeApp(config); /* 파이어베이스 모듈내 API키 설정을 주입 */

    db = firebase.database(); /* 파이어베이스 모듈 내 데이터베이스 요소 정의 */

}


function geoMe() {

    if (!navigator.geolocation) return console.log('브라우저에서 지원하지 않음');

    navigator.geolocation.getCurrentPosition(success); /* 현재 위도경도등의 값을 success 콜백으로 받는다 */

}

function success(position){
    console.log('position', position); /* 콜백으로 반환 받은 location 값 */

    var cor = position.coords;

    var lat     = cor.latitude,  // 위도
        lon     = cor.longitude, // 경도
        acc     = cor.accuracy;  // 정확도
    
    var 
        name = document.getElementById('name').value; // 인풋내 담긴 작성값

    addGeo(name, lat, lon, acc, position.timestamp); /* 파이어베이스 디비에 등록될 값들을 인자로 넘긴다 */
    
};

function addGeo(name, lat, lon, acc, time){

    console.log(name, lat, lon, acc, time); // 이름, 위도, 경도, 정확도, 기록시간

    db.ref('users/'+name).set({ // users란 경로 내 키값을 이름으로 설정하여 내부의 값을 채운다
        /* 내부의 값들 */
        name : name,
        lat : lat,
        lon : lon,
        acc : acc,
        time : time
    });

}

function selGeo(name){ /* 파이어베이스 디비 내 등록된 요소들의 키{이름}를 추적하여 출력한다 */
    
    db.ref('users/'+name)     // 해당 주소지의 
        .once('value')        // 값들에 대해서
        .then(function(item){ // 비동기로 반환받는다

            var 
                data = item.val(); // 넘어온 데이터의 벨류
            
            console.log('이름 : ', data.name);      // 이름

            console.log('위도 : ', data.lat);       // 위도

            console.log('경도 : ', data.lon);       // 경도

            console.log('정확도 : ', data.acc);     // 정확도

            console.log('기록 시간 : ', data.time); // 기록 시간
        });
}