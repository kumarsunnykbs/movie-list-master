import MoviesSchema from "@/models/movies.modal";

export const getMovies = async (id, res) => {
    const newAffiliateArticle = await MoviesSchema.find()
    const list =  newAffiliateArticle.filter((item)=>{
        if(item.userId === id){
            return true
        }else{
            return false
        }
    })
    return list
};

export const getMovieById = async (id, res) => {
    const newAffiliateArticle = await MoviesSchema.findById(id)
    return newAffiliateArticle
};

export const updateMovie = async (req, res) => {

    const createMovieData = req;
    const newAffiliateArticle = await MoviesSchema.findByIdAndUpdate(createMovieData._id, createMovieData)

    return res.status(201).json({
        data: newAffiliateArticle,
        message: "Movie Updated Successfully!",
    });
};

export const createMovie = async (req, res) => {
    const createMovieData = req;
    const newAffiliateArticle = await MoviesSchema.create(createMovieData)
    return newAffiliateArticle
};
