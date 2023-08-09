import React, { useReducer } from "react";
import axios from "axios";
import "./App.css"

const api = axios.create({
  baseURL: "https://api.mercadopago.com"
});

api.interceptors.request.use(async config => {
  const token = process.env.REACT_APP_NOT_SECRET_CODE
  config.headers.Authorization = `Bearer ${token}`

  return config
})

const formReducer = (state, event) => {
  return {
    ...state,
    [event.name]: event.value
  }
}

function App() {

  const [formData, setFormdata] = useReducer(formReducer, {})

  const handleChange = event => {
    setFormdata({
      name: event.target.name,
      value: event.target.value
    })
  }
  const handleSubmit = (event) => {
    event.preventDefault()

    const body = {
      "transaction_amount": 30
    }
    api.post("v1/payments", body).then(Response => {

    }).catch(err => {
      alert(err)
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>API do Mercado Pago para PIX</p>

        <br />
        <form onSubmit={handleSubmit}>
          <div>
            <label>E-mail</label>
            <input onChange={handleChange} name="email" />
          </div>

          <div>
            <label>Nome</label>
            <input onChange={handleChange} name="nome" />
          </div>

          <div>
            <label>CPF</label>
            <input onChange={handleChange} name="cpf" />
          </div>

          <div>
            <button type="submit">Pagar</button>
          </div>

        </form>
      </header>
    </div>
  );
}

export default App;
