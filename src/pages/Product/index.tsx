import React, { useCallback, useState } from "react";
import api from "../../services/api";

import "./styles.css";
const Product: React.FC = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      const response = await api.post("/products", {
        name,
        description,
      });

      console.log(response.data);
    },
    [name, description]
  );

  return (
    <form className="container" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="">Nome</label>
        <input type="text" onChange={(event) => setName(event.target.value)} />
      </div>
      <div className="form-group">
        <label htmlFor="">Descrição</label>
        <input
          type="text"
          onChange={(event) => setDescription(event?.target.value)}
        />
      </div>

      <div className="form-group">
        <button type="submit">Cadastrar</button>
      </div>
    </form>
  );
};

export default Product;
