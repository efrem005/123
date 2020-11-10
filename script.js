function dallas() {
  const url = "https://php-array-app.herokuapp.com/get.php";

  let data = {
    name: "temp",
    count: "50",
    value: "*",
  };

  ajax(url, "POST", login, data);

  function login(result) {
    let php = JSON.parse(result);
    console.log(php);
    document.querySelectorAll(
      ".rounded-pill"
    )[1].innerText = `${php[0]["value"]} С°`;
    // document.querySelectorAll(
    //   ".card-text"
    // )[0].innerText = `Температура: ${php[0]["value"]} С°`;

    for (let i = 0; i < php.length; i++) {
      if (i == 0) {
        for (let a = 0; a < 1; a++) {
          let out = "";
          out += `<div class="col-lg-4 col-md-6 col-sm-6 myapp">`;
          out += `<div class="card border-secondary mb-3">`;
          out += `<div class="card-header bg-success text-white">BME 280</div>`;
          out += `<div class="card-body">`;
          out += `<h5 class="card-title">${php[i]["date"]}</h5>`;
          out += `<h6 class="card-text">Температура: ${php[0]["value"]} С°</h6>`;
          // out += `<h6 class="card-text">Влажность: ' . $tempbme[$a]['humidity'] . ' %</h6>`;
          // out += `<h6 class="card-text">Давление: ' . $tempbme[$a]['pressure'] . ' мм рт. ст</h6>`;
          out += `</div>`;
          out += `</div>`;
          out += `</div>`;
          document
            .querySelector(".justify-content-center")
            .insertAdjacentHTML("afterend", out);
        }
      } else {
        out = "";
        out += `<div class="col-lg-4 col-md-6 col-sm-6">`;
        out += `<div class="card border-info mb-3">`;
        out += `<div class="card-header bg-info text-white">BME 280</div>`;
        out += `<div class="card-body">`;
        out += `<h5 class="card-title">${php[i]["date"]}</h5>`;
        out += `<h6 class="card-text">Температура: ${php[i]["value"]} С°</h6>`;
        // out += `<h6 class="card-text">Влажность: ${} %</h6>`;
        // out += `<h6 class="card-text">Давление: ${} мм рт. ст</h6>`;
        out += `</div>`;
        out += `</div>`;
        out += `</div>`;
        document.querySelector(".myapp").insertAdjacentHTML("afterend", out);
      }
    }
  }
}
function bme280() {
  const url = "https://php-array-app.herokuapp.com/get.php";

  let data = {
    name: "bme280",
    count: "50",
    value: "*",
  };

  ajax(url, "POST", login, data);

  function login(result) {
    let php = JSON.parse(result);
    document.querySelectorAll(
      ".rounded-pill"
    )[0].innerText = `${php[0]["temp"]} С°`;
    console.log(php);
    // document.querySelectorAll(
    //   ".card-text"
    // )[1].innerText = `Температура: ${php[0]["temp"]} С°`;
    // document.querySelectorAll(
    //   ".card-text"
    // )[2].innerText = `Влажность: ${php[0]["humidity"]} %`;
    // document.querySelectorAll(
    //   ".card-text"
    // )[3].innerText = `Давление: ${php[0]["pressure"]} мм рт. ст`;
  }
}

dallas();
bme280();
