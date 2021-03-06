const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Profile , User } = require('../../models');


// get all profiles
router.get('/', (req, res) => {
  console.log('======================');
  Profile.findAll({
    attributes: [
      'id',
      'subscription',
      'price',
      'date',
      'user_id',
    ],
    include: [
  
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbProfileData => res.json(dbProfileData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  console.log(req.params)
  Profile.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'subscription',
      'price',
      'date',
      'user_id',
    ],
    include: [
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbProfileData => {
      if (!dbProfileData) {
        res.status(404).json({ message: 'No profile found with this id' });
        return;
      }
      res.json(dbProfileData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


router.post('/', (req, res) => {
  // expects {title: 'Taskmaster goes public!', post_url: 'https://taskmaster.com/press', user_id: 1}
  if (req.session) {
    
    Profile.create({
      subscription: req.body.subscription,
      price: req.body.price,
      user_id: req.session.user_id || req.body.user_id,
      date: req.body.date
      
    })
      .then(dbProfileData => res.json(dbProfileData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
    
  }
});


router.put('/:id', (req, res) => {
  Profile.update(
    {
      title: req.body.title
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then(dbProfileData => {
      if (!dbProfileData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.json(dbProfileData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
  console.log('id', req.params.id);
  Profile.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbProfileData => {
      if (!dbProfileData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.json(dbProfileData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});



module.exports = router;
