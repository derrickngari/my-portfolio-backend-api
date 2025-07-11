import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    technologies: { type: Array, required: true },
    githubUrl: { type: String, required: true },
    liveUrl: { type: String },
    featured: { type: Boolean, default: false}
},
{
    timestamps: true
}
);

const Project = mongoose.model("Project", ProjectSchema);

export default Project;