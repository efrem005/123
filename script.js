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
    php = php.reverse();
//     console.log(php);
    document.querySelector(
      ".rounded-pill"
    ).innerText = `${php[49]["value"]} С°`;

    for (let i = 0; i < php.length; i++) {
      if (i == 0) {
        for (let a = 0; a < 1; a++) {
          let out = "";
          out += `<div class="col-lg-4 col-md-6 col-sm-6 myapp">`;
          out += `<div class="card border-secondary mb-3">`;
          out += `<div class="card-header bg-success text-white">Dallas 18B20</div>`;
          out += `<div class="card-body">`;
          out += `<h5 class="card-title">${php[49]["date"]}</h5>`;
          out += `<h6 class="card-text">Температура: ${php[49]["value"]} С°</h6>`;
          out += `</div>`;
          out += `</div>`;
          out += `</div>`;
          document
            .querySelector(".justify-content-center")
            .insertAdjacentHTML("afterend", out);
        }
      } else {
        out = "";
        out += `<div class="col-lg-4 col-md-6 col-sm-6 myapp">`;
        out += `<div class="card border-info mb-3">`;
        out += `<div class="card-header bg-info text-white">Dallas 18B20</div>`;
        out += `<div class="card-body">`;
        out += `<h5 class="card-title">${php[i-1]["date"]}</h5>`;
        out += `<h6 class="card-text">Температура: ${php[i-1]["value"]} С°</h6>`;
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
  }
}

dallas();
