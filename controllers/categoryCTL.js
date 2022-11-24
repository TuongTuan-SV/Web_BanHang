const Category = require ("../model/categoryModel")

const categoryCTL = {
    getCategories : async (req, res) => {
        try {
            const categories = await Category.find()

            res.json(categories)
        } catch (err) {
            return res.statue(500).json({msg : err.message})
        }
    },
    createCategory : async (req, res) => {
       try {
            // Only admin can create, delete, update
            // if role == 1 -> admin
            const {name} = req.body
            const category = await Category.findOne({name})
            
            if(category) return res.status(400).json({msg : "Category alredy exists"})

            const newCategory = new Category({name})

            await newCategory.save()
            res.json({msg : "Create success", category : newCategory})
        } catch (err) {
            return res.status(500).json({msg : err.message})
        } 
    },
    deleteCategory : async (req, res) => {
        try {
            await Category.findByIdAndDelete(req.params.id)
            res.json("Category deleted")
        } catch (err) {
            return res.statue(500).json({msg : err.message})
        }
    },
    updateCategory : async (req, res) =>{
        try {
            const {name} = req.body

            await Category.findByIdAndUpdate({_id : req.params.id},{name})

            res.json({msg : "Category Updated"})
        } catch (err) {
            return res.statue(500).json({msg : err.message})
        }
    }
}

module.exports = categoryCTL