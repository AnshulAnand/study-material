arr = [
  'Start of our platform, gpamaster.in',
  'Independence Day Celebration on 15th August 2024',
]

let i = 0,
  li = document.getElementById('link')

function myFunction() {
  li.innerText = arr[i]
  if (i == arr.length - 1) i = 0
  else i += 1
}

setInterval(myFunction, 3500)

myFunction()
