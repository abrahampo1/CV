const commands = {
  fullscreen: {
    desc: 'Pone el terminal en pantalla completa',
  },
  reboot: {
    desc: 'Reinicia el terminal',
  },
  help: {
    desc: 'Obtiene una lista de comandos',
  },
  clear: {
    desc: 'Limpia el terminal',
  },
  about: {
    desc: 'Obtiene información acerca de mi',
    out: [
      'NAME: Abraham Leiro Fernandez',
      'EMAIL: abraham@cpsoftware.es',
      'PHONE: +34634384415',
      'DESCRIPTION:',
      'Programador full stack.',
    ],
  },
  jobs: {
    desc: 'Obtiene los trabajos realizados',
    out: [
      '2018-AHORA : Software gestión lógistica Asociación viticultores Rías Baixas',
      '2019-2020: Server Admin - Xunta De Galicia',
      '2021-AHORA: Full Stack Developer - Rodapro SL',
    ],
  },
  skills: {
    desc: 'Resumen de las capacidades tecnicas',
    out: [
      'Leyenda:',
      '- Senior: Conocimiendo Máximo del lenguaje',
      '- Alto: Dominio del lenguaje',
      '- Normal: Conocimiento general del lenguaje para realizar aplicaciones especificas',
      '- Basico: Conocimiento basico del lenguaje para realizar pequeños trabajos',
      '--------------------------------',
      'HTML / CSS: Nivel Alto',
      'JAVASCRIPT: Nivel Alto',
      'PHP: Nivel Alto',
      'PYTHON: Nivel Alto',
      'NODEJS: Nivel Alto',
      'C#: Nivel Normal',
      '-',
      'Nivel Alto de comprensión en frameworks (Laravel, React, Vue)',
    ],
  },
  contact: {
    desc: 'Obtiene las redes de contacto',
    out: [
      'LINKEDIN: https://www.linkedin.com/in/abraham-leiro-fernandez-1848b6198/',
      'INSTAGRAM: @abrahampo1',
      'DISCORD: abrahampo1#0069',
    ],
  },
}

let log = []
let curr_log = 0

document.onclick = function (e) {
  $('input:enabled').focus()
}

document.onkeydown = function (e) {
  if (e.keyCode == 38) {
    if (log[log.length - (curr_log + 1)]) {
      $('input:enabled').val(log[log.length - (curr_log + 1)])
      curr_log++
    }
  }
  if (e.keyCode == 40) {
    if (log[log.length - (curr_log - 1)]) {
      $('input:enabled').val(log[log.length - (curr_log - 1)])
      curr_log--
    }
  }
}

function out(text, speed = 5) {
  return new Promise(function (resolve, reject) {
    let p = document.createElement('p')
    document.getElementById('cp').appendChild(p)
    p.classList.add('writing')
    for (let i = 0; i < text.length; i++) {
      setTimeout(() => {
        p.innerHTML += text[i]
        $('.screen').scrollTop($('#cp').height() * 2)
        if (i == text.length - 1) {
          p.classList.remove('writing')
          setTimeout(() => {
            resolve(p)
          }, 20)
        }
      }, speed * i)
    }
  })
}

function input() {
  let p = document.createElement('div')
  document.getElementById('cp').appendChild(p)
  let input = document.createElement('input')
  p.classList.add('input')
  p.innerHTML = '>'
  p.appendChild(input)
  input.focus()

  input.onchange = () => {
    input.disabled = true
    curr_log = 0
    command(input.value)
  }
}

function command(com) {
  log.push(com)
  com = com.toLowerCase()
  if (com == 'reboot') {
    boot()
  }

  if (com == 'fullscreen' || com == 'fs') {
    $('#comp').toggleClass('fs')
    input()
    return
  }

  if (com == 'linkedin') {
    window.open(
      'https://www.linkedin.com/in/abraham-leiro-fernandez-1848b6198/',
    )
    out('Abriendo Linkedin').then(() => {
      input()
    })
    return
  }
  if (com == 'clear' || com == 'cls') {
    clear()
    return
  }
  if (com == 'update') {
    location.reload()
    return
  }

  if (com == 'bozo') {
    function send(command, i = 0) {
      out(command).then(() => {
        if (i < 50) {
          send(command, i + 1)
        } else {
          input()
        }
      })
    }
    send('L')
    return
  }

  if (com == 'about') {
    let img = document.createElement('img')
    img.src = 'img/me.png'
    document.getElementById('cp').appendChild(img)
  }
  if (com == 'help' || com == '?') {
    let comandos = Object.keys(commands)
    function send(command, i = 0) {
      out(command).then(() => {
        out('-- ' + commands[command]['desc']).then(() => {
          if (comandos[i + 1]) {
            send(comandos[i + 1], i + 1)
          } else {
            input()
          }
        })
      })
    }
    send(comandos[0])
    return
  }
  if (commands[com]) {
    function send(command, i = 0) {
      out(command).then(() => {
        if (commands[com]['out'][i + 1]) {
          send(commands[com]['out'][i + 1], i + 1)
        } else {
          input()
        }
      })
    }
    send(commands[com]['out'][0])
  } else {
    out(
      'Comando "' +
        com +
        '" no encontrado, use "help" para obtener una lista de comandos',
      20,
    ).then(() => {
      input()
    })
  }
}

function clear(withInput = true) {
  document.getElementById('cp').innerHTML = ''
  if (withInput) {
    input()
  }
}

function boot() {
  clear(false)
  const boot_secuence = [
    'booting up...........',
    'Navigator provided by ' + navigator.vendor + '..........',
    'Current platform ' + navigator['platform'] + '..........',
    'is online? ' + navigator.onLine + '........',
    'obtaining script sources..........',
    'finished loading',
    '-------------------------------------------------',
    'CV_OS 2.1 hecho por Abraham Leiro Fernandez',
    'Última actualicación: 16/07/2022 0:16',
    'Hola, Buenos dias, ingrese un comando por favor ("help" o "?")',
  ]

  function send(command, i = 0) {
    out(command, 10).then(() => {
      if (i == 6) {
        clear(false)
      }
      if (boot_secuence[i + 1]) {
        send(boot_secuence[i + 1], i + 1)
      } else {
        input()
      }
    })
  }
  send(boot_secuence[0])
}

boot()
