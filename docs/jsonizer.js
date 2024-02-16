async function fetcher(filename) {
  try {
    const response = await fetch(filename);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Re-throwing the error to propagate it further
  }
}

const dd = new Date();
let month = (dd.getMonth() + 1).toString().padStart(2, "0");
let day = dd.getDate().toString().padStart(2, "0");
let year = dd.getFullYear();
var LEAP_YEAR = (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;

var file_to_fetch;
if (LEAP_YEAR) {
  file_to_fetch = "cauldron_data_leap.json";
} else {
  file_to_fetch = "cauldron_data.json";
}

fetcher(file_to_fetch).then((cauldron_json) => {
  var max_days = 7;
  for (var d = 0; d < cauldron_json.length; d++) {
    if (cauldron_json[d][0] == month && cauldron_json[d][1] == day) {
      break;
    }
  }

  var e_date = document.getElementById("date");
  var e_forecast = document.getElementById("forecast");

  for (var n = 0; n < max_days; n++) {
    let i = (d + n) % cauldron_json.length;
    let month_i = cauldron_json[i][0];
    let day_i = cauldron_json[i][1];
    if (month_i == "02" && day_i == "29" && LEAP_YEAR == false) {
      max_days++;
      continue;
    }
    let contents_i = cauldron_json[i][2];
    date_str = "<td><h2>" + month_i + "/" + day_i + "</h2>";
    e_date.innerHTML += date_str;
    var html_str = "<td>";
    if (contents_i == 0) {
      html_str += "<img src='vl.png'><br><h3>Void Liquid</h3>";
    } else {
      html_str += "<img src='air.png'><br><h3>Empty</h3>";
    }
    html_str += "<br>51%</td>";

    e_forecast.innerHTML += html_str;
  }
});
