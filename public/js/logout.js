

const checkSess= async ()=>{
  let log=false
  console.log()
  const response= await fetch('/api/UsersLogin/sessData')
  
  console.log(response.status)
  if (response.status===200){
    log=true
  }
  if(log===true){
    console.log("Logged In")
    document.getElementById('customLogIn').style.display="none"
  }
  if (!log){
    console.log("Not Logged In")
    document.getElementById('customLogOut').style.display="none"
  }


}
checkSess()