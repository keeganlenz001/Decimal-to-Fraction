const input = document.getElementById('input');

input.addEventListener('input', handler);
input.addEventListener('keyup', handler)

function output() {
  document.getElementById("output").style.marginBottom = "20px";
  document.getElementById("output").style.padding = "4px";
  document.getElementById("output").style.paddingTop = "10px";
  document.getElementById("output").style.paddingBottom = "10px";
}

function handler(e) {
  input.textContent= e.target.value;

  num = Number(input.textContent);


  if (isNaN(num)) {
    output()
    document.getElementById("output").innerHTML = "Invalid Input!";
    document.getElementById("output").style.backgroundColor = "rgba(255, 0, 0, 0.25)";
  }else{
    document.getElementById("output").innerHTML = "";
    document.getElementById("output").style.backgroundColor = "rgba(255, 0, 0, 0)";

    if (String(num).length > 17) {
      output()
      document.getElementById("output").innerHTML = "This number is too large!";
      document.getElementById("output").style.backgroundColor = "rgba(255, 0, 0, 0.25)";
    }

    if (e.keyCode === 13) {
      if (Number.isInteger(num)) {
        output()
        document.getElementById("output").innerHTML = "This number cannot be converted to a fraction";
        document.getElementById("output").style.backgroundColor = "rgba(0,0,0, 0.10)";
      }else{
        newNum = Math.ceil((num * 9) * 10) * 0.1
        output()
        document.getElementById("output").innerHTML = String(num) + " to a fraction is: " + String(newNum) + '/9';
        document.getElementById("output").style.backgroundColor = "rgba(0, 255, 0, 0.25)";
      }
    }
  }
}

