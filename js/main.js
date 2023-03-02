const iconLoc = L.icon({
    iconUrl: './pic/icon-location.svg',
    iconSize: [35, 40],
    iconAnchor: [15, 15]
});let map  
let marker;

map = L.map('map').setView([36.5560362, 53.0524079], 13)
marker = L.marker([36.5560362, 53.0524079], { icon: iconLoc }).addTo(map);
getDetail(null , "first")

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);



$("form").submit((e) => {
    e.preventDefault();
    let Newipe = $("#Input_Ip").val();
    getDetail(Newipe)
});

async function getDetail(ip ,type) {
    let currentPuzelStr = `https://geo.ipify.org/api/v2/country,city,vpn?apiKey=at_SZilwp1HT23Q5YqPtTg9tjgu8a6SK${ip?`&ipAddress=${ip}` : ""}`
    // if(type == "first"){

        //  console.log(ip ,type)
        //  console.log(currentPuzelStr)
    // }
    // else{
        
    //     console.log(currentPuzelStr)
    //     console.log(ip ,type)
        try {
        const response = await fetch((currentPuzelStr), {
            method: "GET",
        });
        const data = await response.json();
        map.flyTo([data.location.lat, data.location.lng]);

        if (marker) {
            map.removeLayer(marker);
        }
        marker = L.marker([data.location.lat, data.location.lng], { icon: iconLoc }).addTo(map);    } 
        catch (error) {
        console.error(error);
    }
    // }
    
}