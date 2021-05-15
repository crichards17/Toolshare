const filters=async(event)=>{
    
    event.preventDefault();
    const distance = document.querySelector('#distance')
    console.log(distance.value)
    const sendDistance= await fetch('/api/searchRoutes/Distance',{
        method: 'POST',
        body: distance.value,
        headers: { 'Content-Type': 'application/json' },
    })

    if (sendDate.ok){
        console.log('pass')
    }
}



document
    .querySelector('#apply_filters')
    .addEventListener('click', filters)














