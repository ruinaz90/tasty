const Date = require('../models/Date');

module.exports = {
  getDates: async (req, res) => {
    console.log(req.user);
    try {
      const dates = await Date.find({ userId: req.user.id });
      res.render('dates.ejs', { user: req.user, dates: dates });
    } catch (err) {
      console.log(err);
    }
  },
  createDate: async (req, res) => {
    const date = req.body.date;
    const mealType = req.body.mealType;
    const foodItems = req.body.foodItems;

    try {
      const newDate = await Date.create({
        userId: req.user.id,
        [mealType]: foodItems,
        date: date,
      });
      console.log(newDate);
      res.redirect('/dates');
    } catch (err) {
      console.log(err);
    }
  },
  updateDate: async (req, res) => {
    try {
      await Date.findOneAndUpdate({date:req.body.date},{
      [req.body.mealType]: req.body.foodItems,
      })
      console.log('Meal Updated')
      res.json('Meal Updated')
    } catch (err) {
      console.log(err);
    }
  },
  deleteDate: async (req, res) => {
    console.log(req.body.dateId);
    try {
      await Date.findOneAndDelete({_id:req.body.dateId})
      console.log('Deleted Item')
      res.json('Deleted Item')
    } catch (err) {
      console.log(err);
    }
  },
};
