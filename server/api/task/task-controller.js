const User = require('../../model/user-model');
const Task = require('../../model/task-model');
const moment = require('moment');

const auth = require('../../services/authService');


module.exports = {
    index: function (req, res) {

        Task.find({})
            .populate('author', 'username', 'user')
            .then((tasks)=>{
            res.status(200).json({tasks: tasks})

        })
            .catch((err) => next(err));
    },
    create: function (req, res) {

        const id = auth.getUserId(req);
        User.findOne({_id: id}, (err, user) => {
            if (err && !user) {
                return res.status(500).json();
            }
            const task = new Task(req.body.task);
            task.author = user._id;
            task.dueDate = moment(task.dueDate);
            task.save(err => {
                if (err) {
                    return res.status(500).json();
                }
                return res.status(201).json();
            })
        })
        return res.status(201).json();
    },
    update: function (req, res) {

        const id =  auth.getUserId(req);

        User.findOne({_id: id}, (err, user) => {
            if (err) return res.status(500).json();
            if (!user) return res.status(404).json();

            const task = req.body.task;
            task.author = user._id;
            task.dueDate = moment(task.dueDate);
            Task.findByIdAndUpdate({_id: task._id}, task, err => {
                if (err) return res.status(500).json();
                return res.status(204).json();
            })
        })

    },
    remove: function (req, res) {

        const id =  auth.getUserId(req);
        Task.findOne({_id: req.params.id}, (err, task) => {
            if (err) return res.status(500).json();
            if (!task) return res.status(404).json();
            if (task.author._id.toString() !== id) {
                return res.status(403).json({message: 'Not allowed to delete another user post'})
            }
            Task.deleteOne({_id: req.params.id}, err => {
                if (err) return res.status(500).json()
                return res.status(204).json();
            })
        })
    },
    show: function (req, res) {

        Task.findOne({_id: req.params.id}, (err, task) => {
            if (err) {
                return res.status(500).json();
            }
            if (!task) {
                return res.status(404).json();
            }
            return res.status(200).json({task: task});
        })

    }
}

