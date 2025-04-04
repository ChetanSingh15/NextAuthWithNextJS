'use client'
import React, { useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'

export default function ProfilePage() {
  const router = useRouter()
  const [data, setData] = useState("nothing")

  const getUserDetails = async () => {
    try {
      const response = await axios.get("/api/users/me")
      console.log(response.data);
      setData(response.data.data._id)
    } catch (error: any) {
      console.log(error.message)
    }
  }

  const logout = async () => {
    try {
      await axios.get("/api/users/logout")
      toast.success("logout success")
      router.push("/login")
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>Profile Page</h1>
      <hr />
      <h2>{data === "nothing" ? "Nothing":<Link href={`/profile/${data}`}>{data}</Link>}</h2>
      <hr />
      <button
      className='bg-blue-500 hover:bg-blue-700 text-white font-bold mb-2 py-2 px-4 rounded'
      onClick={logout} 
      >Logout</button>
      <button
      className='bg-amber-500 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded'
      onClick={getUserDetails} 
      >User Details</button>
    </div>
  )
}
