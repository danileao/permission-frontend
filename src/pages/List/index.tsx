import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import PermissionComponent from "../../components/PermissionComponent";
import api from "../../services/api";

// import { Container } from './styles';

interface ProductData {
  id: string;
  name: string;
  description: string;
}

const List: React.FC = () => {
  const [products, setProducts] = useState<ProductData[]>([] as ProductData[]);

  const history = useHistory();

  useEffect(() => {
    api.get("products").then((response) => setProducts(response.data));
  }, []);
  return (
    <div>
      <h3>Listagem de produtos</h3>

      <div>
        {products.map((product) => (
          <div key={product.id}>
            <span>ID: {product.id}</span>
            <br />
            <span>Nome: {product.name}</span>
            <br />
            <span>Descrição: {product.description}</span>
            <br />
            <PermissionComponent role="ROLE_ADMIN">
              <button onClick={() => history.push("/product")}>
                Cadastrar Produto
              </button>
            </PermissionComponent>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
