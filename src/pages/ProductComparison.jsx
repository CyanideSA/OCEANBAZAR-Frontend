import React from 'react';
import { useComparison } from '../context/ComparisonContext';
import { X, Star, ShoppingCart } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';
import { productDetailPath } from '../utils/productId';

const ProductComparison = () => {
  const { comparisonList, removeFromComparison, clearComparison } = useComparison();
  const navigate = useNavigate();

  if (comparisonList.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50/50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 py-10">
        <div className="max-w-screen-2xl mx-auto px-3 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 tracking-tight">Product Comparison</h1>
          <div className="bg-white dark:bg-gray-800/80 rounded-2xl p-12 text-center border border-gray-100 dark:border-gray-800 shadow-soft animate-fade-in">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <ShoppingCart className="w-7 h-7 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">No Products to Compare</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm">Add products to your comparison list to see them here</p>
            <Button 
              onClick={() => navigate('/products')}
              className="bg-[#5BA3D0] hover:bg-[#4A90B8] text-white rounded-xl"
            >
              Browse Products
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50/50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 py-8">
      <div className="max-w-screen-2xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">Compare Products</h1>
          <Button 
            onClick={clearComparison}
            variant="outline"
            className="border-red-200 text-red-500 hover:bg-red-50 dark:border-red-800 dark:hover:bg-red-950/30 rounded-xl text-sm"
          >
            Clear All
          </Button>
        </div>

        <div className="bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-x-auto shadow-soft animate-fade-in">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-700">
                <th className="p-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 sticky left-0 z-10">Feature</th>
                {comparisonList.map((product) => (
                  <th key={product.id || product._id} className="p-4 text-center min-w-[220px]">
                    <div className="relative">
                      <button
                        onClick={() => removeFromComparison(product.id || product._id)}
                        className="absolute -top-1 -right-1 w-6 h-6 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors duration-200"
                      >
                        <X className="w-3 h-3" />
                      </button>
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-28 object-cover rounded-xl mb-2 bg-gray-50 dark:bg-gray-800"
                      />
                      <p className="font-semibold text-gray-800 dark:text-gray-200 text-sm">{product.name}</p>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50/50 dark:hover:bg-gray-800/30">
                <td className="p-4 text-sm font-medium text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 sticky left-0">Price</td>
                {comparisonList.map((product) => (
                  <td key={product.id || product._id} className="p-4 text-center">
                    <span className="text-xl font-bold text-gray-900 dark:text-gray-100">${product.price}</span>
                  </td>
                ))}
              </tr>

              <tr className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50/50 dark:hover:bg-gray-800/30">
                <td className="p-4 text-sm font-medium text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 sticky left-0">Rating</td>
                {comparisonList.map((product) => (
                  <td key={product.id || product._id} className="p-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span className="font-semibold text-sm text-gray-800 dark:text-gray-200">{product.rating}</span>
                    </div>
                  </td>
                ))}
              </tr>

              <tr className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50/50 dark:hover:bg-gray-800/30">
                <td className="p-4 text-sm font-medium text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 sticky left-0">Category</td>
                {comparisonList.map((product) => (
                  <td key={product.id || product._id} className="p-4 text-center text-sm text-gray-600 dark:text-gray-400">
                    {product.category}
                  </td>
                ))}
              </tr>

              <tr className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50/50 dark:hover:bg-gray-800/30">
                <td className="p-4 text-sm font-medium text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 sticky left-0">Min. Order Qty</td>
                {comparisonList.map((product) => (
                  <td key={product.id || product._id} className="p-4 text-center text-sm text-gray-600 dark:text-gray-400">
                    {product.moq} units
                  </td>
                ))}
              </tr>

              <tr className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50/50 dark:hover:bg-gray-800/30">
                <td className="p-4 text-sm font-medium text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 sticky left-0">Stock</td>
                {comparisonList.map((product) => (
                  <td key={product.id || product._id} className="p-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      product.stock > 100 ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 
                      product.stock > 0 ? 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' : 
                      'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                    }`}>
                      {product.stock > 0 ? `${product.stock} available` : 'Out of stock'}
                    </span>
                  </td>
                ))}
              </tr>

              <tr className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50/50 dark:hover:bg-gray-800/30">
                <td className="p-4 text-sm font-medium text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 sticky left-0">Verified</td>
                {comparisonList.map((product) => (
                  <td key={product.id || product._id} className="p-4 text-center">
                    {product.verified ? (
                      <span className="px-3 py-1 bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 rounded-full text-xs font-medium">Verified</span>
                    ) : (
                      <span className="px-3 py-1 bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400 rounded-full text-xs font-medium">Not Verified</span>
                    )}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-4 text-sm font-medium text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 sticky left-0">Actions</td>
                {comparisonList.map((product) => (
                  <td key={product.id} className="p-4 text-center">
                    <div className="flex flex-col gap-2">
                      <Button 
                        onClick={() => navigate(productDetailPath(product.id || product._id))}
                        className="bg-[#5BA3D0] hover:bg-[#4A90B8] text-white w-full rounded-lg text-sm"
                      >
                        View Details
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => removeFromComparison(product.id || product._id)}
                        className="w-full rounded-lg text-sm"
                      >
                        Remove
                      </Button>
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-6 text-center text-sm text-gray-400 dark:text-gray-500">
          Comparing {comparisonList.length} of 4 maximum products
        </div>
      </div>
    </div>
  );
};

export default ProductComparison;
