const prebtn=document.querySelector("#pre");
const nextbtn=document.querySelector("#next");
const imgs=document.querySelectorAll(".heroimgs img");
let n=0;
function changeSlides(){
    for(let i=0;i<imgs.length;i++){
        imgs[i].style.display ='none';
     }
        imgs[n].style.display ='block';

    
}
changeSlides();
prebtn.addEventListener("click",(e)=>{
    e.preventDefault();
    if( n>0 ){
        n--;
    }else{
        n=imgs.length-1
    }
    changeSlides()
});
nextbtn.addEventListener("click",(e)=>{
    e.preventDefault();
    if(n < imgs.length-1){
        n++;
    }else{
        n=0;
    }
    changeSlides();
})

const backToTopBtn = document.getElementById("backToTop");
backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

const countryBtn = document.querySelector("#countryBtn");
const countryMenu = document.querySelector("#countryMenu");
const countryList = document.querySelector("#countryList");
const selectedCountry = document.querySelector("#selectedCountry");
const countryArrow = document.querySelector("#countryArrow");
const locationSelect=document.querySelector("#selectLocation");

let countries = [];

// Get countries from API
fetch("https://countriesnow.space/api/v0.1/countries/flag/images")
    .then(response => response.json())
    .then(data => {

        countries = data.data;

        showCountries(countries);

    })
    .catch(error => {
        console.error("Country API Error:", error);
    });
let flag = [];

// Get countries from API



// Open / close dropdown
countryBtn.addEventListener("click", () => {

    countryMenu.classList.toggle("hidden");

    countryArrow.classList.toggle("fa-caret-down");
    countryArrow.classList.toggle("fa-caret-up");

});


// Show countries
function showCountries(countryArray) {

    countryList.innerHTML = "";

    countryArray.forEach(country => {

        const countryItem = document.createElement("div");

        countryItem.textContent = country.name;

        countryItem.className =
            "px-[10px] py-[8px] cursor-pointer hover:bg-gray-200 text-[14px]";

        countryItem.addEventListener("click", () => {

            selectedCountry.textContent = country.name;
            locationSelect.textContent = country.name;

            countryMenu.classList.add("hidden");

            countryArrow.classList.remove("fa-caret-up");
            countryArrow.classList.add("fa-caret-down");

        });

        countryList.appendChild(countryItem);

    });
}
const locationBtn = document.querySelector("#locationBtn");
const locationDiv = document.querySelector("#location");
const closeBtn = document.querySelector("#closeBtn");
const locationOverlay = document.querySelector("#locationOverlay");
locationOverlay.addEventListener("click", () => {
    locationDiv.classList.add("hidden");
    locationOverlay.classList.add("hidden");
});
locationBtn.addEventListener("click", () => {
    locationDiv.classList.remove("hidden");
    locationOverlay.classList.remove("hidden");
});
closeBtn.addEventListener("click", () => {
    locationDiv.classList.add("hidden");
    locationOverlay.classList.add("hidden");
});
const signInBtn = document.querySelectorAll(".sign-in-btn");
const signInSection = document.querySelector("#signIn");
const closeSignInBtn = document.querySelector("#closeSignIn");
closeSignInBtn.addEventListener("click", () => {
    signInSection.classList.add("hidden");
});
signInBtn.forEach(btn => {
    btn.addEventListener("click", () => {
        signInSection.classList.remove("hidden");

    });
});





const baseURL = "https://api.frankfurter.dev/v2/rate";

const amount = document.querySelectorAll(".amount");
const symbols = document.querySelectorAll(".symbol");

const fromCurrency = document.querySelector("#fromCurrency");
const toCurrency = document.querySelector("#toCurrency");


// Currency symbols
 

// To currency dropdown fill
countriesCode.forEach((country) => {

    let option = document.createElement("option");

    option.value = country.currencyCode;
    option.textContent = country.currencyCode;

    toCurrency.appendChild(option);

});


// Original prices save karo
amount.forEach((amt) => {

    amt.dataset.originalPrice = parseFloat(amt.textContent);

});


// Currency change
toCurrency.addEventListener("change", () => {

    const from = fromCurrency.textContent;
    console.log(from)
    const to = toCurrency.value;

    const symbol = currencySymbols[to];

    // Same currency
    if (from === to) {

        amount.forEach((amt) => {

            const originalPrice =
                parseFloat(amt.dataset.originalPrice);

            amt.textContent = originalPrice.toFixed(0);

        });

        symbols.forEach((sym) => {
            sym.textContent = currencySymbols[from];
        });

        return;
    }


    // API call
    fetch(`${baseURL}/${from}/${to}`)
        .then(response => response.json())
        .then(data => {

            const rate = data.rate;


            // Price update
            amount.forEach((amt) => {

                const originalPrice =
                    parseFloat(amt.dataset.originalPrice);

                const converted =
                    originalPrice * rate;

                amt.textContent = converted.toFixed(0);

            });


            // Symbol update
            symbols.forEach((sym) => {

                sym.textContent = symbol;

            });

        })
        .catch(error => {

            console.log("Currency conversion error:", error);

        });

});
const countryName=document.querySelector("#countryName");

const flagsImg=document.querySelector("#flagImg")
countriesCode.forEach((country) => {

    let option = document.createElement("option");

    option.value = country.country;
    option.textContent = country.country;

    countryName.appendChild(option);

});



countryName.addEventListener("change", async () => {

    const Names  = countryName.value;
    
    try {
        // Country name + code list
        const response = await fetch("https://flagcdn.com/en/codes.json");
        const countries = await response.json();
        
        
        // Find country code using country name
        const countryCode = Object.keys(countries).find(
            code => countries[code].toLowerCase() === Names.toLowerCase()
        );

        if (countryCode) {
            flagsImg.src = `https://flagcdn.com/w320/${countryCode}.png `;
            
        }

    } catch (error) {
        console.error("Error:", error);
    }
});
const lanSelect=document.querySelector("#lanSelect");
languages.forEach((lan)=>{
    let option=document.createElement("option");
    option.value=lan.name;
    option.textContent=lan.name;
    option.style.backgroundColor="white";
    option.style.color="black";
    lanSelect.appendChild(option);
    
})
const lanflag=document.querySelector("#lanflag")
lanSelect.addEventListener("change",()=>{
   const selectedLanguage = lanSelect.value;

    const language = languages.find((lan) => {
        return lan.name === selectedLanguage;
    });
    console.log(language)
    lanflag.src = `https://flagcdn.com/w80/${language.flag}.png`;
                        // change language

   const translateText = async (text, targetLanguage) => {
      const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${targetLanguage}`;

     try {
     const response = await fetch(url);

     if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
     }

     const data = await response.json();

     return data.responseData.translatedText;

     } catch (error) {
     console.log("Translation Error:", error);
     return text;
  }
};


const translateAll = async (targetLanguage) => {

  const elements = document.querySelectorAll(".translatedText");

  // Saare original texts pehle save karo
  const texts = [...elements].map(element => element.dataset.original || element.textContent);

  // Saari API requests ek saath
  const translations = await Promise.all(
    texts.map(text => translateText(text, targetLanguage))
  );

  // Results HTML mein daalo
  elements.forEach((element, index) => {
    element.textContent = translations[index];

    // Original English text save karo
    element.dataset.original = texts[index];
  });
};


// Example
translateAll(language.code);



})


