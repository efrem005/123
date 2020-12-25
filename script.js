function fullSite(num = 50) {

  document
    .querySelector('.justify-content-center')
    .insertAdjacentHTML('afterend', landingPage)

  const spiner = document.querySelector('.spiner')
  
  const COUNT = num

  const url = 'https://php-array-app.herokuapp.com/get.php'

  const HEADERS = {
    'Content-Type': 'application/json',
  }

  const DATA = {
    name: 'temp',
    count: COUNT,
    value: '*',
  }

  fetch(url, {
    method: 'post',
    headers: HEADERS,
    body: JSON.stringify(DATA),
  })
    .then((data) => data.json())
    .then((data) => {
      spiner.remove()
      html(data)
    })
    .catch((err) => console.log(err))

  function html(dataIn) {
    let php = dataIn
    php = php.reverse()
    const maxT = php.map((el) => el.value)
    const max = Math.max(...maxT)
    const min = Math.min(...maxT)
    const live = maxT[COUNT - 1]
    const spanMax = document.querySelector('.maxTemp')
    const spanMin = document.querySelector('.minTemp')
    const spanLive = document.querySelector('.rounded-pill')

    const maxListTemp = php.find((el) => el.value == max)
    const minListTemp = php.find((el) => el.value == min)

    console.log(maxListTemp)
    console.log(minListTemp)

    spanLive.textContent = `${live} С°`
    spanMax.textContent = `${max} С°`
    spanMin.textContent = `${min} С°`

    if (max <= -33) spanMax.classList.add('bg-danger')
    else if (max <= -30) spanMax.classList.add('bg-warning')
    else if (max <= -20) spanMax.classList.add('bg-info')
    else spanMax.classList.add('bg-success')

    if (min <= -33) spanMin.classList.add('bg-danger')
    else if (min <= -30) spanMin.classList.add('bg-warning')
    else if (min <= -20) spanMin.classList.add('bg-info')
    else spanMin.classList.add('bg-success')

    const maxTempHtml = `
      <div class="myapp mt-4">
        <div class="card border-secondary mb-3">
          <div class="card-header bg-warning text-white">Max температура</div>
            <div class="card-body">
            <h5 class="card-title">${maxListTemp['date']}</h5>
            <h6 class="card-text">Температура: ${maxListTemp['value']} С°</h6>
            </div>
        </div>
      </div>
    `

    const minTempHtml = `
      <div class="myapp mt-4">
        <div class="card border-secondary mb-3">
          <div class="card-header bg-secondary text-white">Min температура</div>
            <div class="card-body">
            <h5 class="card-title">${minListTemp['date']}</h5>
            <h6 class="card-text">Температура: ${minListTemp['value']} С°</h6>
            </div>
        </div>
      </div>
    `

    for (let i = 0; i < php.length; i++) {
      if (i == 0) {
        for (let a = 0; a < 1; a++) {
          let out = ''
          out += `<div class="col-lg-4 col-md-6 col-sm-6 myapp">`
          out += `<div class="card border-secondary mb-3">`
          out += `<div class="card-header bg-success text-white">Dallas 18B20</div>`
          out += `<div class="card-body">`
          out += `<h5 class="card-title">${php[COUNT - 1]['date']}</h5>`
          out += `<h6 class="card-text">Температура: ${live} С°</h6>`
          out += `</div>`
          out += `</div>`
          out += `</div>`
          document
            .querySelector('.justify-content-center')
            .insertAdjacentHTML('afterend', out)
        }
      } else {
        out = ''
        out += `<div class="col-lg-4 col-md-6 col-sm-6 myapp">`
        out += `<div class="card border-info mb-3">`
        out += `<div class="card-header bg-info text-white">Dallas 18B20</div>`
        out += `<div class="card-body">`
        out += `<h5 class="card-title">${php[i - 1]['date']}</h5>`
        out += `<h6 class="card-text">Температура: ${
          php[i - 1]['value']
        } С°</h6>`
        out += `</div>`
        out += `</div>`
        out += `</div>`
        document.querySelector('.myapp').insertAdjacentHTML('afterend', out)
      }
    }
    document
      .querySelector('.list-group')
      .insertAdjacentHTML('afterend', maxTempHtml)
    document
      .querySelector('.list-group')
      .insertAdjacentHTML('afterend', minTempHtml)
  }
}

window.onload = function () {
  const btn = document.querySelector('.mybtn')
  const form = document.querySelector('.form-control')

  btn.addEventListener('click', (e) => {
    e.preventDefault()
    document.querySelectorAll('.myapp').forEach((el) => el.remove())
    console.log(fullSite(form.value))
  })

  fullSite()
}


const landingPage = `<div class="d-flex justify-content-center spiner mt-5">
  <div class="spinner-border text-success" role="status">
    <span class="visually-hidden"></span>
  </div>
</div>`
