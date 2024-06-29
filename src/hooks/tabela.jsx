
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
                        <td>{produto.title}</td> {}
                        <td><img src={produto.image} alt={produto.title} style={{ width: '300px' }} /></td> {}
                        <td>{produto.price}</td> {}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default Tabela;
