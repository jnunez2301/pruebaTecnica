import InicioStyles from  './Inicio.module.css'
const inicio = () => {
  return (
    <section className={InicioStyles.container}>
      <nav>
        <h1>Inventory</h1>
      </nav>
      <div>
        <h2>Productos</h2>
        <table>
          <thead>
            <td><input type="checkbox" name="" id="" /></td>
            <td>Product Name</td>
            <td>Category</td>
            <td>Brand</td>
            <td>Price</td>
            <td>Stock</td>
          </thead>
          <tbody>
            <td><input type="checkbox" name="" id="" /></td>
            <td>Black Shirt</td>
            <td>T-shirt</td>
            <td>iCon</td>
            <td>9.99€</td>
            <td>20</td>
          </tbody>
        </table>
        <div className={InicioStyles.pagination}>
          <ul>
            <li><button>{"<"}</button></li>
            <li><button>1</button></li>
            <li><button>2</button></li>
            <li><button>...</button></li>
            <li><button>25</button></li>
            <li><button>{">"}</button></li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default inicio