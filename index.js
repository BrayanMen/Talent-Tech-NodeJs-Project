const API_URL = 'https://fakestoreapi.com';

const getProductos = async recurso => {
    try {
        const res = await fetch(`${API_URL}/${recurso}`);
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

const getProductoPorId = async (recurso, id) => {
    try {
        if (!id) throw new Error('Debes pasar por parametro un ID');
        const res = await fetch(`${API_URL}/${recurso}/${id}`);
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

const crearProducto = async (recurso, titulo, precio, categoria) => {
    try {
        if (!titulo || !precio || !categoria) throw new Error('Faltan datos');
        const parsedPrecrio = parseFloat(precio);
        if (isNaN(parsedPrecrio)) throw new Error('El precio debe ser un número');

        const nuevoProducto = {
            title: titulo,
            price: parsedPrecrio,
            category: categoria,
            description: `Producto ${titulo} en categoria ${categoria}`,
        };
        const res = await fetch(`${API_URL}/${recurso}`, {
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

const eliminarProducto = async (recurso, id) => {
    try {
        if (!id) throw new Error('Debes pasar por parametro un ID');

        const res = await fetch(`${API_URL}/${recurso}/${id}`, {
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

const [, , metodo, recurso, ...args] = process.argv;

const run = async () => {
    try {
        switch (metodo) {
            case 'GET':
                args.length === 0
                    ? await getProductos(recurso)
                    : await getProductoPorId(recurso, args[0]);
                break;
            case 'POST':
                const [title, price, category] = args;
                await crearProducto(recurso, title, price, category);
                break;
            case 'DELETE':
                await eliminarProducto(recurso, args[0]);
                break;
            default:
                console.log(`
                    Método inválido. Usa:
                    \n - npm run start GET products
                    \n - npm run start GET products <id>
                    \n - npm run start POST products <Titulo> <Precio> <Categoria>
                    \n - npm run start DELETE products <id>
                    `);
        }
    } catch (err) {
        console.error('Error: ', err.message);
    }
};
run();
