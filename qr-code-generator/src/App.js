import React, { useState } from 'react';
import axios from 'axios';

function App() {
  // State to hold the form inputs and the QR code
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [qrCode, setQrCode] = useState(null);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send a POST request to the server to generate the QR code
    try {
      const response = await axios.post('http://localhost:5000/generate_qr', {
        name,
        phone,
        address,
      });

      // Set the generated QR code URL
      setQrCode(response.data.qrCode);
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>QR Code Generator</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <div>
          <label>Name: </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Phone Number: </label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Address: </label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <button type="submit">Generate QR Code</button>
      </form>

      {qrCode && (
        <div>
          <h2>Your QR Code:</h2>
          <img src={qrCode} alt="QR Code" />
        </div>
      )}
    </div>
  );
}

export default App;
