import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method === 'GET') {
    const authHeader = req.headers.authorization;
    if (authHeader !== 'Bearer john99mn') {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
      // In Vercel environments, reading local files requires process.cwd()
      const filePath = path.join(process.cwd(), 'api', 'submissions.json');
      let submissions = [];
      if (fs.existsSync(filePath)) {
        const fileData = fs.readFileSync(filePath, 'utf8');
        submissions = JSON.parse(fileData);
      }
      res.status(200).json(submissions);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to read submissions' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
