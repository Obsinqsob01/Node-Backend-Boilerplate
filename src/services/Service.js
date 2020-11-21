class Service {
    constructor(model) {
        this.model = model
        this.getAll = this.getAll.bind(this)
        this.insert = this.insert.bind(this)
        this.update = this.update.bind(this)
        this.delete = this.delete.bind(this)
    }

    async getAll() {
        try {
            let items = await this.model.find();
            let total = await this.model.countDocuments();

            return {
                error: false,
                statusCode: 200,
                data: items,
                total
            }
        } catch(error) {
            return {
                error: true,
                statusCode: 500,
                message: error.toString() || "Unable to fetch all items"
            }
        }
    }

    async insert(data) {
        try {
            let item = await this.model.create(data)

            return {
                error: false,
                item
            }
        } catch(error) {
            return {
                error: true,
                statusCode: 500,
                message: error.toString() || "Not able to create item",
            }
        }
    }

    async update(id, data) {
        try {
            let item = await this.model.findByIdAndUpdate(id, data)
    
            return {
                error: false,
                statusCode: 202,
                item
            }
        } catch(error) {
              return {
                error: true,
                statusCode: 500,
                message: error.toString() || `Unable to update item with id ${id}`
            }
        }
    }
    
    async delete(id) {
        try {
            return {
                error: true,
                statusCode: 401,
                message: `We cant delete item with id: ${id}` 
            }
        } catch(error) {
            return {
                error: true,
                statusCode: 500,
                message: error.toString() || "Unable to delete item"
            }
        }
    }
}

export default Service;
