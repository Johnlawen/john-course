import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, country } = req.body || {};
    
    // Log the submission so it appears in the Vercel Runtime Logs
    console.log("=== NEW WAITLIST SUBMISSION ===");
    console.log(`Name:    ${name}`);
    console.log(`Email:   ${email}`);
    console.log(`Country: ${country}`);
    console.log("===============================");

    try {
      const filePath = path.join(process.cwd(), 'api', 'submissions.json');
      let submissions = [];
      if (fs.existsSync(filePath)) {
        const fileData = fs.readFileSync(filePath, 'utf8');
        submissions = JSON.parse(fileData);
      }
      
      submissions.push({
        name: name || 'N/A',
        email: email || 'N/A',
        country: country || 'N/A',
        date: new Date().toISOString()
      });
      
      fs.writeFileSync(filePath, JSON.stringify(submissions, null, 2));
    } catch (err) {
      console.error("Failed to save submission:", err);
    }

    res.status(200).json({ message: 'Success' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
