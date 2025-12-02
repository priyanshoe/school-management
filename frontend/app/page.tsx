'use client'
import { useRouter } from "next/navigation"

export default function Home(){
  const router = useRouter();
  return(
  <div className="">

    <h1 className="">Home page</h1>
    <button onClick={()=> router.push('/admin')} className="border-1 border-white">Admin login</button>
  </div>
)}