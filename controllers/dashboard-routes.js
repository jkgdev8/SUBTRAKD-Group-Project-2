const router = require('express').Router();
const sequelize = require('../config/connection');
const { Profile , User } = require('../models');

router.get('/', (req, res) => {
    Profile.findAll({
      where: {
        // use the ID from the session
        user_id: req.session.user_id
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
        // serialize data before passing to template
        const Profiles = dbProfileData.map(Profile => Profile.get({ plain: true }));
        res.render('dashboard', { Profiles, loggedIn: true });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

//   router.get('/edit/:id', (req, res) => {
//     Profile.findOne({
//       where: {
//         id: req.params.id
//       },
//       attributes: [
//         'id',
//         'subscription',
//         'price',
//         'date',
//         'user_id',
//       ],
//       include: [
        
//         {
//           model: User,
//           attributes: ['username']
//         }
//       ]
//     })
//       .then(dbProfileData => {
//         if (!dbProfileData) {
//           res.status(404).json({ message: 'No Profile found with this id' });
//           return;
//         }
  
//         // serialize the data
//         const Profile = dbProfileData.get({ plain: true });

//         res.render('edit-Profile', {
//             Profile,
//             loggedIn: true
//             });
//       })
//       .catch(err => {
//         console.log(err);
//         res.status(500).json(err);
//       });
// });

// router.get('/create/', (req, res) => {
//     Profile.findAll({
//       where: {
//         // use the ID from the session
//         user_id: req.session.user_id
//       },
//       attributes: [
//         'id',
//         'subscription',
//         'price',
//         'date',
//         'user_id',
//       ],
//       include: [
       
//         {
//           model: User,
//           attributes: ['username']
//         }
//       ]
//     })
//       .then(dbProfileData => {
//         // serialize data before passing to template
//         const Profiles = dbProfileData.map(Profile => Profile.get({ plain: true }));
//         res.render('create-Profile', { Profiles, loggedIn: true });
//       })
//       .catch(err => {
//         console.log(err);
//         res.status(500).json(err);
//       });
//   });


module.exports = router;