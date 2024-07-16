function setThemeOnLoad() {
  if (localStorage.getItem('_theme') == '') document.body.classList = ''
  else document.body.classList = 'dark'
}

setThemeOnLoad()

const btn = document.getElementById('theme-btn')
btn.addEventListener('click', changeTheme)

function changeTheme() {
  if (localStorage.getItem('_theme') == '') {
    document.body.classList = 'dark'
    localStorage.setItem('_theme', 'dark')
  } else {
    document.body.classList = ''
    localStorage.setItem('_theme', '')
  }
}
