import React,{useState,useEffect} from "react";
import axios from "axios";

const CitySelect =() =>{
    const [countries,setCountries]= useState ([]);
    const [states,SetStates]=useState([]);
    const [cities,SetCities]=useState([]);
    const [selectedCountry,setSelectedCountry]=useState("");
    const [selectedState,setSelectedState]=useState("");
    const [selectedCity,setSelectedCity]=useState("");

    useEffect(()=>{

        axios
        .get("https://crio-location-selector.onrender.com/countries")
        .then((response)=>{
            setCountries(response.data);
        })
        .catch((error)=>{
         console.error("Error fetching countries:",error);   
        })

    },[]);

    useEffect(()=>{
        if(selectedCountry){
            axios
            .get(`https://crio-location-selector.onrender.com/country=${selectedCountry}/states`)
            .then((response)=>{
                SetStates(response.data);
                setSelectedState("");
                SetCities([]);
                setSelectedCity("");
    })
    .catch((error)=>{
        console.error("Error fetching states",error);

    })

            
        }
    },[selectedCountry]);

    useEffect(()=>{
        if(selectedCountry && selectedState){
            axios
        
        
            .get(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`)
            .then((response)=>{
              SetCities(response.data);
              setSelectedCity("");
             
            })
            .catch((error)=>{
             console.error("Error fetching cities", error);
            });
        }
    },[selectedCountry,selectedState])

    return (
       
        <div>
            <h1>Select Location</h1>
       
            <div>
                <select
                  value={selectedCountry}
                  onChange={(e)=>setSelectedCountry(e.target.value)}
                 
                  >
                    <option value="" disabled>
                        Select country
                        </option>
                        {countries.map((country)=>(
                            <option key={country} value={country}>
                                {country}
                                </option>
                        )
                        )}
                  
                  </select>


        <select 
         value={selectedState}
         onChange={(e)=>setSelectedState(e.target.value)}
         disabled={!selectedCountry}
        // className={styles.dropdown}
         >
            <option value="" disabled>
                Select State
            </option>
            {states.map((state)=>(
                <option key={state} value={state}>
                    {state}
                </option>
            )
            )}
         </select>

         <select 
         value={selectedCity}
         onChange={(e)=>setSelectedCity(e.target.value)}
         disabled={!selectedState}
       // className={styles.dropdown}
         >
            <option value="" disabled>
                Select City
            </option>
            {cities.map((city)=>(
                <option key={city} value={city}>
                    {city}
                </option>
            )
            )}
         </select>
          </div>

          {selectedCity &&(
          
           <h2>
                You selected <span>{selectedCity}</span>,
                <span >
                    {" "} 
                    {selectedState},{selectedCountry}
                </span>
            </h2>
          )}
        </div>
    )
}

export default CitySelect;