let itemsBoxDetail= [
    {
        name:"DetailIpAddress",
        title :"Ip Address",
        description :". . .",
        id:0
    },
    {
        name:"DetailLocation",
        title :"Location",
        description :". . .",
        id:1
    },
    {
        name:"DetailTimeZone",
        title :"TimeZone",
        description :". . .",
        id:2
    },
    {
        name:"DetailIsp",
        title :"Isp",
        description :". . .",
        id:3
    },

]


$("#ItemsBoxDetailIp").html(itemsBoxDetail.map((item)=>`
    <div class="d-flex flex-column items_box_detail ">
        <span class="Title_box_detail c_dark_gray">${item.title}</span>
        <span class="description_box_detail c_very_dark_gray" id=${item.name}>${item.description}</span>
    </div>
`).join(""))

const iconLoc = L.icon({
    iconUrl: './pic/icon.png',
    iconSize: [60, 60],
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
    let NewIp = $("#Input_Ip").val();
    const ipFormat = new RegExp("^((25[0-5]|(2[0-4]|1\\d|[1-9]|)\\d)\\.?\\b){4}$");
    if (ipFormat.test(NewIp)) {
        getDetail(NewIp)
        $("#Input_Ip").removeClass("errorInput")
    }
    else {
        sendNotification('error', 'Please enter the correct input!')
        console.log("error")
    }
});

async function getDetail(ip) {
    let currentStr = `https://geo.ipify.org/api/v2/country,city,vpn?apiKey=at_kZYL1fkdFWOhg6eq1lAip3FfYMsV2&ip${ip?`&ipAddress=${ip}` : ""}`
        try {
        const response = await fetch((currentStr), {
            method: "GET",
        });
        const data = await response.json();
        console.log(data)
        map.flyTo([data.location.lat, data.location.lng]);
        if (marker) {
            map.removeLayer(marker);
        }
        marker = L.marker([data.location.lat, data.location.lng], { icon: iconLoc }).addTo(map)
         $("#DetailIpAddress").text(data.ip)
         $("#DetailLocation").text(`${data.location.country}, ${data.location.city}`)
         $("#DetailTimeZone").text(data.location.timezone);
         $("#DetailIsp").text(data.isp)
        }catch (error) {
        console.error(error);
    }
}