let dropdowns = document.querySelectorAll(".dropdown select")
const btn = document.querySelector("form button");
const url = "https://v6.exchangerate-api.com/v6/007ccb9078618cc37ee14b43/latest/USD"
const url2="https://v6.exchangerate-api.com/v6/007ccb9078618cc37ee14b43/pair/"
let msg = document.querySelector(".msg")


for (let select of dropdowns) {
    for (let currencyCode in countryList) {
    
      let newOption = document.createElement("option");
      newOption.innerText = currencyCode;
      newOption.value = currencyCode;
      select.appendChild(newOption);
      if(select.name ==="from" && currencyCode==="USD" ){
        newOption.selected="selected";
      }
      else if(select.name ==="to" && currencyCode==="INR" ){
          newOption.selected="selected";
        }
      }
      select.addEventListener("change",(evt)=>{
        console.log(evt.target.value);
        updateFlag(evt.target);
      
      })
    }
  
const updateFlag = (element)=>{
  let currCode=element.value;

  let countryCode=countryList[currCode];
  console.log(countryCode)
  
  let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`
  let img = element.parentElement.querySelector("img")
  img.src=newSrc;
}

btn.addEventListener("click",(evt)=>{
  evt.preventDefault();

 updateExchangeRate();
})
async function updateExchangeRate(){
let from= document.querySelector(".from select");
let fromValue= from.value
console.log(fromValue)
let to= document.querySelector(".to select");
let toValue = to.value;
console.log(toValue);
let amount = document.querySelector(".amount input" )
let amountValue = amount.value;
console.log(amountValue);
if(amountValue <1 || amountValue === ""){
alert("Please enter a valid amount")
amountValue=1;
}
const newUrl =`https://v6.exchangerate-api.com/v6/007ccb9078618cc37ee14b43/pair/${fromValue}/${toValue}`
let response = await fetch(newUrl);
let data = await response.json();
console.log(data.conversion_rate);
let result = data.conversion_rate * amountValue;
console.log("result =",result)

msg.innerText=`${amountValue} ${fromValue}= ${result} ${toValue}`

}
window.addEventListener("load",updateExchangeRate)
