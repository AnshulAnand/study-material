arr = [
  '1 Lorem ipsum dolor, sit amet consectetur adipisicing elit. Libero, qui.',
  '2 Lorem ipsum dolor, sit amet consectetur adipisicing elit. Libero, qui. Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
  '3 Lorem ipsum dolor, sit amet consectetur adipisicing elit. Libero, qui.',
  '4 Lorem ipsum dolor, sit amet consectetur adipisicing elit. Libero, qui. Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
  '5 Lorem ipsum dolor, sit amet consectetur adipisicing elit. Libero, qui.',
]

i = 0
li = document.getElementById('link')

function myFunction() {
  li.innerText = arr[i]
  if (i == 4) i = 0
  else i += 1
}

// ul = document.getElementById('links')

// function myFunction() {
//   for (let i = 0; i < arr.length; i++) {
//     if (ul.firstChild) ul.removeChild(ul.lastChild)
//     li = document.createElement('li')
//     li.innerText = arr[i]
//     ul.appendChild(li)
//   }
//   arr.push(arr.shift())
// }

setInterval(myFunction, 5000)
