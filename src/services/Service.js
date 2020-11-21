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
        } catch(errors) {
            return {
                error: true,
                statusCode: 500,
                errors: errors.toString()
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
        } catch(errors) {
            return {
                error: true,
                statusCode: 500,
                message: errors.toString() || "Not able to create item",
                errors
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
        } catch(errors) {
              return {
                error: true,
                statusCode: 500,
                errors: errors.toString()
            }
        }
    }
    
    async delete(id) {
        try {
            return {
                statusCode: 401,
                errors: `We cant delete item with id: ${id}` 
            }
        } catch(error) {
            return {
                error: true,
                statusCode: 500,
                errors: error
            }
        }
    }
}

export default Service;
