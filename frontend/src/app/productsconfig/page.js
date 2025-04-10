'use client'
import React, { lazy, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import i18n from '../../../lib/lang';
import Cookies from 'js-cookie';
 
const Productcard = lazy(() => import('./productsconfigComponents/productcard'));
 
import Notfound from '../not-found';

export default function Page() {
  
  if (localStorage.getItem('role')!="admin"){
    return(<Notfound></Notfound>)
  }
  const t = useTranslation();
  const toggleLanguage = useSelector((state) => state.toggle.value);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 9;
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Form states
  const [nameInput, setNameInput] = useState('');
  const [categoryInput, setCategoryInput] = useState('');
  const [priceInput, setPriceInput] = useState('');
  const [quantityInput, setQuantityInput] = useState('');
  const [imageFile, setImageFile] = useState(null);

  // Filters
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filterInStock, setFilterInStock] = useState(false);
  const [filterOutOfStock, setFilterOutOfStock] = useState(false);
  const [sortOption, setSortOption] = useState('');
  const [availableCategories, setAvailableCategories] = useState([]);

  const fetchProducts = async () => {
    let allProducts = [];
    let currentPage = 1;
    let categoriesSet = new Set();

    try {
      while (true) {
        const res = await fetch(`http://localhost:3003/?page=${currentPage}`, {
          method: 'GET',
          headers: {
            token: Cookies.get('token'),
          },
        });
        const data = await res.json();
        if (data.products.length === 0) break;

        data.products.forEach(p => categoriesSet.add(p.category));
        allProducts = [...allProducts, ...data.products];
        currentPage++;
      }

      setProducts(allProducts);
      setAvailableCategories([...categoriesSet]);
      setFilteredProducts(allProducts);
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };

  useEffect(() => {
    let filtered = products.filter(product => {
      const nameMatches = product.name?.toLowerCase().includes(searchQuery.toLowerCase());
      const idMatches = product._id?.toLowerCase().includes(searchQuery.toLowerCase());
      const inStock = product.quantity > 0;

      let pass = nameMatches || idMatches;

      if (selectedCategory && product.category !== selectedCategory) pass = false;
      if (filterInStock && !inStock) pass = false;
      if (filterOutOfStock && inStock) pass = false;

      return pass;
    });

    // Sorting logic
    if (sortOption === 'name-asc') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === 'name-desc') {
      filtered.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortOption === 'price-asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-desc') {
      filtered.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(filtered);
    setPage(1);
  }, [searchQuery, products, selectedCategory, filterInStock, filterOutOfStock, sortOption]);

  const currentPageProducts = filteredProducts.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.ceil(filteredProducts.length / pageSize);

  const handleAddProduct = async () => {
    try {
      const productRes = await fetch('http://localhost:3003/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          token: Cookies.get('token')
        },
        body: JSON.stringify({
          name: nameInput,
          category: categoryInput,
          price: parseFloat(priceInput),
          quantity: parseInt(quantityInput)
        })
      });

      const productData = await productRes.json();
      if (!productRes.ok) throw new Error(productData.msg || productData.err || productData.error || 'Failed to create product');

      if (imageFile) {
        const formData = new FormData();
        formData.append('image', imageFile);

        await fetch(`http://localhost:3003/uploadImage/${productData._id}`, {
          method: 'POST',
          body: formData,
          headers: {
            token: Cookies.get('token')
          },
        });
      }

      fetchProducts();
      setShowAddProduct(false);
      setNameInput('');
      setCategoryInput('');
      setPriceInput('');
      setQuantityInput('');
      setImageFile(null);
      setErrorMsg('');
    } catch (err) {
      setErrorMsg(err.message);
      console.error('Error adding product:', err);
    }
  };

  const scrollToAddForm = () => {
    document.getElementById("addProductForm")?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className='flex flex-col items-center justify-center bg-blue-400 h-full'>
      <div className="flex items-center justify-center">
        <button
          onClick={() => {
            setShowAddProduct(!showAddProduct);
            if (!showAddProduct) scrollToAddForm();
          }}
          className="mt-5 px-4 py-2 bg-green-500 text-white rounded-full cursor-pointer"
        >
          + {i18n.t('AddProduct')}
        </button>
      </div>

      {showAddProduct && (
        <div id="addProductForm" className="mt-5 p-5 bg-white rounded-lg shadow-lg">
          <h3 className="text-xl mb-3">{i18n.t('AddProduct')}</h3>
          <input type="text" placeholder="Name" className="mb-3 p-2 w-full border rounded"
            value={nameInput} onChange={(e) => setNameInput(e.target.value)} />
          <input type="text" placeholder="Category" className="mb-3 p-2 w-full border rounded"
            value={categoryInput} onChange={(e) => setCategoryInput(e.target.value)} />
          <input type="number" placeholder="Price" className="mb-3 p-2 w-full border rounded"
            value={priceInput} onChange={(e) => setPriceInput(e.target.value)} />
          <input type="number" placeholder="Quantity" className="mb-3 p-2 w-full border rounded"
            value={quantityInput} onChange={(e) => setQuantityInput(e.target.value)} />
          <input type="file" accept="image/*" className="mb-3"
            onChange={(e) => setImageFile(e.target.files[0])} />

          <div className="flex gap-3 mt-4">
            <button onClick={handleAddProduct} className="px-4 py-2 bg-blue-500 text-white rounded">
              {i18n.t('AddProduct')}
            </button>
            <button onClick={() => setShowAddProduct(false)} className="px-4 py-2 bg-red-500 text-white rounded">
              {i18n.t('Cancel')}
            </button>
          </div>
          {errorMsg && <p className="text-red-500 ml-3 mt-2">{errorMsg}</p>}
        </div>
      )}

      <div className="flex flex-col items-center mt-10 w-full ">
        <input
          type="text"
          placeholder={i18n.t('SearchbyIDorName')}
          className="text-xl h-10 w-1/2 text-black rounded-t-full bg-white text-center"
          onChange={(e) => setSearchQuery(e.target.value)}
          value={searchQuery}
        />


      </div>

      <div className='flex justify-center flex-col items-center bg-slate-200 w-4/5 rounded-t-4xl '>
      <div className="flex flex-wrap justify-center gap-4 mt-4">
          {/* Category Dropdown */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="p-2 rounded bg-white text-black border"
          >
            <option value="">{i18n.t('AllCategories')}</option>
            {availableCategories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          {/* Sorting Dropdown */}
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="p-2 rounded bg-white text-black border"
          >
            <option value="">{i18n.t('SortBy')}</option>
            <option value="name-asc">{i18n.t('Name')} ↑</option>
            <option value="name-desc">{i18n.t('Name')} ↓</option>
            <option value="price-asc">{i18n.t('Price')} ↑</option>
            <option value="price-desc">{i18n.t('Price')} ↓</option>
          </select>

          {/* Stock Checkboxes */}
          <label>
            <input
              type="checkbox"
              checked={filterInStock}
              onChange={() => setFilterInStock(!filterInStock)}
              className="mr-1"
            />
            {i18n.t('InStock')}
          </label>

          <label>
            <input
              type="checkbox"
              checked={filterOutOfStock}
              onChange={() => setFilterOutOfStock(!filterOutOfStock)}
              className="mr-1"
            />
            {i18n.t('OutOfStock')}
          </label>
        </div>
        
        <div className='bg-slate-200 w-full h-full flex justify-center rounded-4xl'>
          <div className='mt-5'>
            <p className='text-2xl py-5 text-center'>{i18n.t('products')}:</p>
            <div className='flex flex-wrap justify-center gap-5'>
              {currentPageProducts.map((product) => (
                <Productcard key={product._id} product={product} />
              ))}
            </div>
            <div className="pagination my-5 flex justify-center py-5">
              <button
                disabled={page <= 1}
                onClick={() => setPage(page - 1)}
                className="px-4 py-2 mx-2 bg-blue-500 text-white rounded cursor-pointer"
              >
                {i18n.t('Previous')}
              </button>
              <p>{`${i18n.t('Page')} ${page} ${i18n.t('of')} ${totalPages}`}</p>
              <button
                disabled={page >= totalPages}
                onClick={() => setPage(page + 1)}
                className="px-4 py-2 mx-2 bg-blue-500 text-white rounded cursor-pointer"
              >
                {i18n.t('Next')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
