// Data tạm lưu bộ nhớ (RAM)
let tempData = [];

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { temp } = req.body;
    const timestamp = new Date().toLocaleTimeString();

    tempData.push({ time: timestamp, temp });

    // Giới hạn chỉ giữ 50 mẫu gần nhất
    if (tempData.length > 50) tempData.shift();

    res.status(200).json({ message: "OK" });
  }

  if (req.method === 'GET') {
    const labels = tempData.map(entry => entry.time);
    const data = tempData.map(entry => entry.temp);
    res.status(200).json({ labels, data });
  }
}
