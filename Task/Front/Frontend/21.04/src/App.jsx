import { useState } from "react";
import Products from "./component/Products";
import Busket from "./component/Busket";

export default function App() {
  const [products] = useState([
    {
      id: 101,
      title: "Design",
      price: 27,
      picture:
        "https://m.media-amazon.com/images/I/81gDywN3JFL._AC_UF894,1000_QL80_.jpg",
    },
    {
      id: 102,
      title: "Poetry",
      price: 21,
      picture:
        "https://m.media-amazon.com/images/I/91Mzoi3Z+RL._UF1000,1000_QL80_.jpg",
    },
    {
      id: 103,
      title: "Business",
      price: 47,
      picture:
        "https://i5.walmartimages.com/seo/DK-Big-Ideas-The-Business-Book-Big-Ideas-Simply-Explained-Paperback-9781465475886_a2601568-2767-4cc9-86b7-cbf3b1aa0a38.edd822cd8e88252ab8712dd4e14d4f43.jpeg",
    },
    {
      id: 104,
      title: "Literature",
      price: 17,
      picture: "https://images.booksense.com/images/015/491/9781465491015.jpg",
    },
    {
      id: 105,
      title: "Politics",
      price: 22,
      picture:
        "https://bookazine.com.hk/cdn/shop/products/ed07d7fa693fc323bddb394e163b257a.jpg?v=1589031076",
    },
    {
      id: 106,
      title: "Economics",
      price: 21,
      picture:
        "https://booksandyou.in/cdn/shop/files/TheEconomicsBook_1.webp?v=1732795447",
    },
    {
      id: 107,
      title: "JavaScript The Definitive Guide",
      price: 237,
      picture:
        "https://www.oreilly.com/covers/urn:orm:book:9781491952016/300w/",
    },
  ]);

  const [basket, setBasket] = useState([]);

  const handleMove = (product) => {
    const found = basket.find((prod) => prod.id === product.id);
    if (found) {
      setBasket(
        basket.map((item) => {
          return item.id === product.id
            ? {
                id: item.id,
                title: item.title,
                price: item.price,
                quantity: item.quantity + 1,
              }
            : { ...item };
        }),
      );
    } else {
      setBasket([...basket, { ...product, quantity: 1 }]);
    }
  };

  const handleRemove = (id) => {
    setBasket(basket.filter((product) => product.id !== id));
  };
  const handleAdd = (prod) => {
    const item = { ...prod };
    item.quantity++;
    setBasket([...basket.filter((t) => t.id !== item.id), item]);
  };
  const handleSub = (prod) => {
    if (prod.quantity == 1) {
      handleRemove(prod.id);
      return
    }
    let item = {...prod}
    item.quantity--;
    (item.quantity * item.price) - item.quantity
    setBasket([...basket.filter((t) => t.id !== item.id), item]);
  };

  return (
    <>
      <div className="container my-5">
        <h1 className="display-2 text-info">Bookshop</h1>
        <div className="row">
          <div className="col-md-7">
            <h2>Products</h2>
            <Products data={products} onMove={handleMove} />
          </div>
          <Busket
            data={basket}
            remove={handleRemove}
            add={handleAdd}
            sub={handleSub}
          />
        </div>
      </div>
    </>
  );
}
