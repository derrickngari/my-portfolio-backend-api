import Project from '../models/projectModel.js';

export const addProject = async (req, res) => {
    const { title, description, technologies, githubUrl, liveUrl, featured } = req.body;

    try {
        const newProject = new Project({
            title,
            imageUrl: req.file.path,
            description,
            technologies: JSON.parse(technologies),
            githubUrl,
            liveUrl,
            featured
        });

        await newProject.save();
        res.status(201).json(newProject);
    } catch (err) {
        console.log('Add proect controller error: ', err.message);
        res.status(500).json({ message: 'Server Error'});
    }
}

export const getProjects = async (req, res) => {
    try {
        const projects = await Project.find().sort({ createdAt: -1 });
        res.status(200).json(projects);
    } catch (err) {
        console.log('Get projects controller error: ', err.message);
        res.status(500).json({ message: 'Server Error'});
    }
}
