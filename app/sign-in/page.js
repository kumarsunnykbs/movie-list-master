"use client"
import AppLoader from "@/components/AppLoader";
import SignInForm from "@/components/SignInForm";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SignIn() {
  const router = useRouter()
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sessionId = localStorage.getItem("session");
    if (sessionId) {
      router.push("/movie-list")
    } else {
      setLoading(false)
    }
    // eslint-disable-next-line
  }, [])

  if (loading) {
    return (
      <AppLoader />
    );
  }

  return (
    <SignInForm />
  );
}
