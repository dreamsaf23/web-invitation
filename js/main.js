// Beberapa variabel global
let drag = false
const allButtonSlider = document.querySelectorAll(".menu")
const allContaint = document.querySelectorAll(".containt")
const allTopLeaf = document.querySelectorAll(".daunAtas")
const allBottomLeaf = document.querySelectorAll(".daunBawah")
const buttomSlider = document.querySelector(".buttom_slider")

// Perubahan nilai drag saat ada event touchmove dan mousemove
window.addEventListener("touchmove", function () {
  drag = true
})

window.addEventListener("onmousemove", function () {
  drag = true
})

// Fungsi mengubah nilai drag menjadi false
function setDragFalse() {
  drag = false
}

// Load beberapa fungsi awal
window.onload = function () {
  getMobileVersion()
  initiationButtomSlider()
  countdown()
  window.setTimeout(muncul, 3000)
  window.setTimeout(fadeOut1, 2000)
  document.getElementById("btn-menu-aplication").classList.add("btnMenuActive")
}

function fadeOut1() {
  document.getElementById("loading").style.opacity = 0
  document.getElementById("loading").style.transition = 1 + "s"
  document.getElementById("loading").style.zIndex = -99999
  document.querySelector(".textpreload").style.transform = "scale(" + 0 + ")"
  document.querySelector(".textpreload").style.transition = 2 + "s"
}

function muncul() {
  allContaint[0].classList.add("active")
  allTopLeaf[0].classList.add("geserBawah")
  allBottomLeaf[0].classList.add("geserAtas")
  contentMuncul(0)
}

// Inisiasi event pada beberapa slide dari sampul sampai penutup
function initiationButtomSlider() {
  let widthSlider = `calc(${allButtonSlider.length}% * 20)`
  const slider = document.querySelector(".slider")
  slider.style.setProperty("width", widthSlider)
  for (let i = 0; i < allButtonSlider.length; i++) {
    allButtonSlider[i].addEventListener("click", function () {
      lastCheck(i)
    })
    allButtonSlider[i].addEventListener("touchstart", function () {
      checkTouchOrMove(i)
    })
  }
}

// Pemeriksaan apakah sebuah interaksi itu diam atau bergerak
function checkTouchOrMove(index) {
  buttomSlider.addEventListener("touchend", function () {
    lastCheck(index)
  })
}

function lastCheck(index) {
  if (!drag) moveSlide(index)
}

// Fungsi berpindah slide saat di click
function moveSlide(index) {
  if (!drag) {
    if (!allButtonSlider[index].classList.contains("btn-color-active")) {
      removeAllClass(index)
      allButtonSlider[index].classList.add("btn-color-active")
      allContaint[index].classList.add("active")
      allTopLeaf[index].classList.add("geserBawah")
      allBottomLeaf[index].classList.add("geserAtas")
      autoMoveSlider(index)
      setDragFalse()
      setTimeout(function () {
        contentMuncul(`${index}`)
      }, 0)
    }
  }
}

// Fungsi membersihkan beberapa class pada beberapa elemen
function removeAllClass(id) {
  const allContentChild = document.querySelectorAll(`.child-${id}`)
  for (let i = 0; i < allButtonSlider.length; i++) {
    allButtonSlider[i].classList.remove("btn-color-active")
    allContaint[i].classList.remove("active")
    allTopLeaf[i].classList.remove("geserBawah")
    allBottomLeaf[i].classList.remove("geserAtas")
    for (let j = 0; j < allContentChild.length; j++)
      allContentChild[j].classList.remove("show")
  }
}

// Fungsi untuk menggerakan slider secara otomatis
function autoMoveSlider(index) {
  let width = allButtonSlider[0].offsetWidth
  let move, x, awal, akhir
  awal = 1
  akhir = allButtonSlider.length - 2
  x = buttomSlider.style.left
  if (index >= awal && index <= akhir) {
    buttomSlider.classList.add("spesific-transition")
    if (index >= awal + 1 && index <= akhir - 1) {
      move = width * index - width * 2
      buttomSlider.style.left = -move + "px"
    } else if (index == awal && x <= `-${width}px`) {
      buttomSlider.style.left = 0 + "px"
    } else if (index == akhir && x >= `-${width * (akhir - 5)}px`) {
      buttomSlider.style.left = -width * (akhir - 4) - width + "px"
    }
  }
}

