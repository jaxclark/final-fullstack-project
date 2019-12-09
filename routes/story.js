const express = require('express');
const storyRouter = express.Router();
const Story = require('../models/Story');

storyRouter.route('/')
    .get((req, res, next) => {
        Story.find({ user: req.user._id }, (err, story) => {
            if(err) {
                res.status(500);
                return next(err);
            }
            return res.status(story);
        })
    })

    .post((req, rest, next) => {
        const story = new Story(req.body);
        story.user = req.user._id;
        story.save(function (err, newStory) {
            if(err) {
                res.status(500);
                return next(err);
            }
            return res.status(201).send(newTodo);
        })
    })

storyRouter.route('/:storyId')
    .get((req, res, next) => {
        Story.findOne({ _id: req.params.storyId, user: req.user._id }, (err, story) => {
            if(err) {
                res.status(500);
                return next(err);
            } else if(!story) {
                res.status(404)
                return next(new Error('No story found'))
            }
            return res.send(story);
        })
    })

    .put((req, res, next) => {
        Story.findOneAndUpdate(
            { _id: req.params.storyId, user: req.user._id },
            req.body,
            { new: true },
            (err, story) => {
                if(err) {
                    console.log('Error');
                    res.status(500);
                    return next(err);
                }
                return res.send(story)
            }
        )
    })

    .delete((req, res, next) => {
        Story.findOneAndRemove({ _id: req.params.storyId, user: req.user._id }, (err, story) => {
            if(err) {
                res.status(500);
                return next(err);
            }
            return res.send(story);
        });
    });

module.exports = storyRouter;