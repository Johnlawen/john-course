export default function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, country } = req.body || {};
    
    // Log the submission so it appears in the Vercel Runtime Logs
    console.log("=== NEW WAITLIST SUBMISSION ===");
    console.log(`Name:    ${name}`);
    console.log(`Email:   ${email}`);
    console.log(`Country: ${country}`);
    console.log("===============================");

    res.status(200).json({ message: 'Success' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
