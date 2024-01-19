"use client";
import React, { useEffect, useState } from "react";
import MoviesList from "@/components/MoviesList";
import NoMoviesFound from "@/components/NoMoviesFound";
import AppLayout from "@/components/layout";
import { getMovies } from "@/API-Calls/Others";
import AppLoader from "@/components/AppLoader";

const MovieList = () => {
  const [moviesList, setMoviesList] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const fetchMovies = async () => {
    setLoading(true)
    const id = localStorage.getItem("session")
    const result = await getMovies(id)
    setLoading(false)
    setMoviesList(result)
  }

  useEffect(() => {
    fetchMovies()
  }, []);

  if (moviesList.length) {
    return (
      <AppLayout>
        <MoviesList moviesList={moviesList} />
      </AppLayout>
    )
  } else if (isLoading) {
    return (
      <AppLayout>
        <AppLoader />
      </AppLayout>
    )
  } else {
    return (
      <AppLayout>
        <NoMoviesFound />
      </AppLayout>
    )
  }

};

export default MovieList;
