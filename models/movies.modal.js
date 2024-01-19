import mongoose from "mongoose";
const Schema = mongoose.Schema;

export const moviesSchema = new Schema(
    {
        year: String,
        title: String,
        image: String,
        userId: String,
    },
    { timestamps: true }
);

const movies = mongoose.models.movies || mongoose.model("movies", moviesSchema);

export default movies;