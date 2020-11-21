class Service {
    constructor(model) {
        this.model = model
        this.findAll = this.findAll.bind(this)
        this.insert = this.insert.bind(this)
        this.update = this.update.bind(this)
        this.delete = this.delete.bind(this)
    }

    async findAll() {
        try {
            let items = await this.model.all();
            let total = await this.model.count();

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
                errors
            }
        }
    }

    async insert(data) {
        try {
            let item = await this.model.save(data)

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
            let item = await this.model.update(id, data)
    
            return {
                error: false,
                statusCode: 202,
                item
            }
        } catch(error) {
              return {
                error: true,
                statusCode: 500,
                errors: error
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