// Fungsi untuk menampilkan konten
function contentMuncul(id) {
  let periode = 500
  let time
  let content = ".child-" + id

  for (let i = 0; i < allButtonSlider.length; i++) {
    allButtonSlider[i].classList.add("unclickable")
  }

  const contentChild = document.querySelectorAll(content)
  for (let i = 0; i < contentChild.length; i++) {
    time = periode * (i + 1)
    setTimeout(function () {
      showContentChild(i, content)
    }, time)
  }

  setTimeout(function () {
    for (let i = 0; i < allButtonSlider.length; i++) {
      allButtonSlider[i].classList.remove("unclickable")
    }
  }, 0)

  setTimeout(function () {
    buttomSlider.classList.remove("spesific-transition")
  }, 2000)
}

function showContentChild(div, kelas) {
  const contentChild = document.querySelectorAll(kelas)
  contentChild[div].classList.add("show")
}

// Fungsi untuk menggerakan buttom slider
const detectDeviceType = () =>
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
    ? "Mobile"
    : "Desktop"

dragElement(buttomSlider, detectDeviceType())
function dragElement(elemen, device) {
  let pos1 = 0,
    pos2 = 0
  let point
  if (device == "Desktop") {
    elemen.onmousedown = dragMouseDown

    const width = buttomSlider.offsetWidth
    let a = document.querySelectorAll(".menu").length
    let b = a - 5
    let n = (width / 5) * b

    function dragMouseDown(e) {
      e = e || window.event
      e.preventDefault()
      pos2 = e.clientX
      document.onmouseup = closeDragElement
      document.onmousemove = elementDrag
    }

    function elementDrag(e) {
      drag = true
      e = e || window.event
      e.preventDefault()
      pos1 = pos2 - e.clientX
      pos2 = e.clientX
      point = elemen.offsetLeft - pos1
      if (point > 0) point = 0
      else if (point < -n) point = -n
      elemen.style.left = point + "px"
      elemen.style.bottom = 0
    }

    function closeDragElement() {
      setTimeout(setDragFalse, 1000)
      document.onmouseup = null
      document.onmousemove = null
    }
  } else if (device == "Mobile") {
    let touchLocation
    elemen.ontouchstart = touchStart

    const width = buttomSlider.offsetWidth
    let a = allButtonSlider.length
    let b = a - 5
    let n = (width / 5) * b

    function touchStart(e) {
      e = e || window.event
      e.preventDefault()
      pos2 = e.clientX
      document.ontouchend = touchEnd
      document.ontouchmove = touchMove
    }

    function touchMove(e) {
      e = e || window.event
      touchLocation = e.targetTouches[0]
      pos1 = pos2 - touchLocation.pageX
      pos2 = touchLocation.pageX
      point = elemen.offsetLeft - pos1
      if (point > 0) point = 0
      else if (point < -n) point = -n
      elemen.style.left = point + "px"
    }

    function touchEnd() {
      document.ontouchend = null
      document.ontouchmove = null
      setDragFalse()
    }
  }
}

// Fungsi untuk swipe up dan swipe down
let touchStartY = 0
let touchEndY = 0
let minus
const application = document.querySelector(".aplication")
const heightSlider = buttomSlider.offsetHeight
const heightApp = window.innerHeight
minus = heightApp - heightSlider

application.addEventListener("touchstart", function (e) {
  e = e || window.event
  let touchLocation = e.targetTouches[0]
  touchStartY = touchLocation.pageY
})

application.addEventListener("touchend", function (e) {
  e = e || window.event
  let touchLocation = e.changedTouches[0]
  touchEndY = touchLocation.pageY
  if (minus > touchStartY && minus > touchEndY) checkSwipeDirection()
})

function checkSwipeDirection() {
  setDragFalse()
  let indeks
  for (let i = 0; i < allButtonSlider.length; i++) {
    if (allButtonSlider[i].classList.contains("btn-color-active")) indeks = i
  }
  if (touchEndY != touchStartY) {
    if (touchEndY < touchStartY) {
      indeks = indeks + 1
      if (indeks == allButtonSlider.length) indeks = allButtonSlider.length - 1
    }

    if (touchStartY < touchEndY) {
      indeks = indeks - 1
      if (indeks == -1) indeks = 0
    }
    moveSlide(indeks)
  }
}

let blankSC = document.getElementById("blank-fronted")
let elem = document.documentElement
const apl = document.getElementById("aplication")

// Fungsi event click pada aplication
const btnActive = document.getElementById("btn-menu-aplication")
const btnTriger = document.getElementById("trigerBtn")
btnTriger.addEventListener("click", function () {
  btnActive.classList.toggle("btnMenuActive")
})

// Fungsi untuk mute dan unmute audio
const audio = document.getElementById("audio")
const btnSound = document.getElementById("btnSound")
function mutedUnmuted() {
  audio.muted = !audio.muted
  btnSound.classList.toggle("active")
}

