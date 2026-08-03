import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const authHeader = req.headers.authorization;
    if (authHeader !== 'Bearer john99mn') {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // You MUST provide your Personal Access Token here or in Vercel Env Vars
    const FORMSPREE_TOKEN = process.env.FORMSPREE_TOKEN || "YOUR_FORMSPREE_TOKEN_HERE";

    try {
      const response = await fetch('https://formspree.io/api/0/forms/mpqezpdn/submissions', {
        headers: {
          'Authorization': `Bearer ${FORMSPREE_TOKEN}`
        }
      });

      if (!response.ok) {
        throw new Error(`Formspree responded with ${response.status}`);
      }

      const data = await response.json();
      
      // Map Formspree submissions to our expected format
      const submissions = (data.submissions || []).map(sub => ({
        name: sub.name || 'N/A',
        email: sub.email || 'N/A',
        country: sub.country || 'N/A',
        date: sub._date || new Date().toISOString()
      }));

      res.status(200).json(submissions);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to read submissions from Formspree' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

