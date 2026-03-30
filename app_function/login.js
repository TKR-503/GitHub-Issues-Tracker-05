
document.getElementById("login-btn").addEventListener("click",  function(e){

    e.preventDefault();
  
    const user_input = document.getElementById("user").value;
    const password_input = document.getElementById("password").value;

   if(user_input === "admin" && password_input === "admin123") 
    {
        
        alert("Login successful! Welcome to the GitHub Issues Tracker.");

        window.location.assign("/dashboard.html");
   } 
   else 
        {
           alert("Invalid username or password.Please try again.");
          return;
       }

});