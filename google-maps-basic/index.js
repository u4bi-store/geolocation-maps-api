var map,
    marker = {
        root  : null,
        icon  : null,
        pos   : null
    };

var 
    image_path = 'https://avatars1.githubusercontent.com/u/21367010?v=3&s=460'; // 마커로 사용될 이미지

function initMap(){ // 인잇
    
    map = new google.maps.Map(document.getElementById('map')); // 맵 객체 생성

    if(navigator.geolocation){ /* geo 객체의 사용이 가능한지
        https://developer.mozilla.org/ko/docs/WebAPI/Using_geolocation */
        
        navigator.geolocation.getCurrentPosition(function(position) { // 사용자의 위치를 얻어 position으로 반환

            marker.icon = new google.maps.MarkerImage(image_path, null, null, null, new google.maps.Size(50 , 50)); // 마커 지정

            marker.position = { // 마커 아이콘이 세겨질 위치
                lat: position.coords.latitude, // 위도
                lng: position.coords.longitude // 경도
            };

            map.setCenter(marker.position); // 마커의 위치를 맵의 중심으로 위치
            map.setZoom(18); // 맵의 줌 비율을 18로 설정
            /* 15 : 도로
                20 : 건물
            */

            marker.root = new google.maps.Marker({ // 마커에 대한 구성 생성
                position: marker.position, // 마커 아이콘의 정의
                icon  : marker.icon // 마커 아이콘 정의
            });
            
            marker.root.setMap(map); // 마커가 세겨질 맵 지정

        }, function() { // 만약 geolocation 설정을 사용자가 허가되지 않아 가져오지 못할 때
            console.log('위치 정보를 가져오지 못했습니다.');
        });

    } else console.log('현재 브라우저에서 지원을 하지 않습니다.'); // 만약 웹 환경에 의해서 사용이 불가능할 때
}