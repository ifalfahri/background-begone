import { removeBackgroundFromImageBase64 } from "@imgly/background-removal";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const file = req.body;
      const base64 = file.split(',')[1];
      
      const resultBase64 = await removeBackgroundFromImageBase64(base64);
      
      res.status(200).json({ image: resultBase64 });
    } catch (error) {
      console.error('Background removal error:', error);
      res.status(500).json({ error: 'Failed to process image' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}