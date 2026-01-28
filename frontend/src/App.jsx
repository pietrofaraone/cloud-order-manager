import { useState, useEffect } from 'react'

function App() {
  const [orders, setOrders] = useState([])
  
  const [customerName, setCustomerName] = useState("")
  const [totalAmount, setTotalAmount] = useState("")

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = () => {
    fetch('http://localhost:8080/orders')
      .then(response => response.json())
      .then(data => setOrders(data))
      .catch(error => console.error("Errore:", error))
  }

  const handleSubmit = (e) => {
    e.preventDefault() 

    const newOrder = {
      customerName: customerName,
      totalAmount: parseFloat(totalAmount) 
    }

    fetch('http://localhost:8080/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newOrder)
    })
    .then(response => response.json())
    .then(data => {
      console.log("Ordine creato:", data)
      setOrders([...orders, data]) 
      setCustomerName("")
      setTotalAmount("")
    })
    .catch(error => console.error("Errore invio:", error))
  }

  return (
    <div style={{ padding: "40px", fontFamily: "Arial", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ color: "#333" }}>📦 Cloud Order Manager</h1>
      
      {/* --- MODULO DI INSERIMENTO --- */}
      <div style={{ background: "#eee", padding: "20px", borderRadius: "10px", marginBottom: "30px" }}>
        <h3>Aggiungi Nuovo Ordine</h3>
        <form onSubmit={handleSubmit} style={{ display: "flex", gap: "10px" }}>
          <input 
            type="text" 
            placeholder="Nome Cliente" 
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
            style={{ padding: "10px", flex: 1 }}
          />
          <input 
            type="number" 
            placeholder="Importo (€)" 
            value={totalAmount}
            onChange={(e) => setTotalAmount(e.target.value)}
            required
            style={{ padding: "10px", width: "100px" }}
          />
          <button type="submit" style={{ 
            padding: "10px 20px", 
            background: "#007bff", 
            color: "white", 
            border: "none", 
            cursor: "pointer",
            borderRadius: "5px"
          }}>
            Invia 🚀
          </button>
        </form>
      </div>

      {/* --- LISTA ORDINI --- */}
      <h2>Lista Ordini ({orders.length})</h2>

      {orders.length === 0 ? (
        <p>Nessun ordine presente.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {orders.map(order => (
            <li key={order.id} style={{ 
              borderBottom: "1px solid #ccc", 
              padding: "15px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}>
              <div>
                <strong>{order.customerName}</strong>
                <div style={{ fontSize: "0.8em", color: "gray" }}>ID: {order.id}</div>
              </div>
              <div style={{ fontWeight: "bold", fontSize: "1.2em", color: "green" }}>
                {order.totalAmount} €
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default App