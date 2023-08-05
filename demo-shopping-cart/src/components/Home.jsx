import "../styles/home.css";

const productList = [
  {
    name: "Laptop",
    price: 100000,
    src: "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6448/6448271ld.jpg",
    id: "1",
  },
  {
    name: "Charger",
    price: 500,
    src: "https://imgs.search.brave.com/6iv5MljxrMqMEwCeL2zMa0LiYZVE1zi3ux6eQPmTAuA/rs:fit:474:225:1/g:ce/aHR0cHM6Ly90c2Uz/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5O/SmVCQ0xZWFM3NDVj/TExlRFdMNGJnSGFI/YSZwaWQ9QXBp",
    id: "2",
  },
  {
    name: "Pendrive",
    price: 800,
    src: "https://imgs.search.brave.com/JD0CQAdwSFBxS7tFwyzFnTMmcsrqCOIusfkhNOyQceM/rs:fit:474:225:1/g:ce/aHR0cHM6Ly90c2Ux/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC55/SnZpQ0dmYzRqRFJB/TGZmRW1sZ1JBSGFI/YSZwaWQ9QXBp",
    id: "3",
  },
  {
    name: "Keyboard & Mouse",
    price: 600,
    src: "https://imgs.search.brave.com/uTnfj5ljPgRejBL6lwrk0vANs5MEOqdLVywgJBDW5C4/rs:fit:474:225:1/g:ce/aHR0cHM6Ly90c2Uz/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5Z/OWx0V09ja1p1TWZa/SEN4cnRrMnFnSGFI/YSZwaWQ9QXBp",
    id: "4",
  },
  {
    name: "Phone",
    price: 15000,
    src: "https://imgs.search.brave.com/HHxu9ScLZFeCHBekMBX66NYL4gT86tmap5tIklcAyPI/rs:fit:359:225:1/g:ce/aHR0cHM6Ly90c2Uy/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5q/NU8yS01LRk1oa2tL/am5xdnhQSldRSGFH/VSZwaWQ9QXBp",
    id: "5",
  },
  {
    name: "LED Lights",
    price: 100,
    src: "https://imgs.search.brave.com/0J-Wey78Jebvkc9cd0FsfUTFb-Z14Ek5VfJV8tGu_z4/rs:fit:835:225:1/g:ce/aHR0cHM6Ly90c2Ux/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5G/UUw1YVRmbW9IY0Ju/NlBYeGkyb213SGFF/TiZwaWQ9QXBp",
    id: "6",
  },
  {
    name: "Watch",
    price: 5000,
    src: "https://imgs.search.brave.com/L3ne8RZtoalIEwQtLOm9KMSIqBB1-brnG8PxrtjrBJ4/rs:fit:474:225:1/g:ce/aHR0cHM6Ly90c2Uz/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5a/TlJYd1V3MXlrZnZV/Rkh3dG9wTlJRSGFI/YSZwaWQ9QXBp",
    id: "7",
  },
];

const Home = ({ addToCart }) => {
  const ProductCard = ({ src, name, price, addToCart, id }) => {
    return (
      <div className="product-card">
        <img src={src} alt="" />
        <p>{name}</p>
        <h4>₹ {price}</h4>
        <button onClick={() => addToCart({ src, name, price, id })}>
          Add to CART
        </button>
      </div>
    );
  };

  return (
    <div className="home">
      {productList.map((item) => {
        return (
          <ProductCard
            key={item.id}
            price={item.price}
            name={item.name}
            id={item.id}
            src={item.src}
            addToCart={addToCart}
          />
        );
      })}
    </div>
  );
};

export default Home;
