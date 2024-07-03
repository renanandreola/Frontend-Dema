import "./AllProducts.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Card from "../../layout/Card";


function AllProducts() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await axios.get(
        "http://localhost:3030/dema/products"
      );
      console.log("response: ", response);
      setData(response.data.products);
    } catch (error) {
      console.error("Erro:", error);
    }
  }

  if (data.length > 0) {
    return (
      <>
        <h1>Produtos</h1>

        <div className="listing-tickers">
          {data.map((product) => (
            <Card product={product}></Card>
            // <tr key={action.code}>
            //     <th scope="row">-</th>
            //     <td>{action.code}</td>
            //     <td>{action.name}</td>
            //     {/* <td><a href='/'>Ver ativo</a></td> */}
            //     <td>
            //         <button className='btn btn-primary' onClick={() => goToAction(action.code, action.name)}>Ver ativo</button>
            //     </td>
            // </tr>
          ))}
        </div>
      </>
    );
  } else {
    return (
      <h1>Carregando produtos...</h1>
    );
  }
}

export default AllProducts;
