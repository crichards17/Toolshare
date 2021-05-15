// const logout = async () => {
//     console.log('out')
//     const response = await fetch('/api/UsersLogin/logout', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//     });
  
//     if (response.ok) {
//       document.location.replace('/api/UsersLogin/login');
//     } else {
//       alert(response.statusText);
//     }
//   };
//   $(window).unload(logout())
//   document.querySelector('#logout').addEventListener('click', logout);

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