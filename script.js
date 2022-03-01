function onLoadOfBody(){
    fetch("https://restcountries.com/v3.1/all")
    .then(response=>response.json())
    .then(countryData =>{
        let totalCountry = countryData.length;
        let countryNameArray = new Array(totalCountry);
        for(let i=0; i<totalCountry; i++){
            let countryName = countryData[i].name.official;
            countryNameArray[i] = countryName;           
        }
        countryNameArray.sort();
        for(i=0; i<totalCountry; i++){
            const countryNameCard = `
            <div>
                <h6 class="p-2 bg-lite text-danger">${countryNameArray[i]}</h6>
            </div>
            `
            document.getElementById("printAllCountryName").innerHTML += countryNameCard;
        }                
    })
}

function onclickSearch(){
    let searchedNameInput = document.getElementById("searchNameInputText").value;
    fetch(`https://restcountries.com/v3.1/name/${searchedNameInput}`)
    .then(response=>response.json())
    .then(searchedCountryData =>{
        let searchedCountryAlternateName = "";
        let searchedCountryName = searchedCountryData[0].name.official;
        let searchedCountryCommonName = searchedCountryData[0].name.common;
        let searchedCountryFlag = searchedCountryData[0].flags.png;
        let searchedCountryArea = searchedCountryData[0].area;
        let searchedCountryPopulation = searchedCountryData[0].population;
        let searchedCountrylanguageSpoken = "";
        let searchedCountryLatitude = searchedCountryData[0].latlng[0];        
        let searchedCountryLongitude = searchedCountryData[0].latlng[1];
        let searchedCountryTimezone = "";
        let searchedCountryCapital = "";
        let searchedCountryRegion = searchedCountryData[0].region;

        


        for(let i = 0; i<searchedCountryData[0].altSpellings.length; i++) {
            searchedCountryAlternateName += searchedCountryData[0].altSpellings[i]+" | ";
        }

        for(let i = 0; i < searchedCountryData[0].timezones.length; i++){
            searchedCountryTimezone += searchedCountryData[0].timezones[i]+" | ";
        }
        try{
            for(let i = 0; i < searchedCountryData[0].capital.length; i++){
            searchedCountryCapital += searchedCountryData[0].capital[i]+" | ";
        }
        }catch(error){
            console.log("Capital Not defined...", error);
            searchedCountryCapital = "NA";
        }
        try {
            for(let i = 0; i<Object.values(searchedCountryData[0].languages).length; i++){
            searchedCountrylanguageSpoken += Object.values(searchedCountryData[0].languages)[i] +" | ";
        }
        } catch (error) {
            console.log("Language Not defined...", error);
            searchedCountrylanguageSpoken = "NA";
        }          

        const searchedCountryNameCard = `
            <div class="container p-2">
                <div class="card p-2" style="background-color:#C1D1D9;">
                    <div class="row">
                        <div class="col-md-7">
                            <br>
                            <h3>${searchedCountryName}</h3>
                            <p style="display: inline;"> commonly known as <h5 style="display: inline;">${searchedCountryCommonName}</h5></p>
                            <br>
                            <div>
                                <p class="badge bg-info">Population : ${searchedCountryPopulation}</p>
                                <p class="badge bg-info">Area : ${searchedCountryArea} SquareKm</p>
                                <p class="badge bg-info">Region : ${searchedCountryRegion}</p>
                            </div>
                        </div>
                        <div class="col-md-5">
                            <img src="${searchedCountryFlag}" alt="${searchedCountryName}"
                                class="img-thumbnail border rounded-2">
                        </div>
                    </div>
                    <br>
                    <div class="row">
                        <div class="col-md-12">
                            <ul class="list-group px-3">                                
                                <li class="list-group-item">Capital : ${searchedCountryCapital}</li>                                   
                                <li class="list-group-item">Languages : ${searchedCountrylanguageSpoken}</li>
                                <li class="list-group-item">Timezone : ${searchedCountryTimezone}</li> 
                                <li class="list-group-item">Geographical location : Latitude ${searchedCountryLatitude} , Longitude ${searchedCountryLongitude}</li>
                                <li class="list-group-item">Alternate Names : ${searchedCountryAlternateName}</li>
                            </ul>
                        </div>                       
                    </div>
                    <br>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="d-flex justify-content-center">
                                <iframe src="https://maps.google.com/maps?q=${searchedCountryLatitude},${searchedCountryLongitude}&hl=en&z=3&amp;output=embed" width="800" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `

            document.getElementById("searchedCountry").innerHTML = searchedCountryNameCard;
    })
}