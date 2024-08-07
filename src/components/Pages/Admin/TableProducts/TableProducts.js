import React, { useState, useEffect } from "react";
import "./TableProducts.css";
import axios from "axios";
import { toast } from 'react-toastify';

function TableProducts() {
    const [data, setData] = useState([]);

    // const baseUrlProducts = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/dema/products' : 'https://dema-api-d36ba11b74d8.herokuapp.com/dema/products';
    // const baseUrlRemoveProducts = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/dema/removeProduct' : 'https://dema-api-d36ba11b74d8.herokuapp.com/dema/removeProduct';
      const baseUrlProducts = 'https://dema-api-d36ba11b74d8.herokuapp.com/dema/products';
      const baseUrlRemoveProducts = 'https://dema-api-d36ba11b74d8.herokuapp.com/dema/removeProduct';

    useEffect(() => {
        fetchProductsData();
    }, []);

    async function fetchProductsData() {
        try {
            const response = await axios.get(baseUrlProducts);
            setData(response.data.products);
        } catch (error) {
            console.error("Erro:", error);
        }
    }

    const notifySuccessProduct = () => {
        toast.success('Produto excluído com sucesso');
    };

    const notifyErrorProduct = () => {
        toast.error('Erro ao excluir produto');
    };

    const removeProduct = async (id) => {
        try {
            var data = {
                id: id,
            };

            const responseRemove = await axios.post(baseUrlRemoveProducts, data);

            if (responseRemove.data.status === 200) {
                notifySuccessProduct();
            } else {
                notifyErrorProduct();
            }

            window.location.pathname = "/homeAdmin";
            
        } catch (error) {
            console.error("Erro:", error);
            notifyErrorProduct();
        }
    }

    if (data && data.length > 0) {
        return (
            <table className="table table-striped table-products">
                <thead>
                    <tr>
                    <th scope="col">Nome</th>
                    <th scope="col">Preço</th>
                    <th scope="col">Descrição</th>
                    <th scope="col">Imagem</th>
                    <th scope="col">Estoque</th>
                    <th scope="col">Ação</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((product) => (
                        <tr key={product._id}>
                            <th scope="row">{product.name}</th>
                            <td>{product.price}</td>
                            <td className="description-text">{product.description}</td>
                            <td className="description-text">{product.image}</td>
                            <td>{product.stock}</td>
                            <td>
                                <button className="btn btn-warning">Editar</button>
                                <button className="btn btn-danger" onClick={() => removeProduct(product._id)}>Excluir</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }
}

export default TableProducts;
