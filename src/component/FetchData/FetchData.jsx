import { useEffect } from "react"

function FetchData({setData}) {
    useEffect(()=>{
        const getData = async()=>{
            try{
                let response = await fetch(import.meta.env.VITE_DATA_URL)
                if(!response.ok){
                     throw new Error("Response are not correct")
                }
                let result = await response.json()
                setData(result)
            }catch(err){
                console.log("Error",err)
            }
        }
        getData()
    },[])
  return (
    <>
    </>
  )
}

export default FetchData