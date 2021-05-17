const filters=async(event)=>{
    
    event.preventDefault();
    const distance = document.querySelector('#distance')
    const toolType= document.querySelector('#typeFilter')
    const toolCat= document.querySelector('#categoryFilter')
    // console.log(distance.value)
    // const sendDistance= await fetch('/api/searchRoutes/Distance',{
    //     method: 'POST',
    //     body: distance.value,
    //     headers: { 'Content-Type': 'application/json' },
    // })

    // if (sendDistance.ok){
    //     console.log('pass')
      
    // }
    const setFilters=async()=>{

        if(toolCat.value === 'default_label' && toolType.value=== 'default_label'){
            console.log("No Filter")
            const getTools =await fetch('/api/searchRoutes/NoFilter')
            console.log(getTools)
            return
        }
        if(toolCat.value !== 'default_label' && toolType.value !== 'default_label'){
            console.log("Has Both")
           const data={
               cat: toolCat.value,
               type: toolType.value
           }
           console.log(data)
           
            const getTools =await fetch('/api/searchRoutes/BothFilters',{
                method: 'POST',
                body:JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' },
            })
                console.log(getTools)
    
            return
        }
        if(toolCat.value !== 'default_label'){
            console.log('Has Cat')
            return
        }
        if(toolType.value !== 'default_label'){
            console.log('Has Type')
            return
        }
    }
    setFilters()



}



document
    .querySelector('#apply_filters')
    .addEventListener('click', filters)














