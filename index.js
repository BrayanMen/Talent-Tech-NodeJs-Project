const API_URL = 'https://fakestoreapi.com';

const getProductos = async () => {
    try {
        const res = await fetch(`${API_URL}/products`);
        const data = await res.json();

        console.log('Productos: ');
        console.log('====================================');
        data.forEach(p => {
            console.log(`${p.id}.  ${p.title} - ${p.category} - ${p.price}`);
        });
    } catch (err) {
        console.error('Error: ', err.message);
    }
};

const getProductoPorId = async id => {
    try {
        const res = await fetch(`${API_URL}/products/${id}`);
        if (!res.ok) throw new Error(`El producto ${id} no fue encontrado.`);
        const data = await res.json();

        console.log('Producto: ');
        console.log('====================================');
        console.log(`
        - ${data.title} 
        - ${data.category}
        - ${data.description} 
            - ${data.price}`);
    } catch (err) {
        console.error('Error: ', err.message);
    }
};

const crearProducto = async (title, price, category)=>{
    try {
        const nuevoProducto = {
            title: title,
            price: parseFloat(price),
            category:category,
            description: `Producto ${title} en categoria ${category}`
        }
        const res = await fetch(`${API_URL}/products`,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevoProducto)
        });

        const resultado = await res.json();

        console.log('Producto creado: ');
        console.log('====================================');
        console.log(`
        - ${resultado.id} 
        - ${resultado.title} 
        - ${resultado.category}
        - ${resultado.price}`);
        
    } catch (err) {
        console.error('Error: ', err.message);
    }
}

