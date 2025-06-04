const API_URL = 'https://fakestoreapi.com';

const getProductos = async () => {
    try {
        const res = await fetch(`${API_URL}/products`);
        if (!res.ok) throw new Error('Error al obtener productos');
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
        if (!id) throw new Error('Debes pasar por parametro un ID');
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

const crearProducto = async (title, price, category) => {
    try {
        if (!title || !price || !category) throw new Error('Faltan datos');
        const parsedPrice = parseFloat(price);
        if (isNaN(parsedPrice)) throw new Error('El precio debe ser un número');

        const nuevoProducto = {
            title: title,
            price: parsedPrice,
            category: category,
            description: `Producto ${title} en categoria ${category}`,
        };
        const res = await fetch(`${API_URL}/products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(nuevoProducto),
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
};

const eliminarProducto = async id => {
    try {
        if (!id) throw new Error('Debes pasar por parametro un ID');

        const res = await fetch(`${API_URL}/products/${id}`, {
            method: 'DELETE',
        });

        if (res.ok) {
            console.log('Producto eliminado');
        } else {
            throw new Error('No se encuentra el producto');
        }
    } catch (err) {
        console.error('Error: ', err.message);
    }
};

const [, , method, , ...args] = process.argv;

const run = async () => {
    try {
        switch (method) {
            case 'GET':
                args.length === 0 ? getProductos() : getProductoPorId(args[0]);
                break;
            case 'POST':
                const [title, price, category] = args;
                crearProducto(title, price, category);
                break;
            case 'DELETE':
                eliminarProducto(args[0]);
                break;
            default:
                console.log(`
                    Método inválido. Usa:
                    \n - npm run start GET
                    \n - npm run start GET <id>
                    \n - npm run start POST <title> <price> <category>
                    \n - npm run start DELETE <id>
                    `);
        }
    } catch (err) {
        console.error('Error: ', err.message);
    }
};