// Fungsi untuk darkmode

const body = document.getElementById("body")
const btnDarkMode = document.querySelector(".darkMode")

btnDarkMode.addEventListener("click", function () {
  body.classList.toggle("dark")
})

// Fungsi untuk fullscreen
const btnMinimaze = document.querySelector(".minimaze")
const btnFullscreen = document.querySelector(".fullscreen")
function getMobileVersion() {
  if (window.matchMedia("(max-width: 767px)").matches) {
    // Fungsi untuk mobile
    blankSC.addEventListener("touchstart", function () {
      audio.play()
      blankSC.style.opacity = 0
      blankSC.style.transition = 2 + "s"
      blankSC.style.zIndex = -9999
      apl.style.opacity = 1
      btnMinimaze.style.display = "block"
      btnMinimaze.style.opacity = 0.5
      btnFullscreen.style.display = "none"
    })
    blankSC.addEventListener("click", function () {
      audio.play()
      blankSC.style.opacity = 0
      blankSC.style.transition = 2 + "s"
      blankSC.style.zIndex = -9999
      apl.style.opacity = 1
      btnMinimaze.style.display = "block"
      btnMinimaze.style.opacity = 0.5
      btnFullscreen.style.display = "none"
    })
  } else {
    // Fungsi untuk fullscreen windows
    document
      .querySelector(".fullscreen")
      .addEventListener("click", openFullscreen)
    blankSC.addEventListener("click", openFullscreen)
    function openFullscreen() {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen()
        audio.play()
        blankSC.style.opacity = 0
        blankSC.style.transition = 2 + "s"
        blankSC.style.zIndex = -9999
        apl.style.opacity = 1
        btnMinimaze.style.display = "block"
        btnFullscreen.style.display = "none"
      } else if (document.documentElement.webkitRequestFullscreen) {
        /* Safari */
        document.documentElement.webkitRequestFullscreen()
      } else if (document.documentElement.msRequestFullscreen) {
        /* IE11 */
        document.documentElement.msRequestFullscreen()
      }
    }

    // Fungsi untuk close fullscreen windows
    document
      .querySelector(".minimaze")
      .addEventListener("click", closeFullscreen)
    function closeFullscreen() {
      if (document.exitFullscreen) {
        document.exitFullscreen()
        btnMinimaze.style.display = "none"
        btnFullscreen.style.display = "block"
      } else if (document.webkitExitFullscreen) {
        /* Safari */
        document.webkitExitFullscreen()
      } else if (document.msExitFullscreen) {
        /* IE11 */
        document.msExitFullscreen()
      }
    }
  }
}

// Fungsi menampilkan modal
// Input modal content
const overlayModal2 = document.querySelector(".modal2")
const overlayModal3 = document.querySelector(".modal3")

// Btn overlay modal dan btn open
const btnOpenModal1 = document.querySelectorAll(".rsp")
const overlayModal1 = document.querySelector(".modal1")

for (let index = 0; index < btnOpenModal1.length; index++) {
  btnOpenModal1[index].addEventListener("click", function () {
    overlayModal1.classList.add("show")
  })
}

// Button exit
const btnExitModal1 = document.querySelectorAll(".btn-exit-modal1")
for (let index = 0; index < btnExitModal1.length; index++) {
  btnExitModal1[index].addEventListener("click", closeModal)
}

const btnOpenModal2 = document.querySelector(".btn-taarup")
const btnExitModal2 = document.querySelector(".btn-exit-modal2")
const btnOpenModal3 = document.querySelector(".btn-wallet")
const btnExitModal3 = document.querySelector(".btn-exit-modal3")

//  Fungsi open modal
btnOpenModal2.addEventListener("click", function () {
  overlayModal2.classList.add("show")
})
btnOpenModal3.addEventListener("click", function () {
  overlayModal3.classList.add("show")
})

// Fungsi close modal
btnExitModal2.addEventListener("click", closeModal)
btnExitModal3.addEventListener("click", closeModal)
function closeModal() {
  overlayModal1.classList.remove("show")
  overlayModal2.classList.remove("show")
  overlayModal3.classList.remove("show")
}

$(function () {
  $("#send-message-whatsapp").on("click", "button", function (e) {
    e.preventDefault()

    const $form = $("#send-message-whatsapp")

    const phone = "6281315385147"

    // get object i.e {key: 'value'} of form
    let data = {}
    $form.serializeArray().forEach((v) => (data[v.name] = v.value))

    // make the ?text= payload,
    // - could use .filter() here too if you dont want empty values
    const text = [data.ucapan].join(" - ") // change to what you want sep to be

    // make the url
    const action =
      "https://wa.me/" + phone + "?text=" + encodeURIComponent(text)
    console.log(action)

    $form.attr("action", action)
    $form.attr("target", "_blank")
    $form.submit()
  })
})

