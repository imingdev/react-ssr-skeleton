module.exports = (app) => {
  app.view.use('react', require('./app/render/react'));
};
