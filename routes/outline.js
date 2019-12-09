const express = require('express');
const outlineRouter = express.Router();
const Outline = require('../models/Outline');

outlineRouter.route('/')
    .get((req, res, next) => {
        Outline.find({ user: req.user._id }, (err, outlines) => {
            if(err) {
                res.status(500);
                return next(err)
            }
            return res.send(outlines)
        })
    })
    .post((req, res, next) => {
        const outline = new Outline(req.body);
        outline.user = req.user._id;
        outline.save(function (err, newOutline) {
            if(err) {
                res.status(500);
                return next(err);
            }
            return res.status(201).send(newOutline);
        });
    });

outlineRouter.route('/:outlineId')
    .get((req, res, next) => {
        Outline.findOne({ _id: req.params.outlineId, user: req.user._id }, (err, outline) => {
            if(err) {
                res.status(500);
                return next(err);
            } else if(!outline) {
                res.status(404)
                return next(new Error('No outline found'));
            }
            return res.send(outline);
        })
    })

    .put((req, res, next) => {
        Outline.findOneAndUpdate(
            { _id: req.params.outlineId, user: req.user._id },
            req.body,
            { new: true },
            (err, outline) => {
                if(err) {
                    console.log('Error')
                    res.status(500);
                    return next(err);
                }
                return res.send(outline);
            }
        )
    })

    .delete((req, res, next) => {
        Outline.findOneAndRemove({ _id: req.params.outlineId, user: req.user._id}, (err, outline) => {
            if(err) {
                res.status(500);
                return next(err);
            }
            return res.send(outline)
        });
    });

module.exports = outlineRouter;