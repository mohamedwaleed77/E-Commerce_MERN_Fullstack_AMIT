import React, { useState } from 'react'
import Cookies from 'js-cookie'
import { useTranslation } from 'react-i18next'
import i18n from '../../../../lib/lang'

export default function Usercard(props) {
  const { _id, name, email, emailConfirmed, role } = props.user
  const t=useTranslation()

  const [isEditing, setIsEditing] = useState(false)
  const [editedUser, setEditedUser] = useState({ name, email, emailConfirmed, role })
  const [currentUser, setCurrentUser] = useState({ name, email, emailConfirmed, role })
  const [isVisible, setIsVisible] = useState(true) // State to control visibility after delete

  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete user: ${currentUser.name}?`)) return

    try {
      const res = await fetch(`http://localhost:3004/${_id}`, {
        method: 'DELETE',
        headers: {
          token: Cookies.get('token'),
        },
      })
      if (res.ok) {
        alert('User deleted.')
        setIsVisible(false) // Hide the card after deletion
      } else {
        alert('Failed to delete user.')
      }
    } catch (err) {
      console.error(err)
      alert('Error deleting user.')
    }
  }

  const handleEditClick = () => {
    setIsEditing(true)
  }

  const handleCancel = () => {
    setEditedUser(currentUser)
    setIsEditing(false)
  }

  const handleSubmit = async () => {
    try {
      const res = await fetch(`http://localhost:3004/${_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          token: Cookies.get('token'),
        },
        body: JSON.stringify(editedUser),
      })
      if (res.ok) {
        alert('User updated.')
        setCurrentUser(editedUser) // Update the UI instantly
        setIsEditing(false)
      } else {
        alert('Failed to update user.')
      }
    } catch (err) {
      console.error(err)
      alert('Error updating user.')
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setEditedUser((prev) => ({ ...prev, [name]: value }))
  }

  if (!isVisible) return null // Hide the component if isVisible is false

  return (
    <div className='bg-white flex rounded-2xl gap-12 p-5 w-100'>
      <div>
        {isEditing ? (
          <input
            className='text-2xl text-center bg-white p-1 rounded'
            name='name'
            value={editedUser.name}
            onChange={handleChange}
          />
        ) : (
          <p className='text-2xl text-center'>{currentUser.name}</p>
        )}

        <table className='mt-3'>
          <tbody>
            <tr className='bg-white'>
              <td><strong>{i18n.t("ID")}:</strong></td>
              <td>{_id}</td>
            </tr>
            <tr className='bg-gray-200'>
              <td><strong>{i18n.t("Email")}:</strong></td>
              <td className='text-center'>
                {isEditing ? (
                  <input
                    className='bg-white p-1 rounded'
                    name='email'
                    value={editedUser.email}
                    onChange={handleChange}
                  />
                ) : (
                  currentUser.email
                )}
              </td>
            </tr >
            <tr className='bg-white'>
              <td><strong>{i18n.t("emailconfirmed")}:</strong></td>
              <td className='text-center'>
                {isEditing ? (
                  <select
                    className='bg-white p-1 rounded'
                    name='emailConfirmed'
                    value={editedUser.emailConfirmed}
                    onChange={(e) =>
                      setEditedUser((prev) => ({
                        ...prev,
                        emailConfirmed: e.target.value === 'true',
                      }))
                    }
                  >
                    <option value='true'>{i18n.t("true")}</option>
                    <option value='false'>{i18n.t("false")}</option>
                  </select>
                ) : (
                  currentUser.emailConfirmed ?  i18n.t("true") :  i18n.t("false")
                )}
              </td>
            </tr>
            <tr className='bg-gray-200'>
              <td><strong>{i18n.t("Role")}:</strong></td>
              <td className='text-center'>
                {isEditing ? (
                  <input
                    className='bg-white p-1 rounded'
                    name='role'
                    value={editedUser.role}
                    onChange={handleChange}
                  />
                ) : (
                  currentUser.role
                )}
              </td>
            </tr>
          </tbody>
        </table>

        <div className='mt-4 flex gap-4 flex-wrap '>
          <button
            onClick={handleDelete}
            className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 cursor-pointer'
          >
            {i18n.t("Delete")}
          </button>

          {isEditing ? (
            <>
              <button
                onClick={handleSubmit}
                className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 cursor-pointer'
              >
                {i18n.t("Submit")}
              </button>
              <button
                onClick={handleCancel}
                className='bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 cursor-pointer'
              >
                {i18n.t("Cancel")}
              </button>
            </>
          ) : (
            <button
              onClick={handleEditClick}
              className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer'
            >
              {i18n.t("Edit")}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
