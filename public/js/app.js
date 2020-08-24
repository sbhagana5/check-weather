console.log("this is a javascript file")
const weatherForm= document.querySelector('form');
const search = document.querySelector('input') 
const msg1 = document.querySelector('.msg-1')
const msg2= document.querySelector('.msg-2')

// msg1.textContent='"hello"   '
weatherForm.addEventListener('submit',(event)=>{
   
    event.preventDefault();
   
    const location= search.value
   
    console.log(location)
    msg1.textContent="loading...."
    msg2.textContent=""

    if(location){
        fetch('/weather?address='+location).then((response)=>{
    response.json().then((data)=>
    { 
        if (data.error) {
        msg1.textContent=data.error
        // msg2.textContent=null
    } else {
        console.log(data)
        msg1.textContent=data.forcast
        msg2.textContent=data.place
             }

    })
})

    }
    else{
        console.log("please enter location")
    }
})