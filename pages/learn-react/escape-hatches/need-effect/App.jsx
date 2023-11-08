import { useEffect, useState } from "react";
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

function showNotification(message) {
    console.log(message)
}

function navigateTo(url) {
    showNotification(`Navigating to ${url}`)
}

function BadProductPage({ product, addToCart }) {
    // 🔴 Avoid: Event-specific logic inside an Effect
    useEffect(() => {
        if (product.isInCart) {
            showNotification(`Added ${product.name} to the shopping cart!`);
        }
    }, [product]);
  
    function handleBuyClick() {
        addToCart(product);
    }
  
    function handleCheckoutClick() {
        addToCart(product);
        navigateTo('/checkout');
    }
    // ...
    return <RenderProduct
        product={product}
        onByClick={handleBuyClick}
        onCheckoutClick={handleCheckoutClick}
    />
}

function GoodProductPage({ product, addToCart }) {
    // ✅ Good: Event-specific logic is called from event handlers
    function buyProduct() {
        addToCart(product);
        showNotification(`Added ${product.name} to the shopping cart!`);
    }
  
    function handleBuyClick() {
        buyProduct();
    }
  
    function handleCheckoutClick() {
        buyProduct();
        navigateTo('/checkout');
    }
    // ...
    return <RenderProduct
        product={product}
        onByClick={handleBuyClick}
        onCheckoutClick={handleCheckoutClick}
    />
}

function Button({ onClick, children }) {
    return (
        <div onClick={onClick} className="p-2 m-1 bg-blue-400 rounded text-white font-bold hover:bg-blue-500">
            {children}
        </div>
    )
}

function RenderProduct({ product, onByClick, onCheckoutClick }) {
    return (
        <div className="flex flex-col w-64">
            <div className="h-full w-full bg-cover rounded bg-[url('/chester-alvarez-bphc6kyobMg-unsplash.jpg')]">
                <div className="h-full backdrop-brightness-50 rounded">
                    <div className="text-white text-3xl p-2">
                        {product.name}
                    </div>
                    <div className="flex justify-end m-1">
                        <Button onClick={onByClick}>
                            Buy
                        </Button>
                        <Button onClick={onCheckoutClick}>
                            Checkout
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

function RenderProductPage({ ProductPage, useStore, header }) {
    const product = useStore((state) => state.product)
    const putInCart = useStore((state) => state.putInCart)
    const resetProduct = useStore((state) => state.reset)

    function addToCart(product) {
        putInCart()
        console.log('added to cart')
    }

    return (
        <div className={`m-2 rounded outline ${header.bg} ${header.outline}`}>
            <div className="p-2 text-white font-bold">
                {header.text}
            </div>
            <div className="flex bg-white">
                <ProductPage product={product} addToCart={addToCart} />
                <div className="flex flex-col justify-center p-2">
                    <label className=" bg-white">
                        <input
                            className="m-2"
                            type="checkbox"
                            checked={product.isInCart}
                        />
                        In Cart
                    </label>
                    <div className="mt-2">
                        <div onClick={resetProduct} className="p-2 bg-red-500 rounded text-white font-bold hover:bg-red-600">
                            Reset Cart
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function App() {
    const headers = {
        good: {
            text: "Good Page",
            bg: 'bg-green-400',
            outline: 'outline-green-400'
        },
        bad: {
            text: "Bad Page",
            bg: 'bg-red-400',
            outline: 'outline-red-400'
        }
    }
    
    return (
        <div className="relative h-screen">
            <div className="flex flex-wrap m-3">
                <RenderProductPage ProductPage={BadProductPage} useStore={useBadStore} header={headers.bad} />
                <RenderProductPage ProductPage={GoodProductPage} useStore={useGoodStore} header={headers.good} />
            </div>
        </div>
    )
}

const defaultProduct = {
    id: 0,
    name: 'Ultimate Fancy Gadget Mark II',
    isInCart: false
}

const store = (set, get) => ({
        product: defaultProduct,
        putInCart: () => set((state) => ({ product: {
            ...state.product,
            isInCart: true
        }})),
        reset: () => set(() => ({ product: defaultProduct }))
    })

const useBadStore = create(persist(
    store, {
        name: "learn-react-escape-hatches-need-effect-product-bad",
        getStorage: () => sessionStorage,
    }
))

const useGoodStore = create(persist(
    store, {
        name: "learn-react-escape-hatches-need-effect-product-good",
        getStorage: () => sessionStorage,
    }
))