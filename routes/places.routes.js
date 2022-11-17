const express = require('express');
const router = express.Router();

const Place = require('./../models/place.model')

router.get('/list', (req, res, next) => {

  Place
    .find()
    .then(places => {
      res.render('places/list', { places })
    })
    .catch(err => (err))
});

router.get('/create', (req, res, next) => {

  res.render('places/create')
});

router.post('/create', (req, res, next) => {
  const { name, type, latitude, longitude } = req.body
  let location = {
    type: 'Point',
    coordinates: [latitude, longitude]
  }

  Place
    .create({ name, type, location })
    .then(() => {
      res.redirect('/places/list')
    })
    .catch(err => console.log(err))
})

router.get('/details/:place_id', (req, res) => {
  const { place_id } = req.params

  Place
    .findById(place_id)
    .then(place => {
      res.render('places/details', { place })
    })
    .catch(err => console.log(err))
})

router.get('/update/:place_id', (req, res, next) => {

  const { place_id } = req.params

  Place
    .findById(place_id)
    .then(place => {
      res.render('places/update', place)
    })
    .catch(err => console.log(err))
})

router.post('/update/:place_id', (req, res, next) => {

  const { name, type } = req.body
  const { place_id } = req.params

  Place
    .findByIdAndUpdate(place_id, { name, type })
    .then(() => res.redirect(`/places/details/${place_id}`))
    .catch(err => console.log(err))
})

router.post('/delete/:place_id', (req, res, next) => {

  const { place_id } = req.params

  Place
    .findByIdAndDelete(place_id)
    .then(() => res.redirect('/places/list'))
    .catch(err => console.log(err))

})

module.exports = router;
