exports.get404Page = (req, res, next) => {
    res.status(404).render('404', {
        docTitle: '404 Page',
        path: req.path
    });
};
