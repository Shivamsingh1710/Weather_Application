const submitBtn = document.getElementById('submitBtn');
const cityName = document.getElementById('cityName');
const city_name = document.getElementById('city_name');  // yae get out here ko change kanae wala city name hai checkhtml file 

const temp_status = document.getElementById('temp_status');             //now we need temp data so we got these to
const temp_real_val = document.getElementById('temp_real_val');


const datahide = document.querySelector('.middle_layer');

const getInfo = async(event) =>{  //the page do not gets reload after clicking on submit button so we added even.preventdefault method to prevent this
    event.preventDefault();   
    let cityval = cityName.value;  //esse jo user city name diya wo city val mae store now check if empty or not if else lagae hai for that purpose only
    if(cityval ===""){
        city_name.innerText =`City Name Missing`;  //use backtic to write the data
        datahide.classList.add('data_hide');  //agar empty hai to no data should be visible so  classlist.add sae we added a function 
    }
    else{
        try{
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityval}&units=metric&appid=8eb3eb7f4486cf78621ae244ad47f391`
             const response = await fetch(url);    // yae turant data nhi daega so we use ayync await 
            const data = await response.json();   // converted data into readabble streams by json method
            const arrData = [data];       //array of object bane so that we can use what we just want from that whole lot of information
             
              //  temp details and name and country finding
            city_name.innerText = `${arrData[0].name} , ${arrData[0].sys.country}`;  // 2 things are together so used backtic`` and jo jaha hai usko likh do like this


            temp_real_val.innerText = arrData[0].main.temp;        //see apna json file mae arr ka 0 index mae main kae andar temp hai so like this written
            temp_status.innerText = arrData[0].weather[0].main;         // esmae arr and weather 2 array hai so uskae mian mae hai so written like this


            // images condition for clounds and sunny day and all

            const tempMood = arrData[0].weather[0].main; 

            if(tempMood=="Clear"){
                temp_status.innerHTML = "<i class ='fas  fa-sun' style = 'color: #eccc68;'></i> ";
            }
            else if (tempMood=="Clouds"){
                temp_status.innerHTML = "<i class ='fas  fa-cloud' style = 'color: #f1f2f6;'></i> ";

            }
            else if (tempMood=="Rain"){
                temp_status.innerHTML = "<i class ='fas  fa-cloud-rain' style = 'color: #a4b0be;'></i> ";

            }
            else{
                temp_status.innerHTML = "<i class ='fas  fa-cloud' style = 'color: #f1f2f6;'></i> ";
            }

            
            datahide.classList.remove('data_hide');  //if evertthing is coorect so we need data so we removed ths hide function
            
        }
        catch{
            city_name.innerText=`Plz Enter Correct City Name`;    //2nd error if city name is not entered properly
            datahide.classList.add('data_hide');
        }
       
    }
}
submitBtn.addEventListener('click', getInfo);  //we added a event listner that on clicking what will happen is defined in getinfo function