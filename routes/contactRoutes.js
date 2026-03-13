import express from 'express';
import Contact from '../models/Contact.js';

const router = express.Router();

// @route   POST api/contact
// @desc    Submit a contact form
router.post('/', async (req, res) => {
    console.log('Received contact form submission:', req.body);
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    try {
        const newContact = new Contact({
            name,
            email,
            subject,
            message
        });

        const savedContact = await newContact.save();
        res.status(201).json({
            success: true,
            data: savedContact,
            msg: 'Message sent successfully!'
        });
    } catch (err) {
        console.error('Submission Error:', err.message);
        res.status(500).json({ success: false, msg: 'Server Error, please try again later.' });
    }
});

export default router;