// Fungsi untuk melakukan zoom
const imgGallery = document.querySelectorAll(".imgGallery")
let bgImgGallery = [
  "https://cdn.popbela.com/content-images/post/20210629/cv-3125ccc2f871a0cbd2ad6ded20da1cb4_750x500.jpg",
  "https://i.pinimg.com/564x/fd/bd/5e/fdbd5e46b2baf7b4c656c7b3a0bd1aef.jpg",
  "https://i.pinimg.com/564x/fd/bd/5e/fdbd5e46b2baf7b4c656c7b3a0bd1aef.jpg",
  "https://i.pinimg.com/564x/fd/bd/5e/fdbd5e46b2baf7b4c656c7b3a0bd1aef.jpg",
  "https://i.pinimg.com/564x/fd/bd/5e/fdbd5e46b2baf7b4c656c7b3a0bd1aef.jpg",
  "https://i.pinimg.com/564x/fd/bd/5e/fdbd5e46b2baf7b4c656c7b3a0bd1aef.jpg",
]
let i
let u
for (let i = 0; i < bgImgGallery.length; i++) {
  imgGallery[i].style.background = "url(" + bgImgGallery[i] + ")"
  imgGallery[i].style.backgroundSize = "cover"
  imgGallery[i].style.backgroundPosition = "center"
}
// function clik zoom img
for (let u = 0; u < imgGallery.length; u++) {
  imgGallery[u].addEventListener("click", function () {
    imgGallery[u].classList.toggle("zoom")
    imgGallery[u].style.transition = 1 + "s"
  })
}

// Fungsi copy text
const copyButtonRekening = document.querySelector(".btn-copy-rekening")
const copyButtonAddress = document.querySelector(".btn-copy-address")
copyButtonRekening.addEventListener("click", function () {
  let copyText = document.getElementById("text-copy-rekening")
  copyText.select()
  copyText.setSelectionRange(0, 99999)
  navigator.clipboard.writeText(copyText.value)
})

copyButtonRekening.addEventListener("touchstart", function (e) {
  let copyText = document.getElementById("text-copy-rekening")
  copyText.select()
  copyText.setSelectionRange(0, 99999)
  navigator.clipboard.writeText(copyText.value)
})

copyButtonAddress.addEventListener("click", function () {
  let copyText = document.getElementById("text-copy-address")
  copyText.select()
  copyText.setSelectionRange(0, 99999)
  navigator.clipboard.writeText(copyText.value)
})

copyButtonAddress.addEventListener("touchstart", function () {
  let copyText = document.getElementById("text-copy-address")
  copyText.select()
  copyText.setSelectionRange(0, 99999)
  navigator.clipboard.writeText(copyText.value)
})

// Fungsi memilih gift
const btnGift1 = document.querySelector(".logo1")
const btnGift2 = document.querySelector(".logo2")

btnGift1.addEventListener("click", function () {
  document.querySelector(".content-logo1").classList.add("active")
  document.querySelector(".content-logo2").classList.remove("active")
})

btnGift2.addEventListener("click", function () {
  document.querySelector(".content-logo2").classList.add("active")
  document.querySelector(".content-logo1").classList.remove("active")
})

// Fungsi untuk countdown acara
function countdown() {
  const countdown = document.querySelector(".waktu-hitung-mundur")
  const numbers = document.querySelectorAll(".numberDate")
  // Waktu acara tulis disini
  const deadline = new Date("Aug 21, 2022 18:00:00").getTime()

  let x = setInterval(function () {
    let now = new Date().getTime()
    let distance = deadline - now
    let text = []

    let days = Math.floor(distance / (1000 * 60 * 60 * 24))
    let hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    )
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    let seconds = Math.floor((distance % (1000 * 60)) / 1000)

    text.push(days, hours, minutes, seconds)
    for (let i = 0; i < 4; i++) {
      if (text[i] == 0) numbers[i].innerHTML == 00
      else numbers[i].innerHTML = text[i]
      console.log
    }
  }, 1000)
}

// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
let vh = window.innerHeight * 0.01
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty("--vh", `${vh}px`)

// We listen to the resize event
window.addEventListener("resize", () => {
  // We execute the same script as before
  let vh = window.innerHeight * 0.01
  document.documentElement.style.setProperty("--vh", `${vh}px`)
})
