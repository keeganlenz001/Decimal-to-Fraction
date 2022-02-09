const input = document.getElementById('input');
var isNum = true;
var decimal = false;
var invalid_decimal = false;
var open_paren = false;
var close_paren = false;
var legal = true;

function output() {
  isNum = true;
  decimal = false;
  invalid_decimal = false;
  open_paren = false;
  close_paren = false;
  legal = true;
  document.getElementById("output").style.marginBottom = "20px";
  document.getElementById("output").style.padding = "4px";
  document.getElementById("output").style.paddingTop = "10px";
  document.getElementById("output").style.paddingBottom = "10px";
}

input.addEventListener('input', handler);
input.addEventListener('keyup', handler)

function handler(e) {
  input.textContent= e.target.value;
  input_number = input.textContent;

  for (i = 0; i < input_number.length; i++) {
    if (input_number[i] != '0' && input_number[i] != '1' && input_number[i] != '2' && input_number[i] != '3' && input_number[i] != '4' && input_number[i] != '5' && input_number[i] != '6' && input_number[i] != '7' && input_number[i] != '8' && input_number[i] != '9' && input_number[i] != '.' && input_number[i] != '(' && input_number[i] != ')') {
      isNum = false;
    }

    if (input_number[i] == '.') {
      if (i + 1 < input_number.length) {
        if (!open_paren) {
          decimal = true;
        }else{
          invalid_decimal = true;
        }
      }else{
        invalid_decimal = true;
      }
    }

    if (input_number[i] == '(') {
      if (input_number[i + 1] == ')') {
        legal = false
      }
      open_paren = true;
    }

    if (input_number[i] == ')') {
      close_paren = true;
    }

    if (open_paren == true) {
      if (close_paren == false) {
        legal = false
      }
    }
  }

  
  if (input_number != '' && isNum == false) {
    output();
    document.getElementById("output").innerHTML = "Invalid Input!";
    document.getElementById("output").style.backgroundColor = "rgba(255, 0, 0, 0.25)";
    return;
  }

  if (legal == false || invalid_decimal == true) {
    output();
    document.getElementById("output").innerHTML = "Invalid Input!";
    document.getElementById("output").style.backgroundColor = "rgba(255, 0, 0, 0.25)";
    return;
  }

  if (input_number != '' && isNum && decimal == false && invalid_decimal == false) {
    output();
    document.getElementById("output").innerHTML = "This number cannot be futhur simplified";
    document.getElementById("output").style.backgroundColor = "rgba(0, 0, 0, 0.25)";
    return;
  }else{
    document.getElementById("output").innerHTML = "";
    document.getElementById("output").style.marginBottom = "0px";
    document.getElementById("output").style.padding = "0px";
    document.getElementById("output").style.paddingTop = "0px";
    document.getElementById("output").style.paddingBottom = "0px";
  }

  var parts = input_number.split('.');
  if (open_paren == true && close_paren == true) { 
    whole = parts[0]; //-- whole number 
    //whole = parseInt(whole);
    
    behind_decimal = parts[1];


    after_dot = behind_decimal.split('(');

    convertable_num = after_dot[0]; //-- number before looping number 
    power = convertable_num.split('');
    x = power.length;

    denominator_1 = Math.pow(10, x);
    inside = after_dot[1];

    var loop_num = inside.split(')')[0]; //-- loop number 
    var size = loop_num.split('').length;

    const first_fraction = {
      numerator: convertable_num,
      denominator: denominator_1,
    };

    y1 = Number(whole * first_fraction.denominator) + Number(first_fraction.numerator);

    const first_sum_fraction = {
      numerator: y1,
      denominator: denominator_1,
    };

    z1 = Math.pow(10, size);
    const denom_fraction = {
      numerator: z1 - 1,
      denominator: z1,
    };

    const numer_fraction = {
      numerator: loop_num,
      denominator: Math.pow(10, Number(x) + 1),
    };

    const last_fraction = {
      numerator: numer_fraction.numerator * denom_fraction.denominator,
      denominator: numer_fraction.denominator * denom_fraction.numerator,
    };

    const final_fraction = {
      numerator: Number(first_sum_fraction.numerator * last_fraction.denominator) + Number(first_sum_fraction.denominator * last_fraction.numerator),
      denominator: first_sum_fraction.denominator * last_fraction.denominator,
    };

    function gcd(a, b) {
      if (a == 0) {
          return b;
      }
      return gcd(b % a, a);
    };
  
    divider = gcd(Number(final_fraction.numerator), Number(final_fraction.denominator));
    
    const result = {
      numerator: final_fraction.numerator / divider,
      denominator: final_fraction.denominator / divider,
    };
  
    // if (e.keyCode === 13 || e.keyCode === 76) {
    document.getElementById("output").innerHTML = "<p id='numerator'>" + String(result.numerator) + "</p>" + "<p id='denominator'>" + String(result.denominator) + "</p>";
    document.getElementById("output").style.backgroundColor = "rgba(0, 255, 0, 0.25)";
    output()
    // }
  }
}
