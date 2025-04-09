import React, { useEffect } from 'react'
import ConfigButton from './adminComponents/configButton'
import i18n, { initializeI18n } from '../../../lib/lang'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
export default function Admindashbord() {
  const t=useTranslation()
  const toggleLanguage=useSelector((state) => state.toggle.value);
  return (
    <div className='flex flex-col text-center bg-slate-200 mt-10'>
      <p>{i18n.t("admindashboard")}</p>
      <div className='flex justify-center gap-5 bg-white p-10'>
       <ConfigButton color='red'  link='/usersconfig'>{i18n.t("users")}</ConfigButton>
       <ConfigButton color='blue' link='/productsconfig'>{i18n.t("products")}</ConfigButton>
       <ConfigButton color='green' link='/cartsconfig'>{i18n.t("carts")}</ConfigButton>
       <ConfigButton color='yellow' link='/ordersconfig'>{i18n.t("orders")}</ConfigButton>
       </div>
    </div>
  )
}
