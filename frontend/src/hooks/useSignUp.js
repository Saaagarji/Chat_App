import { useState } from 'react'
import toast from 'react-hot-toast'

const useSignUp = () => {
  const [loading,setLoading]=useState(false)

  const signup = async({fullName,username,password,confirmPassword,gender})=>{
    const success =  handleInputErrors({
      fullName,
      username,
      password,
      confirmPassword,
      gender,
    })
    if(!success)return;
    setLoading(true)
    try {
        const res = await fetch("/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fullName,
            username,
            password,
            confirmPassword,
            gender,
          }),
        });

        const data = await res.json();
    } catch (error) {
        toast.error(error.message)
    }finally{
        setLoading(false)
    }
  }
  return {signup,loading}

}

export default useSignUp

function handleInputErrors({fullName,username,password,confirmPassword,gender})
{
    if(!fullName || !username || !password || !confirmPassword || !gender ){
        toast.error('All fields are required')
        return false
    }
    if(password!==confirmPassword){
        toast.error('Password do not match')
        return false
    }
    if(password.length<6){
        toast.error('Password must be atleast 6 characters long')
        return false
    }
    return true;
}
