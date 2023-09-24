// Export a middleware function called 'setFlash'
module.exports.setFlash = function (req, res, next) {
    // Create an object 'res.locals.flash' to store flash messages
    res.locals.flash = {
        'success': req.flash('success'), // Get success flash messages from the request
        'error': req.flash('error')     // Get error flash messages from the request
    };

    // Call 'next()' to pass control to the next middleware or route handler
    next();
};
