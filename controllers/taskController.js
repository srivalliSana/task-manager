import Task from "../models/taskModel.js";

export const createTask = async (req, res) => {
  try {
    const newTask = await Task.create({
      title: req.body.title,
      description: req.body.description,
      user: req.user.id,
      attachment: req.file ? req.file.path : null,
    });
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getTasks = async (req, res) => {
  try {
    const { page = 1, limit = 5, completed, sortBy = "createdAt" } = req.query;
    const filter = { user: req.user.id };
    if (completed) filter.completed = completed === "true";

    const tasks = await Task.find(filter)
      .sort({ [sortBy]: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
