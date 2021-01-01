function fullSite(num = 15) {

  document.querySelector('.justify-content-center').insertAdjacentHTML('afterend', landingPage)

  document.querySelector('.barMenu').insertAdjacentHTML('afterbegin', landingPage)

  const spiner = document.querySelectorAll('.spiner')
  
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
      spiner.forEach((el, id) => spiner[id].remove())
      html(data)
    })
    .catch((err) => console.log(err))

  function html(dataIn) {
    let php = []
    dataIn.forEach(el => {
      let unix = new Date(el.date).getTime()

      const unixT = (millisec) => {

        let seconds = Math.round((Date.now() - millisec) / 1000);

        let minutes = Math.round((Date.now() - millisec) / (1000 * 60));

        let hours = Math.round((Date.now() - millisec) / (1000 * 60 * 60));

        let days = Math.round((Date.now() - millisec) / (1000 * 60 * 60 * 24));

        if (seconds < 60) {
            return seconds + " Секунд";
        } else if (minutes < 60) {
            return minutes + " Минут";
        } else if (hours < 24) {
            return hours + " Час";
        } else {
            return days + " День"
        }
      }
      
      let minutes = Math.round((Date.now() - new Date(el.date).getTime()) / (1000 * 60))
      php.push({id: el.id, time: minutes, date: el.date, unix: unixT(unix), value: parseFloat(el.value)})
    })
    console.log(php)
    const maxT = php.map((el) => el.value)
    const max = Math.max(...maxT)
    const min = Math.min(...maxT)
    const live = php[0]['value']

    const maxListTemp = php.find((el) => el.value == max)
    const minListTemp = php.find((el) => el.value == min)

    const tempSr = php.reduce((acc, el) => (acc + el.value), 0)

    function tempLop(){
      const result = Math.abs(php[php.length - 1].value - live).toFixed(1)
      let outTemp = php[php.length - 1].value
      if(outTemp < live) return `+${result}`
      else return `-${result}`
    }

    const tempSrednjj = `
    <div class="myapp card text-dark mb-3">
                <div class="card-header bg-success text-white">Улица сейчас</div>
                <div class="card-body bg-light">
                  <h1 class="card-title text-center position-relativ tempLive">
                    ${live}°
                    <span class="position-absolute liveTemp bg-success text-white" 
                      style="    
                      border-radius: 20px;
                      font-size: 20px;
                      width: 55px;
                      height: 26px;
                      right: 40px;">${tempLop()}°</span>
                  </h1>
                </div>
              </div>`

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

    const logHtml = ({date, value, unix}) => {
      const block = document.createElement('div')
      block.classList.add('col-lg-4', 'col-md-6', 'col-sm-6', 'myapp')
      block.innerHTML = `
    <div class="card border-secondary mb-3">
    <div class="card-header bg-secondary text-white">${unix} назад</div>
    <div class="card-body">
      <h5 class="card-title">${date}</h5>
        <h6 class="card-text">Температура: ${value} С°</h6>
          </div>
          </div>
    ` 
    document.querySelector('.myone').appendChild(block)
  }

  php.map((el) => logHtml(el))


    document.querySelector('.barMenu').insertAdjacentHTML('afterbegin', tempSrednjj)

    document
      .querySelector('.barMenu')
      .insertAdjacentHTML('beforeend', maxTempHtml)
    document
      .querySelector('.barMenu')
      .insertAdjacentHTML('beforeend', minTempHtml)
  }
}

window.onload = function () {
  const btn = document.querySelector('.mybtn')
  const form = document.querySelector('.form-select')

  btn.addEventListener('click', (e) => {
    e.preventDefault()
    document.querySelectorAll('.myapp').forEach((el) => el.remove())
    fullSite(form.value)
  })

  fullSite()
}


const landingPage = `<div class="d-flex justify-content-center spiner mt-5">
  <div class="spinner-border text-success" role="status">
    <span class="visually-hidden"></span>
  </div>
</div>`
