import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/auth/register.css';

const Register = () => {
  const navigate = useNavigate();

  const [userType, setUserType] = useState('fizicko'); // 'fizicko' or 'kompanija'

 const [formData, setFormData] = useState({
  ime: '',
  prezime: '',
  kompanija: '',
  email: '',
  grad: '',
  adresa: '',
  brojTelefona: '',
  lozinka: '',
  confirmLozinka: '', 
});


  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (formData.lozinka !== formData.confirmLozinka) {
        setError("Lozinke se ne podudaraju.");
        setLoading(false);
        return;
  }

    const payload = {
      username: formData.email,
      email: formData.email,
      password: formData.lozinka,
      firstname: userType === 'fizicko' ? formData.ime : '',
      lastname: userType === 'fizicko' ? formData.prezime : '',
      companyName: userType === 'kompanija' ? formData.kompanija : '',
      city: formData.grad,
      address: formData.adresa,
      phoneNumber: formData.brojTelefona,
      userType, // Include the user type in payload
    };

    try {
      //const res = await fetch('http://localhost:5000/api/users/register', {
      const res = await fetch('https://prodexmd.ba/api/users/register', {
          //const response = await axios.post('https://prodexmd.ba/api/upload', formNew,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const message = await res.text();
        throw new Error(message || 'Registration failed');
      }

      const data = await res.json();
      //console.log('Registration successful', data);

      // alert('Registration successful. Please check your email to verify your account.');
      alert('Registracija uspješna.Provjerite vaš email da verifikujete nalog.');
      navigate('/auth/login');

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="registration-wrapper">
      <div className="registration-page" style={{ maxWidth: '400px', margin: 'auto', padding: '20px' }}>
        <h2>Registracija</h2>

        {/* Radio Buttons */}
        <div style={{ marginBottom: '20px' }}>
          <label>
            <input
              type="radio"
              name="userType"
              value="fizicko"
              checked={userType === 'fizicko'}
              onChange={() => setUserType('fizicko')}
            />{' '}
            Fizičko Lice
          </label>
          {' '}
          <label>
            <input
              type="radio"
              name="userType"
              value="kompanija"
              checked={userType === 'kompanija'}
              onChange={() => setUserType('kompanija')}
            />{' '}
            Kompanija
          </label>
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <form onSubmit={handleSubmit}>
          {userType === 'fizicko' ? (
            <>
              <div className="form-group">
                <label htmlFor="ime">Ime:</label>
                <input
                  type="text"
                  id="ime"
                  name="ime"
                  value={formData.ime}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="prezime">Prezime:</label>
                <input
                  type="text"
                  id="prezime"
                  name="prezime"
                  value={formData.prezime}
                  onChange={handleChange}
                  required
                />
              </div>
            </>
          ) : (
            <div className="form-group">
              <label htmlFor="kompanija">Naziv Kompanije:</label>
              <input
                type="text"
                id="kompanija"
                name="kompanija"
                value={formData.kompanija}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="grad">Grad:</label>
            <input
              type="text"
              id="grad"
              name="grad"
              value={formData.grad}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="adresa">Adresa:</label>
            <input
              type="text"
              id="adresa"
              name="adresa"
              value={formData.adresa}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="brojTelefona">Broj Telefona:</label>
            <input
              type="text"
              id="brojTelefona"
              name="brojTelefona"
              value={formData.brojTelefona}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="lozinka">Lozinka:</label>
            <input
              type="password"
              id="lozinka"
              name="lozinka"
              value={formData.lozinka}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmLozinka">Potvrdi Lozinku:</label>
            <input
              type="password"
              id="confirmLozinka"
              name="confirmLozinka"
              value={formData.confirmLozinka}
              onChange={handleChange}
              required
            />
          </div>


          <button type="submit" disabled={loading}>
            {loading ? 'Registracija...' : 'Registruj se'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
