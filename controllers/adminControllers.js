const User = require('../models/User');
const Plan = require('../models/Plan');
const Investment = require('../models/Investment');

// Example: Get all users
exports.getAllUsers = async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
};

// Example: Create a plan
exports.createPlan = async (req, res) => {
  const { name, amount, roiPercent, durationDays } = req.body;
  const plan = new Plan({ name, amount, roiPercent, durationDays });
  await plan.save();
  res.status(201).json(plan);
};

// Example: Approve Payout (mark ROI as paid)
exports.approvePayout = async (req, res) => {
  const { investmentId } = req.body;
  const investment = await Investment.findById(investmentId);
  if (!investment) return res.status(404).json({ message: 'Investment not found' });
  investment.completed = true;
  await investment.save();
  res.json({ message: 'Payout approved' });
};
