import crypto from 'crypto';

export default function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { password } = req.body;
    const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;

    if (!adminPasswordHash) {
        return res.status(500).json({ error: 'Server misconfiguration' });
    }

    const hash = crypto.createHash('sha256').update(password).digest('hex');

    if (hash === adminPasswordHash) {
        return res.status(200).json({ success: true });
    } else {
        return res.status(401).json({ success: false, error: 'Invalid password' });
    }
}