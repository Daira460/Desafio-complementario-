import { Router } from 'express';
import { productsModel } from '../dao/mongodb/models/products.models.js';

const router = Router();

router.get('/', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const page = parseInt(req.query.page) || 1;
        const sortDirection = req.query.sort === 'desc' ? -1 : 1
        const sort = req.query.sort ? { price: sortDirection } : undefined;
        const filter = {};


        if (req.query.category) {
            filter.category = req.query.category;
        }


        if (Boolean(req.query.available)) {
            filter.available = req.query.available;
        }


        const {docs, pages, hasPrevPage, hasNextPage, prevPage, nextPage} = await productsModel.paginate(filter, {limit, page, sort, lean: true})
        const products = docs
        
        res.render('home', { 
            products,
            totalPages: pages,
            prevPage,
            nextPage,
            page,
            hasPrevPage,
            hasNextPage,
            prevLink: hasPrevPage ? `?page=${prevPage}&limit=${limit}` : null,
            nextLink: hasNextPage ? `?page=${nextPage}&limit=${limit}` : null,
            style: 'index.css',
        })
        
    } catch (error) {
        console.error('Error en la ruta /home:', error);
        res.status(500).json({ status: 'error', error: 'Internal error' });
    }
});

router.post('/add', async (req, res) => {
    try {
        const newProductData = req.body; 
        const newProduct = await productsModel.create(newProductData);
        res.status(201).json({ status: 'success', data: newProduct });
    } catch (error) {
        console.error('Error al agregar un producto:', error);
        res.status(500).json({ status: 'error', error: 'Internal error' });
    }
});

router.put('/:productId/edit', async (req, res) => {
    try {
        const productId = req.params.productId;
        const updatedProductData = req.body;
        const updatedProduct = await productsModel.findByIdAndUpdate(productId, updatedProductData, { new: true });
        res.status(200).json({ status: 'success', data: updatedProduct });
    } catch (error) {
        console.error('Error al editar un producto:', error);
        res.status(500).json({ status: 'error', error: 'Internal error' });
    }
});

router.delete('/:productId/delete', async (req, res) => {
    try {
        const productId = req.params.productId;
        await productsModel.findByIdAndDelete(productId);
        res.status(204).end();
    } catch (error) {
        console.error('Error al eliminar un producto:', error);
        res.status(500).json({ status: 'error', error: 'Internal error' });
    }
});

export default router;


