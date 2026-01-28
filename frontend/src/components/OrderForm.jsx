import { useState } from 'react'

function OrderForm({ onOrderAdded }) {
    const [customerName, setCustomerName] = useState("")
    const [totalAmount, setTotalAmount] = useState("")

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
            onOrderAdded(data) // Avvisiamo il padre (App.jsx)
            setCustomerName("")
            setTotalAmount("")
        })
        .catch(error => console.error("Errore invio:", error))
    }

    return (
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
                    placeholder="€" 
                    value={totalAmount}
                    onChange={(e) => setTotalAmount(e.target.value)}
                    required
                    style={{ padding: "10px", width: "100px" }}
                />
                <button type="submit" style={{ padding: "10px 20px", background: "#007bff", color: "white", border: "none", cursor: "pointer", borderRadius: "5px" }}>
                    Invia 🚀
                </button>
            </form>
        </div>
    )
}

export default OrderForm