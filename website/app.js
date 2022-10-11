/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();

let baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
let apiKey = "&appid=cb434779c5eb05848082f73a5b4e8d4a";

document.getElementById("generate").addEventListener("click", fristEvent);

function fristEvent() {
  let zipValue = document.getElementById("zip").value;
  let feelings = document.getElementById("feelings").value;
  if (!zipValue) {
    alert("please inter zip code");
  } else {
    getW(baseURL, zipValue, apiKey)
      .then(function (data) {
        console.log(data);
        postD("/postdata", {
          date: newDate,
          temp: data.main.temp,
          content: feelings,
        });
      })
      .then(() => updateUI());
  }
}

// GET WEATHER
let getW = async (baseURL, zip, Key) => {
  let res = await fetch(baseURL + zip + Key);
  try {
    let data = await res.json();
    return data;
  } catch (error) {
    console.log(error, "error");
  }
};

// post data
let postD = async function (url = "", data = {}) {
  console.log(data);
  let resp = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    let newData = await resp.json();
    console.log(newData);
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};

// update

let updateUI = async () => {
  let req = await fetch("/data");
  try {
    let allD = await req.json();
    console.log(allD);
    document.getElementById("date").innerHTML = `Date:${allD.date}`;
    document.getElementById("temp").innerHTML = `Temperature:${allD.temp}`;
    document.getElementById("content").innerHTML = `Feeling:${allD.content}`;
  } catch (error) {
    console.log("error", error);
  }
};
