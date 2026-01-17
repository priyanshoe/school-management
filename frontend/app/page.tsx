'use client'
import { DatePicker } from "../components/app-date-picker";
import { DropdownClasses, DropdownSubjects } from "@/components/app-dropdown";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Label } from "@/components/ui/label"


export default function Home() {
  const router = useRouter();
  const [signInData, setSignInData] = useState({ email: "", password: "" })

  async function handleSignIn() {
    try {
      const responsePromise = axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/teacher/signIn`, signInData, { withCredentials: true })
      toast.promise(responsePromise,
        {
          loading: "Connecting...",
          success: (res) => res.data.message,
          error: (err) => err?.response?.data?.message || "Failed, try again"
        })
      const response = await responsePromise
      if (response) {
        const route = response.data.data.role
        return router.push(`/${route}`)
      }
    } catch (err) {
      return console.log(err);
    }
  }


  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    photo: "",
    phone: "",
    address: "",
    bio: "",
    dob: "2026-01-10",
    blood_group: "",
    password: ""
  })
  async function handleSignUp() {
    try {
      const responsePromise = axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/teacher/signUp`, signUpData, { withCredentials: true })
      toast.promise(responsePromise,
        {
          loading: "Connecting...",
          success: (res) => res.data.message,
          error: (err) => err?.response?.data?.message || "Failed, try again"
        })
      const response = await responsePromise
      const createdID = response.data.data
      if(response) return router.push(`/lists/teachers/${createdID}`)
      console.log(response,createdID);

    } catch (err) {
      return console.error(err);
    }
  }


  return (
    <div id="main" className="h-screen w-full flex">

      {/* SIGNIN */}
      <div id="left" className="h-full w-1/2 flex flex-col items-center justify-center gap-4">

        <h1 className="text-xl ">SignIN</h1>
        <div className="flex gap-2 items-center">
          <Label htmlFor="email" className="w-25 text-end ">Email</Label>
          <Input type="email" name="email" placeholder="email" value={signInData.email} onChange={(e) => setSignInData({ ...signInData, email: e.target.value })}></Input>
        </div>
        <div className="flex gap-2 items-center">
          <Label htmlFor="password" className="w-25 text-end ">Password</Label>
          <Input type="password" name="password" placeholder="password" onChange={(e) => setSignInData({ ...signInData, password: e.target.value })}></Input>
        </div>
        <Button variant={'secondary'} onClick={handleSignIn}>SignIN</Button>

      </div>

      {/* SIGNUP */}
      <div id="right" className="h-full w-1/2 flex flex-col items-center justify-center gap-4">

        <div className="flex gap-4 items-center">
          <Label htmlFor="name" className="w-20 flex justify-end">Name</Label>
          <Input type="name" placeholder="name" value={signUpData.name} onChange={(e) => setSignUpData({ ...signUpData, name: e.target.value })}></Input>
        </div>
        <div className="flex gap-4 items-center">
          <Label htmlFor="email" className="w-20 flex justify-end">Email</Label>
          <Input type="email" placeholder="email" value={signUpData.email} onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}></Input>
        </div>
        <div className="flex gap-4 items-center">
          <Label htmlFor="email" className="w-20 flex justify-end">Password</Label>
          <Input type="password" placeholder="parword" value={signUpData.password} onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}></Input>
        </div>
        <div className="flex gap-4 items-center">
          <Label htmlFor="phone" className="w-20 flex justify-end">Phone</Label>
          <Input type="text" placeholder="phone" value={signUpData.phone} onChange={(e) => setSignUpData({ ...signUpData, phone: e.target.value })}></Input>
        </div>
        <div className="flex gap-4 items-center">
          <Label htmlFor="address" className="w-20 flex justify-end">Address</Label>
          <Input type="text" placeholder="address" value={signUpData.address} onChange={(e) => setSignUpData({ ...signUpData, address: e.target.value })}></Input>
        </div>
        <div className="flex gap-4 items-center">
          <Label htmlFor="photo" className="w-25 flex justify-end">Photo URL</Label>
          <Input type="text" placeholder="photo URL ONLY" value={signUpData.photo} onChange={(e) => setSignUpData({ ...signUpData, photo: e.target.value })}></Input>
        </div>
        <div className="flex gap-4 items-center">
          <Label htmlFor="bio" className="w-20 flex justify-end">Bio</Label>
          <Input type="text" placeholder="bio" value={signUpData.bio} onChange={(e) => setSignUpData({ ...signUpData, bio: e.target.value })}></Input>
        </div>
        {/* <div className="w-65 flex gap-2">
          <DropdownSubjects />
          <DropdownClasses />
        </div> */}
        <div className="flex gap-4 items-center">
          <Label htmlFor="bloodgroup" className="w-32 flex justify-end">Blood Group</Label>
          <Input type="text" placeholder="bloodgroup" name="bloodgroup" value={signUpData.blood_group} onChange={(e) => setSignUpData({ ...signUpData, blood_group: e.target.value })} />
        </div>
        <DatePicker />
        <Button variant={'secondary'} onClick={handleSignUp}>SignUP</Button>

      </div>

    </div>
  )
}