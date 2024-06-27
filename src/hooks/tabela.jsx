import React, { useEffect, useState } from 'react';

function Tabela({ vetor }) {
    return (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Título</th>
                    <th>Imagem</th>
                    <th>Preço</th>
                </tr>
            </thead>
            <tbody>
                {vetor.map((produto, indice) => (
                    <tr key={indice}>
                        <td>{produto.id}</td>
                        <td>{produto.title}</td> {/* Ajustado para 'title' */}
                        <td><img src={produto.image} alt={produto.title} style={{ width: '100px' }} /></td> {/* Ajustado para 'image' */}
                        <td>{produto.price}</td> {/* Ajustado para 'price' */}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default Tabela;
