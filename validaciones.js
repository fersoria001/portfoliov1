const validadores = {
  nombre: (input) => validarNombre(input),
  email: (input) => validarEmail(input),
};



function valida(input) 
{
  const tipoDeInput = input.dataset.type;
  if(validadores[tipoDeInput])
    {
      validadores[tipoDeInput](input);
    }
console.log(input.parentElement);
  if(input.validity.valid)
    {
	input.parentElement.classList.remove("formcontato__form--invalid");
	input.parentElement.querySelector(".input-message-error").innerHTML = "";
    }
  else
    {
	input.parentElement.classList.add("formcontato__form--invalid");
	input.parentElement.querySelector(".input-message-error").innerHTML = showErrorMessage(tipoDeInput, input);
    }
}


const errorMessages = {
nombre: {
valueMissing: "name can't be empty",
customError: "The name must be at leat 3 characters A/Z-a/z"
},
email: {
valueMissing: "name camp can't be empty",
customError: "A valid email adress should like like anything@some.com"
}
}



function validarNombre(input)
{
  const nombre = input.value;
  let message = "";
  if(!nombreValido(nombre))
    {
       message = "The name must be at leat 3 characters A/Z-a/z";
    }
  input.setCustomValidity(message);
}

function nombreValido(nombre)
{
  const letters = /^[A-Za-z]+$/;
  const valido = letters.test(nombre) && nombre.length >= 3;
  return valido;
}


function validarEmail(input)
{
  const re = /\S+@\S+\.\S+/;
  let message = "";
  if(!re.test(input))
    {
      message = "A valid email adress should like like anything@some.com"
    }
  input.setCustomValidity(message);
}


const inputs = document.querySelectorAll("input");


inputs.forEach(  input => {
  input.addEventListener('blur', (input) => {
    valida(input.target);
   });
});

const errorTypes = [
  "valueMissing",
  "typeMissmatch",
  "customError",
];


function showErrorMessage(tipoDeInput, input)
{
  let message = "";
  errorTypes.forEach( error => {
  if(input.validity[error])
  {
     console.log(tipoDeInput, error);
     console.log(input.validity[error]); 
     console.log(errorMessages[tipoDeInput][error]);
	 message = errorMessages[tipoDeInput][error];
  }
});
return message;
}
