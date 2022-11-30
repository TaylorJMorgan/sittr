import { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import ProductCard from '../components/ProductCard';
import Container from 'react-bootstrap/Container';

function Products(props) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(
        'https://sittr-cb344-default-rtdb.firebaseio.com/products.json'
      );

      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      const responseData = await response.json();

      const loadedProducts = [];

      for (const key in responseData) {
        loadedProducts.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
          image: responseData[key].img,
        });
      }

      setProducts(loadedProducts);
      setIsLoading(false);
    };

    fetchProducts().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  const productsList = products.map((product) => (
    <ProductCard
      key={product.id}
      id={product.id}
      name={product.name}
      description={product.description}
      price={product.price}
      image={product.image}
      isLoggedIn={props.isLoggedIn}
    />
  ));

  return (
    <Container className='bg-light rounded p-4'>
      {isLoading && <p className='text-center'>Loading...</p>}
      {!isLoading && <Row>{productsList}</Row>}
      {httpError && !isLoading && <p className='text-center'>{httpError}</p>}
    </Container>
  );
}

export default Products;
