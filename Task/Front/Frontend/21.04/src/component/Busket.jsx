export default function Busket({ data, remove, add, sub }) {
  return (
    <>
      <div className="col-md-5">
        <h2>Basket</h2>
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>title</th>
              <th>price</th>
              <th>quantity</th>
              <th>subtotal</th>
              <th>actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.title}</td>
                <td>{item.price} USD</td>
                <td>{item.quantity}</td>
                <td>{item.price * item.quantity} USD</td>
                <td>
                  <button
                    onClick={() => add(item)}
                    className="btn btn-outline-success mx-1"
                  >
                    +
                  </button>

                  <button
                    onClick={() => sub(item)}
                    className="btn btn-outline-dark mx-1"
                  >
                    -
                  </button>
                  <button
                    onClick={() => remove(item.id)}
                    className="btn btn-outline-danger mx-1"
                  >
                    x
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
