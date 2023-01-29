import './styles/table.css'

export default function Table({ headers, pageSize, data }) {
    return (
        <div className="container-fluid">

            <table>
                <tr>
                    {
                        headers.map((header) => (
                            <>
                                <th key={header}>{header.toString()}</th>
                            </>
                        )
                        )}
                </tr>
                {
                    data?.map((temp) => (
                        <tr key={temp.id}>
                            <td key={temp.id}>{temp.firstName || temp.title}</td>
                            <td key={temp.id}>{temp.lastName || temp.description}</td>
                            <td key={temp.id}>{temp.maidenName || temp.price}</td>
                            <td key={temp.id}>{temp.age || temp.discountPercentage}</td>
                            <td key={temp.id}>{temp.gender || temp.rating}</td>
                            <td key={temp.id}>{temp.email || temp.stock}</td>
                            <td key={temp.id}>{temp.username || temp.brand}</td>
                            <td key={temp.id}>{temp.birthDate || temp.category}</td>
                            {
                                temp.height !== undefined ?
                                    <>
                                        <td key={temp.id}>{temp.height}</td>
                                        <td key={temp.id}>{temp.bloodGroup}</td>
                                        <td key={temp.id}>{temp.eyeColor}</td>
                                        <td key={temp.id}>{temp.university}</td>
                                    </> : ''
                            }

                        </tr>
                    ))
                }
            </table>
        </div>
    )
}