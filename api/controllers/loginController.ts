import User from '../models/User';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const loginController = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ message: 'Fel användarnamn eler lösenord' });
    
    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(401).json({ message: 'Fel användarnamn eller lösenord' });

        const token = jwt.sign({ id: user._id }, 'secretkey', { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true });
        res.json({ message: 'Inloggning lyckades' });
    } catch (error) {
        res.status(500).json({ message: 'Serverfel' });
    }
}

export { loginController };
