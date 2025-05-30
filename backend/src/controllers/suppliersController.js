const suppliersController = {};

import suppliersModel from '../models/Suppliers.js';
//POST
suppliersController.postSuppliers = async (req, res) => {
    try {
        console.log('=== DEBUG SUPPLIERS POST ===')
        console.log('Body recibido:', req.body)
        
        const {supplierName, email, phoneNumber, address} = req.body;

        // Validación manual más detallada
        if (!supplierName || !email || !phoneNumber || !address) {
            console.log('❌ Campos faltantes:', {
                supplierName: !!supplierName,
                email: !!email, 
                phoneNumber: !!phoneNumber,
                address: !!address
            })
            return res.status(400).json({
                message: "Todos los campos son requeridos",
                missing: {
                    supplierName: !supplierName,
                    email: !email,
                    phoneNumber: !phoneNumber,
                    address: !address
                }
            })
        }

        // Validación de email
        const emailRegex = /^\S+@\S+\.\S+$/
        if (!emailRegex.test(email)) {
            console.log('❌ Email inválido:', email)
            return res.status(400).json({message: "Email inválido"})
        }

        // Validación de teléfono (solo números, al menos 8 dígitos)
        const phoneClean = phoneNumber.replace(/\D/g, '')
        if (phoneClean.length < 8) {
            console.log('❌ Teléfono inválido:', phoneNumber)
            return res.status(400).json({message: "Teléfono debe tener al menos 8 dígitos"})
        }

        console.log('✅ Datos validados, creando proveedor...')

        const newSupplier = new suppliersModel({
            supplierName: supplierName.trim(),
            email: email.trim().toLowerCase(),
            phoneNumber: phoneClean,
            address: address.trim()
        })

        const savedSupplier = await newSupplier.save()
        console.log('✅ Proveedor guardado:', savedSupplier)

        res.status(201).json({
            message: "Proveedor guardado exitosamente",
            supplier: savedSupplier
        })
    } catch (error) {
        console.log('❌ Error en postSuppliers:', error)
        
        // Manejar errores específicos de MongoDB
        if (error.name === 'ValidationError') {
            const validationErrors = {}
            for (let field in error.errors) {
                validationErrors[field] = error.errors[field].message
            }
            return res.status(400).json({
                message: "Error de validación",
                errors: validationErrors
            })
        }
        
        if (error.code === 11000) {
            return res.status(400).json({
                message: "Ya existe un proveedor con ese email o teléfono"
            })
        }
        
        res.status(500).json({
            message: "Error interno del servidor",
            error: error.message
        })
    }
}

//GET
suppliersController.getSuppliers = async (req, res) => {
    try {
        const suppliers = await suppliersModel.find().sort({ createdAt: -1 })
        res.json(suppliers)
    } catch (error) {
        console.log('Error en getSuppliers:', error)
        res.status(500).json({
            message: "Error al obtener proveedores",
            error: error.message
        })
    }
}

//PUT
suppliersController.putSuppliers = async (req, res) => {
    try {
        console.log('=== DEBUG SUPPLIERS PUT ===')
        console.log('ID:', req.params.id)
        console.log('Body:', req.body)
        
        const {supplierName, email, phoneNumber, address} = req.body;
        
        if (!supplierName || !email || !phoneNumber || !address) {
            return res.status(400).json({message: "Todos los campos son requeridos"})
        }

        // Validaciones
        const emailRegex = /^\S+@\S+\.\S+$/
        if (!emailRegex.test(email)) {
            return res.status(400).json({message: "Email inválido"})
        }

        const phoneClean = phoneNumber.replace(/\D/g, '')
        if (phoneClean.length < 8) {
            return res.status(400).json({message: "Teléfono debe tener al menos 8 dígitos"})
        }

        const updateSupplier = await suppliersModel.findByIdAndUpdate(
            req.params.id, 
            {
                supplierName: supplierName.trim(),
                email: email.trim().toLowerCase(),
                phoneNumber: phoneClean,
                address: address.trim()
            }, 
            {new: true}
        )
        
        if (!updateSupplier) {
            return res.status(404).json({message: "Proveedor no encontrado"})
        }
        
        console.log('✅ Proveedor actualizado:', updateSupplier)
        res.json({
            message: "Proveedor actualizado exitosamente",
            supplier: updateSupplier
        })
    } catch (error) {
        console.log('❌ Error en putSuppliers:', error)
        
        if (error.name === 'ValidationError') {
            const validationErrors = {}
            for (let field in error.errors) {
                validationErrors[field] = error.errors[field].message
            }
            return res.status(400).json({
                message: "Error de validación",
                errors: validationErrors
            })
        }
        
        if (error.code === 11000) {
            return res.status(400).json({
                message: "Ya existe un proveedor con ese email o teléfono"
            })
        }
        
        res.status(500).json({
            message: "Error al actualizar proveedor",
            error: error.message
        })
    }
}

//DELETE
suppliersController.deleteSuppliers = async (req,res) => {
    try {
        const deleteSuppliers = await suppliersModel.findByIdAndDelete(req.params.id)
        if (!deleteSuppliers) {
            return res.status(404).json({message: "Proveedor no encontrado"})
        }
        res.json({message: "Proveedor eliminado exitosamente"})
    } catch (error) {
        console.log('Error en deleteSuppliers:', error)
        res.status(500).json({
            message: "Error al eliminar proveedor",
            error: error.message
        })
    }
}

//GET POR ID
suppliersController.getSupplier = async (req, res) => {
    try {
        const supplier = await suppliersModel.findById(req.params.id)
        if (!supplier) {
            return res.status(404).json({message: "Proveedor no encontrado"})
        }
        res.json(supplier)
    } catch (error) {
        console.log('Error en getSupplier:', error)
        res.status(500).json({
            message: "Error al obtener proveedor",
            error: error.message
        })
    }
}

export default suppliersController