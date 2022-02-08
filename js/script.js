const input = document.getElementById('input');

input.addEventListener('input', handler);
input.addEventListener('keyup', handler)

function handler(e) {
  input.textContent= e.target.value;

  num = Number(input.textContent);

  if (isNaN(num)) {
    document.getElementById("output").innerHTML = "Invalid Input!";
    document.getElementById("output").style.backgroundColor = "rgba(255, 0, 0, 0.25)";
  }else {
    document.getElementById("output").innerHTML = "";
    document.getElementById("output").style.backgroundColor = "rgba(255, 0, 0, 0)";

    if (e.keyCode === 13) {
        newNum = Math.ceil((num * 9) * 10) * 0.1
        document.getElementById("output").innerHTML = String(num) + " to a fraction is: " + String(newNum) + '/9';
        document.getElementById("output").style.backgroundColor = "rgba(0, 255, 0, 0.25)";
    }
  }
}

