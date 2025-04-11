'use client'
import Cookies from "js-cookie"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { toggle } from "../../../features/languageSlice/languageSlice"
import i18n from "../../../lib/lang"
export default function Page() {
  const [orders, setOrders] = useState([])
  const [sortAsc, setSortAsc] = useState(true)
  const t=useTranslation()
  const toggleLanguage=useSelector((state)=>state.toggle.value)
  const fetchOrders = async () => {
    try {
      const res = await fetch("http://localhost:3002", {
        method: "GET",
        headers: {
          token: Cookies.get("token")
        },
      })
      const data = await res.json()
      setOrders(data.orders || [])
    } catch (error) {
      console.error("Error fetching orders:", error)
    }
  }

  const toggleSort = () => {
    const sorted = [...orders].sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime()
      const dateB = new Date(b.createdAt).getTime()
      return sortAsc ? dateB - dateA : dateA - dateB
    })
    setOrders(sorted)
    setSortAsc(!sortAsc)
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  return (
    <div className="p-4">
      <button
        onClick={toggleSort}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        {i18n.t('SortBy')} ({sortAsc ? i18n.t('newest') : i18n.t('oldest')})
      </button>

      {orders.map((order, i) => (
        <div key={order._id} className="border border-gray-300 rounded p-4 mb-6">
          <h2 className="text-lg font-bold mb-2">{i18n.t('ID')}: {order._id}</h2>
          <p><strong>{i18n.t('Adress')}:</strong> {order.address}</p>
          <p><strong>{i18n.t('Phone')}:</strong> {order.phoneNo}</p>
          <p><strong>{i18n.t('Price')}:</strong> ${order.totalPrice}</p>
          <p><strong>{i18n.t('Status')}:</strong> {order.completed ? "Completed" : "Pending"}</p>
          <p><strong>{i18n.t('createdat')}:</strong> {new Date(order.createdAt).toLocaleString()}</p>

          <h3 className="mt-4 font-semibold">{i18n.t('Products')}:</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
            {order.products.map((productEntry, j) => (
              <div key={productEntry._id} className="border p-2 rounded shadow">
                <img
                  src={`http://localhost:3003/uploads/${productEntry._id}`}
                  alt="Product"
                  className="w-full h-32 object-cover mb-2 rounded"
                />
                <p><strong>{i18n.t('ID')}:</strong> {productEntry.product}</p>
                <p><strong>{i18n.t('Price')}:</strong> ${productEntry.price}</p>
                <p><strong>{i18n.t('Quantity')}:</strong> {productEntry.quantity}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
