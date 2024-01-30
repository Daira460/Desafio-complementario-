import { Router } from 'express';
import { productsModel } from '../dao/mongodb/models/products.models.js';

const router = Router();

router.get('/', async (req, res) => {
    try {
        const pageSize = 10;
        const currentPage = parseInt(req.query.page) || 1;
        const products = await productsModel
            .find()
            .skip((currentPage - 1) * pageSize)
            .limit(pageSize);

        const totalProducts = await productsModel.countDocuments();
        const hasMorePages = currentPage * pageSize < totalProducts;

        const hasPrevPag = currentPage > 1;
        const hasNextPag = hasMorePages;
        const prevLink = hasPrevPag ? `/productos?page=${currentPage - 1}` : null;
        const nextLink = hasNextPag ? `/productos?page=${currentPage + 1}` : null;


        const carritoId = obtenerOGenerarCarritoId(req);

        res.render('productos', {
            products: products,
            hasPrevPag: hasPrevPag,
            hasNextPag: hasNextPag,
            prevLink: prevLink,
            nextLink: nextLink,
            carritoId: carritoId,
        });
    } catch (error) {
        console.error('Error en la ruta /productos:', error);
        res.status(500).json({ status: 'error', error: 'Internal error' });
    }
});

function obtenerOGenerarCarritoId(req) {
    if (req.session.carritoId) {
        return req.session.carritoId;
    }

    const nuevoCarritoId = Date.now().toString();
    req.session.carritoId = nuevoCarritoId;

    return nuevoCarritoId;
}

export default router;


