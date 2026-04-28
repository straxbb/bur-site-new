export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, phone, location } = req.body || {};

  if (!name || !phone || !location) {
    return res.status(400).json({
      message: 'Имя, телефон и местоположение обязательны.',
    });
  }

  return res.status(200).json({
    message: 'Заявка отправлена. Мы скоро свяжемся с вами.',
  });
}
