const Image = require('../models/eventimage');

exports.image = (req, res, next) => {
    Image.findById(req.params.id).exec((err, result) => {
        if (err) return next(err);
        let image = result.image.data;
        let contentType = result.image.contentType;
        res.status(200).set({'Content-Type': contentType, 'Content-Length': image.length}).send(image);
    });
}