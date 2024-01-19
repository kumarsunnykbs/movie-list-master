"use client"
import { useRouter } from "next/navigation";
import { useEffect } from "react"

export default function Home() {
  const route = useRouter()
  useEffect(() => {
    const sessionId = localStorage.getItem("session");
    if (sessionId) {
      route.push("/movie-list")
    } else {
      route.push("/sign-in")
    }
    // eslint-disable-next-line
  }, [])

  return (<div />)
}
