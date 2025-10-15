const Email = require('../models/emailModels');
exports.saveEmail = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    const newEmail = new Email({ email });
    await newEmail.save();
    res.status(201).json({ message: 'Email saved successfully', email: newEmail });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: 'Email already exists' });
    } else {
      res.status(500).json({ message: 'Server Error', error });
    }
  }
};

exports.getEmails = async (req, res) => {
    try {
      const emails = await Email.find();
      res.status(200).json(emails);
    } catch (error) {
      res.status(500).json({ message: 'Server Error', error });
    }
  };